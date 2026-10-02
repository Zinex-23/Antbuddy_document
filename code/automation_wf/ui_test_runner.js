#!/usr/bin/env node
'use strict';

const { spawn } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');

let PAGE_URL = process.env.ANTBUDDY_URL || '';
let staticServer;
const PORT = 9335;
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'antbuddy-ui-'));
const chrome = spawn('google-chrome', [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profileDir}`, 'about:blank'
], { stdio: 'ignore' });

let seq = 0;
let ws;
const pending = new Map();
const browserErrors = [];
const results = [];

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function getJson(url, retries = 50) {
  for (let i = 0; i < retries; i++) {
    try { const r = await fetch(url); if (r.ok) return r.json(); } catch (_) {}
    await wait(100);
  }
  throw new Error(`Không kết nối được Chrome DevTools: ${url}`);
}

function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const reply = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (reply.exceptionDetails) throw new Error(reply.exceptionDetails.text || 'Lỗi evaluate');
  return reply.result?.value;
}

function test(name, condition, detail = '') {
  const pass = Boolean(condition);
  results.push({ name, pass, detail });
  const mark = pass ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
  console.log(`${mark} ${name}${!pass && detail ? ` — ${detail}` : ''}`);
}

async function viewport(width, height = 900) {
  await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await wait(80);
}

async function ensurePageUrl() {
  if (PAGE_URL) return;
  const htmlPath = path.join(__dirname, 'index.html');
  staticServer = http.createServer((request, response) => {
    const asset = { '/automation-hub.js':['automation-hub.js','text/javascript'], '/automation-hub.css':['automation-hub.css','text/css'] }[request.url];
    if (asset) { response.writeHead(200, { 'Content-Type':asset[1] }); fs.createReadStream(path.join(__dirname,asset[0])).pipe(response); return; }
    if (request.url === '/' || request.url.startsWith('/index.html')) {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(htmlPath).pipe(response);
      return;
    }
    response.writeHead(404); response.end('Not found');
  });
  await new Promise((resolve, reject) => {
    staticServer.once('error', reject);
    staticServer.listen(0, '127.0.0.1', resolve);
  });
  PAGE_URL = `http://127.0.0.1:${staticServer.address().port}/index.html`;
}

async function main() {
  await ensurePageUrl();
  const tabs = await getJson(`http://127.0.0.1:${PORT}/json`);
  const pageTarget = tabs.find(target => target.type === 'page');
  if (!pageTarget) throw new Error('Không tìm thấy page target của Chrome');
  ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  ws.onmessage = event => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id); pending.delete(msg.id);
      msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
    } else if (msg.method === 'Runtime.exceptionThrown') {
      browserErrors.push(msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text || 'JS exception');
    }
  };
  await command('Runtime.enable');
  await command('Page.enable');
  await viewport(1440, 1000);
  await command('Page.navigate', { url: PAGE_URL });
  for (let i = 0; i < 50; i++) {
    const loaded = await evaluate(`location.href===${JSON.stringify(PAGE_URL)} && document.readyState==='complete' && !!document.querySelector('.app-layout')`);
    if (loaded) break;
    await wait(100);
  }
  await wait(250);
  await evaluate('window.confirm=()=>true');

  console.log('\n=== AntBuddy UI / Integration Tests ===');

  test('UI-001 tải ứng dụng và có shell điều hướng', await evaluate("!!document.querySelector('.app-layout') && !!document.querySelector('.sidebar')"));
  test('UI-002 có đủ 7 module Automation', (await evaluate("document.querySelectorAll('.nav-sub-btn').length")) === 7);
  test('UI-002a menu Automation mặc định đóng', await evaluate("document.getElementById('automationNavChildren').hidden&&document.getElementById('navItemAutomation').getAttribute('aria-expanded')==='false'"));
  await evaluate("toggleAutomationNav()");
  test('UI-002b click Automation mở dropdown', await evaluate("!document.getElementById('automationNavChildren').hidden&&document.getElementById('navItemAutomation').getAttribute('aria-expanded')==='true'"));
  await evaluate("toggleAutomationNav()");
  test('UI-002c click lần hai đóng dropdown', await evaluate("document.getElementById('automationNavChildren').hidden&&document.getElementById('navItemAutomation').getAttribute('aria-expanded')==='false'"));
  test('UI-003 không có lỗi JavaScript khi khởi tạo', browserErrors.length === 0, browserErrors.join(' | '));
  test('HUB-001 Automation mở danh sách trang và khóa các module trước khi chọn', await evaluate("AutomationHub.isOpen&&!AutomationHub.scope&&!document.getElementById('automationHub').hidden&&[...document.querySelectorAll('.nav-sub-btn')].every(b=>b.disabled)"));
  test('HUB-002 dữ liệu trang và sidebar có mục Mẫu', await evaluate("workspaceData.pages.length===8&&!!document.getElementById('navItemTemplates')&&document.querySelectorAll('.hub-table tbody tr').length===6"));
  await evaluate("switchTab('main-menu')");
  test('HUB-003 không vào thẳng Menu chính khi chưa chọn phạm vi', await evaluate("AutomationHub.isOpen&&!document.getElementById('tab_main-menu').classList.contains('active')"));
  for (const width of [1440,1024,720,390]) {
    await viewport(width,900);
    test(`HUB-004 danh sách không tràn trang ở ${width}px`, await evaluate("document.documentElement.scrollWidth<=innerWidth+1"));
  }
  await viewport(1440,1000);
  const screenshot = await command('Page.captureScreenshot', { format:'png' });
  fs.writeFileSync('/tmp/antbuddy-automation-hub.png', Buffer.from(screenshot.data,'base64'));
  await evaluate("AutomationHub.enter('page','page-coffee')");
  test('PG-001 chọn trang mở Menu chính đúng phạm vi', await evaluate("document.getElementById('activePageName').textContent==='Coffee House VN'&&AutomationHub.scope.id==='page-coffee'&&!AutomationHub.isOpen"));
  await evaluate("toggleWorkspaceSwitcher({stopPropagation(){}})");
  test('PG-002 bộ chọn trang nhóm đúng dữ liệu mẫu', await evaluate("document.getElementById('workspaceSwitcher').classList.contains('open')&&document.querySelectorAll('.workspace-page-option').length===8&&workspaceData.groups.length===2"));
  await evaluate("selectWorkspacePage('page-green')");
  test('PG-003 chuyển trang cùng nhóm giữ phạm vi cấu hình chung', await evaluate("workspaceData.activePageId==='page-green'&&getWorkspaceGroupForPage().id==='group-retail'&&document.getElementById('workspaceScopeHost').textContent.includes('2 trang')"));
  await evaluate("openWorkspaceGroupModal()");
  test('PG-004 form tạo nhóm có đủ trang và chế độ tự đồng bộ', await evaluate("!document.getElementById('hubModal').hidden&&document.querySelectorAll('#hubForm input[name=members]').length===8&&document.getElementById('hubGroupAuto').checked"));
  await evaluate("AutomationHub.closeDialog();selectWorkspacePage('page-coffee')");
  await evaluate("toggleAccountMenu({stopPropagation(){}})");
  test('PG-005 popover tài khoản giữ đủ option gốc', await evaluate("document.getElementById('accountMenu').classList.contains('open')&&document.querySelectorAll('#accountPopover .account-nav-item').length===8"));
  test('PG-006 popover tài khoản chọn được danh sách trang', await evaluate("document.querySelectorAll('#accountScopeList .account-scope-option').length===8&&document.querySelector('#accountScopeList .active').textContent.includes('Coffee House VN')"));
  test('PG-007 popover chỉ chuyển trang, không có chức năng nhóm', await evaluate("!document.querySelector('#accountPopover .account-create-group')&&!document.getElementById('accountGroupsTab')&&!/nhóm|cấu hình dùng chung/i.test(document.getElementById('accountPopover').textContent)"));
  await evaluate("closeAccountMenu()");
  test('OV-001 mặc định mở trang tổng quan, không mở trình chỉnh sửa', await evaluate("!document.getElementById('menuOverviewView').hidden&&document.getElementById('menuEditorView').hidden&&mainMenuViewMode==='overview'"));
  test('OV-002 tổng quan hiển thị đầy đủ menu tùy chỉnh', await evaluate("document.querySelectorAll('#menuOverviewCustomList .menu-overview-row').length===appData.menus.filter(x=>x.mode!=='DEFAULT').length"));
  test('OV-003 tổng quan luôn có nút Xuất bản toàn cấu hình', await evaluate("!!document.getElementById('publishPageTemplateButton')&&document.getElementById('publishPageTemplateButton').textContent.trim()==='Xuất bản'"));
  test('OV-004 trang ngoài mặc định hiển thị thống kê Menu mặc định', await evaluate("overviewSelectedMenuId==='menu-default'&&document.getElementById('menuOverviewDefaultCard').classList.contains('selected')&&document.getElementById('menuUsageUsers').textContent==='6 người dùng'"));
  await evaluate("document.querySelector('#menuOverviewCustomList .menu-overview-row').click();document.querySelector('#overview-popover-menu-products').previousElementSibling.click()");
  test('OV-005 click khung đổi thống kê và dropdown ba chấm không bể chữ', await evaluate("overviewSelectedMenuId==='menu-products'&&mainMenuViewMode==='overview'&&document.getElementById('menuEditorView').hidden&&document.getElementById('menuUsageUsers').textContent==='4 người dùng'&&!document.getElementById('overviewCustomizeButton')&&document.getElementById('overview-popover-menu-products').classList.contains('show')&&[...document.querySelectorAll('#overview-popover-menu-products button')].every(x=>x.scrollWidth<=x.clientWidth+1)"));
  await evaluate("closeMenuTabPopovers()");
  test('OV-006 preview trang thống kê đồng bộ menu đang chọn', await evaluate("document.getElementById('overviewPreviewMenuName').textContent==='Menu sản phẩm'&&document.querySelector('#overviewPhoneMenuPopup .botcake-sim-menu-item').textContent.includes('Giải pháp Chatbot AI')"));
  await evaluate("showMenuOverview('menu-default')");
  for (const [width, code] of [[1440, 'OV-007'], [1280, 'OV-008'], [1024, 'OV-009'], [720, 'OV-010'], [390, 'OV-011']]) {
    await viewport(width, width === 390 ? 844 : 900);
    const overflow = await evaluate("Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-window.innerWidth");
    const layoutOk = width !== 1440 || await evaluate("document.querySelector('.menu-usage-panel').getBoundingClientRect().width>=230&&document.querySelector('.menu-overview-preview-column').getBoundingClientRect().right>=document.querySelector('.menu-overview-shell').getBoundingClientRect().right-36");
    test(`${code} tổng quan không bể ngang ở viewport ${width}px`, overflow <= 1 && layoutOk, `overflow ${overflow}px`);
  }
  await viewport(1440, 1000);
  await evaluate("document.querySelector('#menuOverviewDefaultCard .menu-edit-button').click()");
  test('OV-012 nút Chỉnh sửa có icon, đúng màu và mở editor', await evaluate("document.getElementById('menuOverviewView').hidden&&!document.getElementById('menuEditorView').hidden&&document.getElementById('menuEditorBreadcrumb').textContent==='Menu mặc định'&&!!document.getElementById('publishMenuButton')&&!!document.querySelector('#menuOverviewDefaultCard .menu-edit-button svg')&&getComputedStyle(document.querySelector('#menuOverviewDefaultCard .menu-edit-button')).backgroundColor==='rgb(0, 23, 107)'&&getComputedStyle(document.querySelector('#menuOverviewDefaultCard .menu-edit-button')).borderRadius==='5px'"));
  test('MM-001 chỉ có một Menu mặc định', await evaluate("appData.menus.filter(x=>x.mode==='DEFAULT').length===1"));
  test('MM-002 Menu mặc định không thể xóa', await evaluate("document.getElementById('deleteMenuButton').hidden === true"));
  test('MM-003 không còn menu hard-code theo Lead/Contact/Account', await evaluate("!appData.menus.some(x=>/Khách hàng tiềm năng|Khách hàng cá nhân|Khách hàng doanh nghiệp/.test(x.name))"));
  test('MM-004 mô tả Menu mặc định đúng nghiệp vụ', await evaluate("document.getElementById('menuContextRule').textContent.includes('chưa được chuyển sang menu khác')"));
  test('MM-005 không còn câu chữ phân loại hoặc khớp quy tắc', await evaluate("!document.getElementById('tab_main-menu').textContent.match(/chưa phân loại|khớp quy tắc|loại hồ sơ/i)"));
  await evaluate("switchBotcakeMenu('menu-products')");
  test('MM-006 Menu tùy chỉnh có menu ba chấm', await evaluate("!!document.querySelector('#menu-popover-menu-products')"));
  test('MM-007 mô tả Menu tùy chỉnh dùng hành động chuyển menu', await evaluate("document.getElementById('menuContextRule').textContent.includes('hành động chuyển menu')"));
  await evaluate("toggleMenuActionPicker({stopPropagation(){}})");
  test('MM-008 action picker có đúng 4 hành động chính', (await evaluate("document.querySelectorAll('#menuActionPickerOptions .action-option').length")) === 4);
  test('MM-009 nhãn action picker không tràn khung', await evaluate("[...document.querySelectorAll('#menuActionPickerOptions .action-option')].every(x=>x.scrollWidth<=x.clientWidth+1)"));
  await evaluate("closeMenuActionPicker(); openCreateMenuModal()");
  test('MM-010 form tạo menu không có tag/phân khúc/loại khách hàng', (await evaluate("document.querySelectorAll('#createMenuModal select').length")) === 0);
  await evaluate("document.getElementById('newMenuNameInput').value='';submitCreateUserMenu()");
  test('MM-011 tên menu tùy chỉnh là bắt buộc', await evaluate("document.getElementById('newMenuNameInput').classList.contains('invalid')"));
  await evaluate("document.getElementById('newMenuNameInput').value='Menu đặt lịch';submitCreateUserMenu()");
  test('MM-012 tạo Menu tùy chỉnh thành bản nháp rỗng và xem thống kê trước', await evaluate("getCurrentMenu().name==='Menu đặt lịch'&&getCurrentMenu().status==='DRAFT'&&getCurrentMenu().items.length===0&&mainMenuViewMode==='overview'&&overviewSelectedMenuId===currentEditingMenuId"));
  const createdMenuId = await evaluate('currentEditingMenuId');
  await evaluate(`openMenuEditor(${JSON.stringify(createdMenuId)})`);
  await evaluate(`openRenameMenuModal(${JSON.stringify(createdMenuId)});document.getElementById('newMenuNameInput').value='Menu lịch hẹn';submitCreateUserMenu()`);
  test('MM-013 đổi tên Menu tùy chỉnh', await evaluate(`appData.menus.find(x=>x.id===${JSON.stringify(createdMenuId)}).name==='Menu lịch hẹn'`));
  const beforeDuplicate = await evaluate('appData.menus.length');
  await evaluate(`duplicateMenu(${JSON.stringify(createdMenuId)})`);
  test('MM-014 nhân bản tạo menu ID mới, trạng thái draft và mở thống kê', await evaluate(`appData.menus.length===${beforeDuplicate + 1}&&getCurrentMenu().id!==${JSON.stringify(createdMenuId)}&&getCurrentMenu().status==='DRAFT'&&mainMenuViewMode==='overview'`));
  await evaluate("openMenuEditor(currentEditingMenuId)");
  await evaluate("addMenuItem();deleteCurrentMenuItem()");
  test('MM-014a xóa item mở dialog có đúng tên mục', await evaluate("document.getElementById('deleteMenuItemModal').classList.contains('show')&&document.getElementById('deleteMenuItemName').textContent.includes('Mục mới')"));
  await evaluate("confirmDeleteCurrentMenuItem()");
  test('MM-014b xác nhận xóa chọn mục gần nhất hoặc empty state', await evaluate("getCurrentMenu().items.length===0&&!!document.querySelector('#menuItemsContainer .menu-empty-state')"));
  await evaluate("switchBotcakeMenu('menu-default');document.querySelector('#menuItemsContainer .botcake-menu-item.active').click()");
  test('MM-015 chọn item mở panel Hiệu chỉnh nút và giữ selected state', await evaluate("document.querySelectorAll('#menuItemsContainer .botcake-menu-item.active').length===1&&document.getElementById('colItemEditorPane').classList.contains('show')&&document.getElementById('menuItemEditorBackdrop').classList.contains('show')&&document.getElementById('menuItemPanelTitle').textContent==='Hiệu chỉnh nút'"));
  test('MM-016 preview giữ đúng thứ tự item', await evaluate("[...document.querySelectorAll('#simPhoneMenuPopup .botcake-sim-menu-item')].map(x=>x.textContent.trim()).join('|')===appData.menus[0].items.map(x=>x.title).join('|')"));
  await evaluate("draggedMenuItemIndex=0;handleMenuItemDrop({preventDefault(){},currentTarget:{classList:{remove(){}}}},1)");
  test('MM-016a kéo thả cập nhật order và preview', await evaluate("getCurrentMenu().items[0].id==='item-default-2'&&getCurrentMenu().items.every((x,i)=>x.order===i+1)&&document.querySelector('#simPhoneMenuPopup .botcake-sim-menu-item').textContent.trim()===getCurrentMenu().items[0].title"));
  await evaluate("draggedMenuItemIndex=1;handleMenuItemDrop({preventDefault(){},currentTarget:{classList:{remove(){}}}},0)");
  await evaluate("handleMenuSwitchToggle(true);handleTargetMenuChange('')");
  test('MM-017 bật chuyển menu bắt buộc chọn menu đích', await evaluate("document.getElementById('targetMenuSelect').classList.contains('invalid')&&validateMenu(getCurrentMenu()).some(x=>x.code==='TARGET_MENU_INVALID')"));
  test('MM-017a dữ liệu lỗi làm nút Xuất bản bị vô hiệu hóa', await evaluate("document.getElementById('publishMenuButton').disabled"));
  await evaluate("handleTargetMenuChange('menu-products')");
  test('MM-018 dropdown menu đích chỉ chứa menu đã xuất bản', await evaluate("[...document.querySelectorAll('#targetMenuSelect option')].filter(x=>x.value).every(x=>getPublishedCustomMenus().some(m=>m.id===x.value))"));
  await evaluate("handleMenuSwitchToggle(false)");
  test('MM-019 tắt chuyển menu xóa target và ẩn dropdown', await evaluate("!getCurrentMenu().items[0].shouldSwitchMenu&&getCurrentMenu().items[0].targetMenuId===null&&document.getElementById('targetMenuField').hidden"));
  await evaluate("handleMenuSwitchToggle(true);handleTargetMenuChange('menu-products')");
  test('MM-020 click có chuyển menu chỉ đổi đúng khách A', await evaluate("menuRuntime.clickItem('customer-a','menu-default','item-default-1').menuId==='menu-products'&&menuRuntime.getEffectiveMenu('customer-b').id==='menu-default'"));
  test('MM-021 click item không bật chuyển menu giữ menu hiện tại', await evaluate("menuRuntime.clickItem('customer-a','menu-default','item-default-2').menuId==='menu-products'"));
  test('MM-022 item Về menu chính chuyển khách về mặc định', await evaluate("menuRuntime.clickItem('customer-a','menu-products','item-products-3').menuId==='menu-default'"));
  const publishedTitleBefore = await evaluate("menuRepository.getPublished('menu-default').items[0].title");
  await evaluate("handleMenuItemTitleChange('Danh mục sản phẩm');saveMenuDraft()"); await wait(0);
  test('MM-023 lưu nháp không ghi đè phiên bản hoạt động', await evaluate(`menuRepository.getPublished('menu-default').items[0].title===${JSON.stringify(publishedTitleBefore)}&&getCurrentMenu().status==='DRAFT'`));
  await evaluate("markMenuDirty();publishMenu()"); await wait(0);
  test('MM-024 xuất bản cập nhật phiên bản hoạt động', await evaluate("menuRepository.getPublished('menu-default').items[0].title==='Danh mục sản phẩm'&&getCurrentMenu().status==='PUBLISHED'"));
  test('MM-025 validation phát hiện URL và flow không hợp lệ', await evaluate("validateMenu({...getCurrentMenu(),items:[{id:'x',title:'Test',action:{type:'OPEN_URL',url:'javascript:x'},shouldSwitchMenu:false,targetMenuId:null}]}).some(x=>x.code==='URL_INVALID')&&validateMenu({...getCurrentMenu(),items:[{id:'y',title:'Test',action:{type:'MESSAGE_FLOW',messageFlowId:'flow-archived'},shouldSwitchMenu:false,targetMenuId:null}]}).some(x=>x.code==='FLOW_INVALID')"));
  test('MM-026 validation chặn vượt quá 20 mục', await evaluate("validateMenu({...getCurrentMenu(),items:Array.from({length:21},(_,i)=>({id:String(i),title:'Mục '+i,action:{type:'NEW_MESSAGE',text:'ok'},shouldSwitchMenu:false,targetMenuId:null}))}).some(x=>x.code==='ITEM_LIMIT')"));
  await evaluate("switchBotcakeMenu('menu-support');getCurrentMenu().name='Tên vẫn được giữ';markMenuDirty();menuRepository.failNextOperation='save';saveMenuDraft()"); await wait(0);
  test('MM-027 lỗi lưu không làm mất dữ liệu form', await evaluate("getCurrentMenu().name==='Tên vẫn được giữ'&&dirtyMenuIds.has('menu-support')"));
  await evaluate("getCurrentMenu().name='Menu hỗ trợ';markMenuDirty();window.__saveCalls=0;window.__originalSave=menuRepository.saveDraft.bind(menuRepository);menuRepository.saveDraft=(m)=>{window.__saveCalls++;return window.__originalSave(m)};Promise.all([saveMenuDraft(),saveMenuDraft()])");
  test('MM-028 double-click chỉ gửi một request', (await evaluate('window.__saveCalls')) === 1);
  test('MM-028a repository lưu draft theo nhóm để khôi phục sau refresh', await evaluate("JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).records['group:group-retail'].app.menus.some(x=>x.id==='menu-support'&&x.name==='Menu hỗ trợ')"));
  await evaluate("menuRepository.saveDraft=window.__originalSave;switchBotcakeMenu('menu-products');openDeleteMenuModal('menu-products')");
  test('MM-029 dialog xóa hiển thị số tham chiếu', await evaluate("document.getElementById('deleteMenuImpactText').textContent.includes('mục menu đang tham chiếu')"));
  await evaluate("confirmDeleteMenu()");
  test('MM-030 xóa menu gỡ toàn bộ targetMenuId mồ côi', await evaluate("!appData.menus.some(x=>x.id==='menu-products')&&appData.menus.every(m=>m.items.every(i=>i.targetMenuId!=='menu-products'))"));

  await evaluate("switchTab('faq')");
  test('UI-011 FAQ hiển thị đủ 4 câu hỏi', (await evaluate("document.querySelectorAll('#faqRowsContainer .module-row').length")) === 4);
  test('UI-012 chặn tạo FAQ thứ 5', await evaluate("document.getElementById('addFaqButton').disabled"));
  test('UI-013 preview FAQ đồng bộ đủ chip', (await evaluate("document.querySelectorAll('#faqPhoneChipsList .faq-pill-btn').length")) === 4);
  await evaluate("document.getElementById('faqQuestionInput').value=''; handleFaqQuestionInput(0,''); saveCurrentFaq()");
  test('UI-014 FAQ bắt buộc nhập câu hỏi', await evaluate("document.getElementById('faqQuestionInput').classList.contains('invalid')"));
  await evaluate("handleFaqQuestionInput(0,'Giá AntBuddy?'); document.getElementById('faqQuestionInput').value='Giá AntBuddy?'; saveCurrentFaq()");

  await evaluate("switchTab('welcome-message')");
  const welcomeText = 'Xin chào từ bài kiểm thử giao diện';
  await evaluate(`document.getElementById('welcomeMsgInput').value=${JSON.stringify(welcomeText)}; handleWelcomeMsgChange(${JSON.stringify(welcomeText)})`);
  test('UI-015 Welcome cập nhật preview tức thời', await evaluate(`document.getElementById('simWelcomeBubble').textContent===${JSON.stringify(welcomeText)}`));
  test('UI-016 bộ đếm Welcome chính xác', await evaluate(`document.getElementById('welcomeCharCount').textContent==='${welcomeText.length}/640'`));
  test('UI-017 Welcome giới hạn 640 ký tự', (await evaluate("document.getElementById('welcomeMsgInput').maxLength")) === 640);

  await evaluate("switchTab('default-message')");
  const fallbackText = 'AntBuddy đã nhận tin nhắn và sẽ chuyển chuyên viên.';
  await evaluate(`document.getElementById('defaultFallbackInput').value=${JSON.stringify(fallbackText)}; handleDefaultMessageChange(${JSON.stringify(fallbackText)})`);
  test('UI-018 Fallback cập nhật preview tức thời', await evaluate(`document.getElementById('simDefaultBubble').textContent===${JSON.stringify(fallbackText)}`));
  test('UI-019 Fallback có frequency cap', (await evaluate("document.querySelectorAll('#defaultFrequencyCap option').length")) === 3);
  
  await evaluate("switchDefaultSubTab('stats')");
  test('UI-019a Fallback chuyển tab thống kê hiển thị nhật ký', await evaluate("document.getElementById('defaultSubTabContentStats').style.display === 'block' && document.querySelectorAll('#defaultActivityLogTableBody tr').length > 0"));
  await evaluate("switchDefaultSubTab('editor')");

  await evaluate("confirmDeleteDefaultMessage()");
  test('UI-019b Fallback xóa tin nhắn chuyển về màn hình tạo ban đầu', await evaluate("document.getElementById('defaultMessageEmptyState').style.display === 'flex' && document.getElementById('defaultMessageMainView').style.display === 'none'"));

  await evaluate("createInitialDefaultMessage()");
  test('UI-019c Fallback tạo lại tin nhắn hiển thị khung chỉnh sửa', await evaluate("document.getElementById('defaultMessageEmptyState').style.display === 'none' && document.getElementById('defaultMessageMainView').style.display === 'flex'"));

  await evaluate("switchTab('keywords')");
  test('UI-020 danh sách Keyword được render từ dữ liệu', (await evaluate("document.querySelectorAll('#keywordsListContainer .module-row').length")) === 2);
  await evaluate("document.getElementById('keywordTesterInput').value='Tôi muốn báo giá'; testKeywordMatcher()");
  test('UI-021 matcher Keyword chọn đúng luật ưu tiên', await evaluate("document.getElementById('keywordTestResult').textContent.includes('Hỏi giá dịch vụ')"));
  await evaluate("openCreateKeywordModal(); document.getElementById('keywordNameInput').value=''; saveKeywordRule()");
  test('UI-022 form Keyword báo lỗi trường bắt buộc', await evaluate("document.getElementById('keywordNameInput').classList.contains('invalid')"));
  await evaluate("closeKeywordModal(); document.getElementById('keywordSearchInput').value='không tồn tại'; renderKeywords()");
  test('UI-023 tìm kiếm Keyword có empty state', await evaluate("!!document.querySelector('#keywordsListContainer .empty-state')"));

  await evaluate("switchTab('sequences')");
  test('UI-024 danh sách Kịch bản hiển thị đúng', (await evaluate("document.querySelectorAll('#sequenceListContainer .module-row').length")) === 2);
  const stepBefore = await evaluate("appData.sequences.find(x=>x.id===currentSequenceId).steps.length");
  await evaluate('addSequenceStep()');
  test('UI-025 thêm bước Kịch bản cập nhật dữ liệu và UI', (await evaluate("appData.sequences.find(x=>x.id===currentSequenceId).steps.length")) === stepBefore + 1);
  await evaluate('createSequence(); toggleCurrentSequence(true)');
  test('UI-026 không bật Kịch bản rỗng', await evaluate("!appData.sequences.find(x=>x.id===currentSequenceId).active"));

  await evaluate("switchTab('rules')");
  test('UI-027 danh sách Quy luật hiển thị đúng', (await evaluate("document.querySelectorAll('#ruleListContainer .module-row').length")) === 1);
  await evaluate('createRule(); toggleCurrentRule(true)');
  test('UI-028 không bật Quy luật thiếu điều kiện/hành động', await evaluate("!appData.rules.find(x=>x.id===currentRuleId).active"));
  await evaluate('addRuleCondition(); addRuleAction(); toggleCurrentRule(true)');
  test('UI-029 Quy luật hợp lệ có thể bật', await evaluate("appData.rules.find(x=>x.id===currentRuleId).active"));
  test('UI-030 hành động Quy luật liên kết Kịch bản tồn tại', await evaluate("appData.sequences.some(s=>appData.rules.find(x=>x.id===currentRuleId).actions.some(a=>a.includes(s.name)))"));
  test('UI-031 toàn bộ tham chiếu Rule trỏ đến tài nguyên tồn tại', await evaluate("appData.rules.every(rule=>ruleLinksAreValid(rule))"));

  for (const [width, code] of [[1440, 'UI-033'], [1024, 'UI-034'], [720, 'UI-035']]) {
    await viewport(width, 900);
    const overflow = await evaluate("Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-window.innerWidth");
    test(`${code} không bể ngang ở viewport ${width}px`, overflow <= 1, `overflow ${overflow}px`);
  }
  await viewport(720, 900);
  test('UI-036 mobile chuyển workspace thành một cột', await evaluate("getComputedStyle(document.querySelector('#tab_rules .automation-workspace')).flexDirection==='column'"));
  test('UI-037 tất cả input chính nằm trong viewport', await evaluate("[...document.querySelectorAll('#tab_rules input,#tab_rules button')].filter(x=>x.offsetParent).every(x=>{const r=x.getBoundingClientRect();return r.left>=-1&&r.right<=innerWidth+1})"));
  await viewport(1440,1000);
  await evaluate("AutomationHub.open('pages');AutomationHub.filter('query','Coffee')");
  test('HUB-005 tìm kiếm trang', await evaluate("document.querySelectorAll('.hub-table tbody tr').length===1&&document.querySelector('.hub-page-link').textContent.includes('Coffee')"));
  await evaluate("AutomationHub.filter('query','');AutomationHub.filter('platform','Instagram')");
  test('HUB-006 lọc nền tảng kết hợp trạng thái', await evaluate("document.querySelectorAll('.hub-table tbody tr').length===1&&document.querySelector('.hub-page-link').textContent.includes('Beauty')"));
  await evaluate("AutomationHub.filter('platform','all');AutomationHub.pinPage('page-tech')");
  test('HUB-007 ghim đưa trang lên đầu', await evaluate("document.querySelector('.hub-page-link').textContent.includes('Tech Support')"));
  await evaluate("AutomationHub.hidePage('page-tech');AutomationHub.filter('status','hidden')");
  test('HUB-008 ẩn chuyển trang sang danh sách đã ẩn', await evaluate("document.querySelectorAll('.hub-table tbody tr').length===1&&document.querySelector('.hub-page-link').disabled"));
  await evaluate("AutomationHub.hidePage('page-tech');AutomationHub.filter('status','active');AutomationHub.togglePage('page-tech',false)");
  test('HUB-009 tắt Automation lưu đúng trang', await evaluate("JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).pages.find(p=>p.id==='page-tech').enabled===false"));
  await evaluate("AutomationHub.filter('status','inactive');AutomationHub.activate('page-garden');document.getElementById('hubForm').requestSubmit();AutomationHub.filter('status','active');AutomationHub.paginate(2)");
  test('HUB-010 kích hoạt và phân trang', await evaluate("document.querySelectorAll('.hub-table tbody tr').length===1&&document.querySelector('.hub-pagination .current').textContent==='2'"));
  await evaluate("AutomationHub.connect();document.getElementById('hubConnectName').value='Test Store';document.getElementById('hubConnectId').value='test-store-01';document.getElementById('hubForm').requestSubmit()");
  test('HUB-011 thêm trang mô phỏng', await evaluate("workspaceData.pages.some(p=>p.externalId==='test-store-01'&&p.connected)"));
  await evaluate("AutomationHub.connect();document.getElementById('hubConnectName').value='Duplicate';document.getElementById('hubConnectId').value='test-store-01';document.getElementById('hubForm').requestSubmit()");
  test('HUB-012 ngăn kết nối trùng ID và nền tảng', await evaluate("!document.getElementById('hubFormError').hidden&&workspaceData.pages.filter(p=>p.externalId==='test-store-01').length===1"));
  await evaluate("AutomationHub.closeDialog();AutomationHub.editGroup();document.getElementById('hubGroupName').value='Nhóm kiểm thử';document.getElementById('hubForm').requestSubmit()");
  test('HUB-013 nhóm cần ít nhất hai trang', await evaluate("!document.getElementById('hubFormError').hidden&&!workspaceData.groups.some(g=>g.name==='Nhóm kiểm thử')"));
  await evaluate("for(const id of ['page-beauty','page-home']){const input=document.querySelector('#hubForm input[value='+id+']');input.checked=true;input.dispatchEvent(new Event('change'));}document.getElementById('hubForm').requestSubmit();window.__qaGroup=workspaceData.groups.find(g=>g.name==='Nhóm kiểm thử').id;AutomationHub.enter('group',window.__qaGroup)");
  test('HUB-014 chọn nhóm mở phạm vi nhóm thực sự', await evaluate("AutomationHub.scope.type==='group'&&document.getElementById('activePageName').textContent==='Nhóm kiểm thử'&&document.getElementById('automationScopeBar').textContent.includes('2 trang')"));
  const beforeSharedPublish = await evaluate("menuRepository.getPublished('menu-default').items[0].title");
  await evaluate("openMenuEditor('menu-default');handleMenuItemTitleChange('Menu chung thử nghiệm');saveMenuDraft()");
  await evaluate("AutomationHub.enter('page','page-home')");
  test('HUB-015 thành viên nhận bản nháp chung và giữ menu đã xuất bản', await evaluate(`getCurrentMenu().items[0].title==='Menu chung thử nghiệm'&&menuRepository.getPublished('menu-default').items[0].title===${JSON.stringify(beforeSharedPublish)}`));
  await evaluate("document.getElementById('welcomeMsgInput').value='Chào mừng từ nhóm kiểm thử';saveWelcomeConfig();AutomationHub.enter('page','page-beauty')");
  test('HUB-016 tin nhắn mở đầu đồng bộ giữa thành viên', await evaluate("document.getElementById('welcomeMsgInput').value==='Chào mừng từ nhóm kiểm thử'"));
  await evaluate("AutomationHub.enter('page','page-coffee')");
  test('HUB-017 cấu hình nhóm khác không bị ghi đè', await evaluate("getCurrentMenu().items[0].title!=='Menu chung thử nghiệm'&&document.getElementById('welcomeMsgInput').value!=='Chào mừng từ nhóm kiểm thử'"));
  await evaluate("AutomationHub.open('templates');AutomationHub.previewTemplate('template-shop-online')");
  test('HUB-018 xem trước nội dung mẫu', await evaluate("document.querySelector('.hub-preview-menu').textContent.includes('Xem sản phẩm')"));
  test('HUB-018a preview hiển thị metadata và manifest đầy đủ', await evaluate("document.querySelector('.tpl-preview-meta').textContent.includes('Mẫu hệ thống AntBot')&&document.querySelectorAll('.tpl-preview-metrics>div').length===8&&document.querySelector('.tpl-preview-dialog').textContent.includes('Tin nhắn')&&document.querySelector('.tpl-preview-dialog').textContent.includes('Câu hỏi thường gặp')&&document.querySelector('.tpl-preview-dialog').textContent.includes('Quy luật')"));
  test('HUB-018b preview nêu rõ trạng thái an toàn sau áp dụng', await evaluate("document.querySelector('.tpl-preview-warning').textContent.includes('Bản nháp/Tắt')&&document.querySelector('.tpl-preview-meta').textContent.includes('Bản nháp / Tắt')"));
  test('HUB-018c hai trang có biến thể độc lập từ cùng mẫu gốc', await evaluate("(()=>{const d=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2'));const a=d.records['page:page-beauty'],b=d.records['page:page-home'];return a.templateOrigin.templateId==='template-shop-online'&&b.templateOrigin.templateId==='template-shop-online'&&a.app.menus[0].items[0].title==='Soi da & tư vấn routine'&&b.app.menus[0].items[0].title==='Xem bộ sưu tập thiết kế'&&a.welcome.text!==b.welcome.text})()"));
  test('HUB-018d preview mẫu hiển thị hai trang đã tùy biến', await evaluate("document.querySelectorAll('.tpl-preview-variant-grid article').length===2&&document.querySelector('.tpl-preview-variants').textContent.includes('Beauty Corner')&&document.querySelector('.tpl-preview-variants').textContent.includes('Home Decor')"));
  await evaluate("AutomationHub.closeDialog();AutomationHub.applyTemplate('template-shop-online');document.getElementById('hubTarget').value='group:'+window.__qaGroup;document.getElementById('hubTarget').dispatchEvent(new Event('change'));document.getElementById('hubApplyConfirm').checked=true;document.getElementById('hubForm').requestSubmit()");
  test('HUB-019 áp dụng mẫu cho nhóm tạo bản nháp, giữ published', await evaluate(`AutomationHub.scope.type==='group'&&getCurrentMenu().items[0].title==='Xem sản phẩm'&&dirtyMenuIds.has('menu-default')&&menuRepository.getPublished('menu-default').items[0].title===${JSON.stringify(beforeSharedPublish)}`));
  await evaluate("AutomationHub.enter('page','page-home')");
  test('HUB-020 mẫu áp dụng cho toàn bộ nhóm', await evaluate("getCurrentMenu().items[0].title==='Xem sản phẩm'"));
  await evaluate("AutomationHub.restoreTemplateBackup();document.getElementById('hubForm').requestSubmit()");
  test('HUB-021 khôi phục cấu hình trước mẫu', await evaluate("getCurrentMenu().items[0].title==='Menu chung thử nghiệm'"));
  await evaluate("AutomationHub.saveTemplate();document.getElementById('hubTemplateName').value='Mẫu tự tạo QA';document.getElementById('hubForm').requestSubmit()");
  test('HUB-022 tạo mẫu từ cấu hình trang', await evaluate("document.getElementById('hubContent').textContent.includes('Mẫu tự tạo QA')&&JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).templates.find(t=>t.name==='Mẫu tự tạo QA').config.app.userMenuAssignments.length===0"));
  await evaluate("AutomationHub.editGroup(window.__qaGroup);document.getElementById('hubGroupAuto').checked=false;document.getElementById('hubForm').requestSubmit();AutomationHub.enter('group',window.__qaGroup);openMenuEditor('menu-default');handleMenuItemTitleChange('Menu đồng bộ thủ công');saveMenuDraft()");
  await evaluate("AutomationHub.enter('page','page-home')");
  test('HUB-023 tắt dùng chung giữ cấu hình riêng', await evaluate("getCurrentMenu().items[0].title==='Menu chung thử nghiệm'"));
  await evaluate("AutomationHub.enter('group',window.__qaGroup);AutomationHub.sync();AutomationHub.enter('page','page-home')");
  test('HUB-024 đồng bộ thủ công cập nhật thành viên', await evaluate("getCurrentMenu().items[0].title==='Menu đồng bộ thủ công'"));
  await evaluate("AutomationHub.open('groups');AutomationHub.removeGroup(window.__qaGroup);document.getElementById('hubForm').requestSubmit();AutomationHub.enter('page','page-home')");
  test('HUB-025 giải tán nhóm giữ cấu hình của thành viên', await evaluate("!workspaceData.groups.some(g=>g.id===window.__qaGroup)&&getCurrentMenu().items[0].title==='Menu đồng bộ thủ công'"));
  await evaluate("dirtyMenuIds.clear();moduleDirtyState.clear();isDefaultMessageDirty=false;AutomationHub.open('pages')");
  await command('Page.reload'); await wait(500);
  test('HUB-026 tải lại trở về danh sách, dữ liệu quản lý vẫn còn', await evaluate("AutomationHub.isOpen&&!AutomationHub.scope&&workspaceData.pages.some(p=>p.externalId==='test-store-01')"));
  await evaluate("AutomationHub.enter('page','page-home')");
  test('HUB-027 cấu hình riêng được khôi phục sau reload', await evaluate("getCurrentMenu().items[0].title==='Menu đồng bộ thủ công'"));

  await evaluate("AutomationHub.open('templates');document.querySelector('.hub-toolbar .hub-primary').click()");
  test('TPL-001 nút Tạo mẫu forward thẳng sang Page Automation', await evaluate("AutomationHub.isOpen&&!AutomationHub.scope&&document.querySelector('.hub-heading h1').textContent==='Danh sách trang'&&document.getElementById('hubModal').hidden"));
  test('TPL-001a không có giao diện hoặc tùy chọn chọn trang riêng', await evaluate("!document.querySelector('.hub-template-route')&&!document.querySelector('.tpl-source-summary')&&![...document.querySelectorAll('button')].some(x=>x.textContent.includes('Chọn trang'))"));
  await evaluate("AutomationHub.enter('page','page-home')");
  test('TPL-001b chọn trang theo luồng Automation thường và chờ xuất bản', await evaluate("AutomationHub.scope.id==='page-home'&&document.getElementById('automationScopeBar').textContent.includes('Mẫu mới · Lưu/Xuất bản để tạo mẫu')&&document.getElementById('hubModal').hidden"));
  test('TPL-001c cả 7 mục con đều có nút Xuất bản toàn cấu hình', await evaluate("(()=>{const tabs=['main-menu','faq','welcome-message','default-message','keywords','sequences','rules'];const ok=tabs.every(tab=>{switchTab(tab);return !!document.getElementById('publishPageTemplateButton')});switchTab('main-menu');return ok})()"));
  await evaluate("openMenuEditor('menu-default');handleMenuItemTitleChange('Menu khởi tạo mẫu');AutomationHub.publishPageTemplate()");
  await evaluate("window.__regressionTemplateId=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).templates.find(t=>t.name==='Mẫu Home Decor').id");
  test('TPL-002 lần xuất bản đầu tự tạo mẫu cho trang', await evaluate("AutomationHub.scope.type==='page'&&AutomationHub.scope.id==='page-home'&&document.getElementById('automationScopeBar').textContent.includes('Đang cấu hình mẫu: Mẫu Home Decor')"));
  test('TPL-002a mẫu và trang nguồn liên kết hai chiều', await evaluate("(()=>{const d=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')),t=d.templates.find(x=>x.id===window.__regressionTemplateId);return t.sourcePageId==='page-home'&&t.parentTemplateId==='template-shop-online'&&t.rootTemplateId==='template-shop-online'&&t.versions.length===1&&d.records['page:page-home'].managedTemplateId===t.id})()"));

  await evaluate("AutomationHub.open('templates');AutomationHub.switchTemplateCategory('mine')");
  test('TPL-003 Mẫu của tôi hiển thị mẫu cấu hình cho trang', await evaluate("(()=>{const c=[...document.querySelectorAll('.hub-card')].find(x=>x.querySelector('h2')?.textContent==='Mẫu Home Decor');return c&&c.querySelector('.hub-template-tag').textContent.includes('MẪU CỦA TÔI')&&c.querySelector('.hub-template-used').textContent.includes('Home Decor')&&c.textContent.includes('Shop online')})()"));
  test('TPL-003a footer mẫu hoạt động có bốn vị trí cố định', await evaluate("(()=>{const c=[...document.querySelectorAll('.hub-card')].find(x=>x.querySelector('h2')?.textContent==='Mẫu Home Decor'),f=c.querySelector('.hub-card-foot');return f.children.length===4&&f.children[0].textContent.includes('Xem trước')&&f.children[1].textContent.includes('Chỉnh sửa')&&f.children[2].textContent.includes('Ngừng sử dụng')&&f.children[3].textContent.includes('Sử dụng mẫu')&&f.scrollWidth<=f.clientWidth})()"));
  await evaluate("[...document.querySelectorAll('.hub-card')].find(x=>x.querySelector('h2')?.textContent==='Mẫu Home Decor').querySelector('button[onclick*=openTemplateEditor]').click()");
  test('TPL-003b Chỉnh sửa quay lại workspace Automation của trang nguồn', await evaluate("AutomationHub.scope.id==='page-home'&&document.getElementById('automationScopeBar').textContent.includes('Đang cấu hình mẫu: Mẫu Home Decor')&&document.getElementById('hubModal').hidden"));

  await evaluate("openMenuEditor('menu-default');handleMenuItemTitleChange('Menu đã xuất bản vào mẫu');publishMenu()");
  test('TPL-004 xuất bản riêng một module chưa ghi snapshot toàn trang', await evaluate("JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).templates.find(x=>x.id===window.__regressionTemplateId).versions.length===1"));
  await evaluate("AutomationHub.publishPageTemplate()");
  test('TPL-004a nút Xuất bản chung tạo phiên bản toàn cấu hình và audit log', await evaluate("(()=>{const d=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')),t=d.templates.find(x=>x.id===window.__regressionTemplateId),m=t.config.app.menus.find(x=>x.mode==='DEFAULT'),l=d.publishLogs[0];return t.versions.length===2&&t.lastPublishedModule==='Toàn bộ cấu hình trang'&&m.items[0].title==='Menu đã xuất bản vào mẫu'&&l.templateId===t.id&&l.module==='ALL_AUTOMATION'&&!!l.config.app})()"));
  await evaluate("handleMenuItemTitleChange('Thay đổi chỉ lưu nháp');saveMenuDraft()");
  test('TPL-004b Lưu bản nháp Menu không cập nhật mẫu', await evaluate("(()=>{const t=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).templates.find(x=>x.id===window.__regressionTemplateId),m=t.config.app.menus.find(x=>x.mode==='DEFAULT');return t.versions.length===2&&m.items[0].title==='Menu đã xuất bản vào mẫu'})()"));
  await evaluate("AutomationHub.publishPageTemplate()");
  test('TPL-004c Xuất bản chung chụp cả cấu hình bản nháp hiện tại', await evaluate("(()=>{const t=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).templates.find(x=>x.id===window.__regressionTemplateId),m=t.config.app.menus.find(x=>x.mode==='DEFAULT');return t.versions.length===3&&t.versions.at(-1).versionNo===3&&m.items[0].title==='Thay đổi chỉ lưu nháp'})()"));
  await evaluate("document.getElementById('welcomeMsgInput').value='Xin chào từ mẫu Home Decor';handleWelcomeMsgChange('Xin chào từ mẫu Home Decor');saveWelcomeConfig()");
  test('TPL-004d Lưu module không tự cập nhật mẫu trước khi xuất bản chung', await evaluate("JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).templates.find(x=>x.id===window.__regressionTemplateId).versions.length===3"));
  await evaluate("AutomationHub.publishPageTemplate()");
  test('TPL-004e Xuất bản chung lưu toàn bộ module vào phiên bản mới', await evaluate("(()=>{const t=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')).templates.find(x=>x.id===window.__regressionTemplateId);return t.versions.length===4&&t.config.welcome.text==='Xin chào từ mẫu Home Decor'})()"));

  await evaluate("AutomationHub.open('templates');AutomationHub.switchTemplateCategory('mine');AutomationHub.previewTemplate(window.__regressionTemplateId)");
  test('TPL-005 xem trước hiển thị mẫu gốc, trang cấu hình và nội dung mới nhất', await evaluate("document.querySelector('.tpl-preview-meta').textContent.includes('Shop online')&&document.querySelector('.tpl-preview-variants').textContent.includes('Home Decor')&&document.querySelector('.tpl-preview-variants').textContent.includes('Trang cấu hình mẫu')&&document.querySelector('.hub-dialog').textContent.includes('Xin chào từ mẫu Home Decor')"));
  await evaluate("AutomationHub.closeDialog();AutomationHub.renderApplicationModal(window.__regressionTemplateId,'page-beauty')");
  test('TPL-006 kế hoạch áp dụng hiển thị đầy đủ cấu hình', await evaluate("document.querySelector('.tpl-plan-matrix').textContent.includes('Menu')&&document.querySelector('.tpl-plan-matrix').textContent.includes('Tin nhắn mở đầu')"));
  test('TPL-006a bộ chọn trang áp dụng hỗ trợ multiple choice', await evaluate("document.querySelectorAll('#tplPageDropdownMenu input[type=checkbox]').length>=2&&document.getElementById('tplPageDropdownTrigger').textContent.includes('1 trang đã chọn')"));
  await evaluate("document.querySelector('.tpl-eye-btn').click()");
  test('TPL-006b nút View mở so sánh trang và mẫu', await evaluate("document.querySelector('.hub-dialog').textContent.includes('Chi tiết cấu hình')&&document.querySelector('.hub-dialog').textContent.includes('Bản hiện tại trên')&&document.querySelector('.hub-dialog').textContent.includes('Bản trong Gói Mẫu')"));

  await evaluate("AutomationHub.renderApplicationModal(window.__regressionTemplateId,'page-beauty');AutomationHub.toggleApplicationTarget(window.__regressionTemplateId,'page-home',true);document.getElementById('chkAppPlanConfirm').click();document.getElementById('btnApplyTemplateSubmit').click()");
  test('TPL-007 áp dụng multiple choice ghi log riêng cho các trang', await evaluate("document.querySelector('.hub-dialog').textContent.includes('Áp dụng mẫu thành công')&&(()=>{const d=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2')),t=d.templates.find(x=>x.id===window.__regressionTemplateId);return d.records['page:page-beauty'].templateOrigin.templateId===window.__regressionTemplateId&&t.runs.some(x=>x.targetPageId==='page-beauty')&&t.runs.some(x=>x.targetPageId==='page-home')})()"));
  await evaluate("AutomationHub.closeDialog();AutomationHub.open('templates');AutomationHub.switchTemplateCategory('mine');AutomationHub.previewTemplate(window.__regressionTemplateId)");
  test('TPL-007a chi tiết mẫu phân biệt trang cấu hình và trang áp dụng', await evaluate("document.querySelector('.tpl-preview-variants').textContent.includes('Home Decor')&&document.querySelector('.tpl-preview-variants').textContent.includes('Beauty Corner')&&document.querySelector('.tpl-preview-variants').textContent.includes('2 trang')"));

  await evaluate("AutomationHub.closeDialog();AutomationHub.renderApplicationModal(window.__regressionTemplateId,'page-coffee');document.getElementById('chkAppPlanConfirm').click();document.getElementById('btnApplyTemplateSubmit').click()");
  test('TPL-008 trang thuộc nhóm tự đồng bộ ghi đúng scope nhóm', await evaluate("(()=>{const d=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2'));return d.records['group:group-retail'].templateOrigin.templateId===window.__regressionTemplateId&&!!d.templateBackups['group:group-retail']})()"));

  await evaluate("AutomationHub.closeDialog();AutomationHub.renderApplicationModal('template-shop-online','page-beauty');document.getElementById('chkAppPlanConfirm').click();document.getElementById('btnApplyTemplateSubmit').click()");
  test('TPL-009 áp dụng mẫu hệ thống không phát sinh ReferenceError', await evaluate("document.querySelector('.hub-dialog').textContent.includes('Áp dụng mẫu thành công')"));

  await evaluate("AutomationHub.closeDialog();AutomationHub.open('templates');AutomationHub.switchTemplateCategory('mine');AutomationHub.archiveTemplate(window.__regressionTemplateId);AutomationHub.switchTemplateStatusFilter('ARCHIVED')");
  test('TPL-010 mẫu ngừng sử dụng được lọc, giữ lại và không thể áp dụng', await evaluate("document.getElementById('hubContent').textContent.includes('Mẫu Home Decor')&&!!document.querySelector('.hub-card .hub-primary:disabled')&&document.getElementById('hubContent').textContent.includes('Kích hoạt lại')"));
  test('TPL-010a mẫu ngừng sử dụng ẩn Chỉnh sửa và giữ nguyên vị trí hành động', await evaluate("(()=>{const c=[...document.querySelectorAll('.hub-card')].find(x=>x.querySelector('h2')?.textContent==='Mẫu Home Decor'),f=c.querySelector('.hub-card-foot');return !c.querySelector('[onclick*=openTemplateEditor]')&&f.children.length===4&&f.children[0].textContent.includes('Xem trước')&&f.children[1].textContent.includes('Kích hoạt lại')&&f.children[2].textContent.includes('Xóa')&&f.children[3].disabled&&f.scrollWidth<=f.clientWidth})()"));
  await evaluate("AutomationHub.restoreTemplate(window.__regressionTemplateId);AutomationHub.switchTemplateStatusFilter('ACTIVE');AutomationHub.switchTemplateChannelFilter('Zalo OA')");
  test('TPL-011 bộ lọc kênh loại mẫu không tương thích', await evaluate("!document.getElementById('hubContent').textContent.includes('Mẫu Home Decor')"));
  await evaluate("AutomationHub.switchTemplateChannelFilter('all');AutomationHub.archiveTemplate(window.__regressionTemplateId);AutomationHub.switchTemplateStatusFilter('ARCHIVED');AutomationHub.deleteTemplate(window.__regressionTemplateId);document.getElementById('hubForm').requestSubmit()");
  test('TPL-012 xóa mẫu gỡ liên kết quản lý khỏi trang nguồn', await evaluate("(()=>{const d=JSON.parse(localStorage.getItem('antbuddy_automation_hub_v2'));return !d.templates.some(x=>x.id===window.__regressionTemplateId)&&!d.records['page:page-home'].managedTemplateId})()"));
  test('UI-038 không phát sinh lỗi JavaScript sau toàn bộ tương tác', browserErrors.length === 0, browserErrors.join(' | '));

  const passed = results.filter(x => x.pass).length;
  const failed = results.length - passed;
  console.log(`\nUI TEST SUMMARY: ${passed}/${results.length} PASSED, ${failed} FAILED`);
  if (failed) process.exitCode = 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  try { if (ws?.readyState === WebSocket.OPEN) ws.close(); } catch (_) {}
  chrome.kill('SIGTERM');
  if (staticServer) await new Promise(resolve => staticServer.close(resolve));
  try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (_) {}
});
