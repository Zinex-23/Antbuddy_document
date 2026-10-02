/* Local Automation workspace: explicit page/group scopes and reusable configurations. */
window.AutomationHub = (() => {
    'use strict';
    const KEY = 'antbuddy_automation_hub_v2';
    const platforms = ['Facebook', 'Zalo OA', 'Telegram', 'Instagram', 'WhatsApp'];
    const icons = { Facebook:'f', 'Zalo OA':'Z', Telegram:'↗', Instagram:'◎', WhatsApp:'◉' };
    const h = value => escapeHtml(String(value ?? ''));
    const copy = value => JSON.parse(JSON.stringify(value));
    let data, seed, tab = 'pages', status = 'active', query = '', platform = 'all', pageNumber = 1, templateCategory = 'builtin';
    let templateCreationPending = false;
    let selected = new Set(), focusReturn = null, lastScope = null, dialogAction = null;
    const api = { ready:false, isOpen:true, scope:null };
    const pageById = id => data.pages.find(p => p.id === id);
    const groupById = id => data.groups.find(g => g.id === id);
    const groupForPage = id => data.groups.find(g => g.pageIds.includes(id));
    const uid = prefix => `${prefix}-${crypto.randomUUID()}`;
    const templateSnapshot = template => template?.versions?.find(v => v.id === template.currentVersionId)?.snapshot
        || template?.versions?.[0]?.snapshot || template?.config || { app:{} };
    const scopeKey = scope => {
        if (scope.type === 'group') return `group:${scope.id}`;
        const group = groupForPage(scope.id);
        return group?.autoSync ? `group:${group.id}` : `page:${scope.id}`;
    };
    const scopeName = scope => (scope.type === 'group' ? groupById(scope.id) : pageById(scope.id))?.name || '';
    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(data)); return true; }
        catch (_) { notify('Không thể lưu dữ liệu vào trình duyệt. Hãy kiểm tra dung lượng lưu trữ.'); return false; }
    }
    function snapshot() {
        const currentRecord = api.scope && data?.records?.[scopeKey(api.scope)];
        const origin = currentRecord?.templateOrigin;
        const managedTemplateId = currentRecord?.managedTemplateId;
        return { app:copy(appData), published:[...menuRepository.publishedVersions.values()].map(copy),
            fallback:copy(persistedDefaultMessage), fallbackDraft:copy(draftDefaultMessage),
            welcome:{ text:document.getElementById('welcomeMsgInput').value, active:document.getElementById('welcomeActiveToggle').checked, reply:document.getElementById('welcomeQuickReplyInput').value },
            dirtyMenus:[...dirtyMenuIds], dirtyModules:[...moduleDirtyState], fallbackDirty:isDefaultMessageDirty,
            ...(origin ? { templateOrigin:copy(origin) } : {}),
            ...(managedTemplateId ? { managedTemplateId } : {}) };
    }
    function seedPages() {
        return [
            ['coffee','Coffee House VN','CoffeeShop','Facebook','#b95d09',true,'fb_8234567890123456'],
            ['green','Green Shop','Sản phẩm hữu cơ & healthy','Zalo OA','#009b6e',true,'zl_7283645819203456'],
            ['travel','Travel Time','Kênh thông báo ưu đãi tour','Telegram','#0bafe0',true,'tg_5647281903456123'],
            ['beauty','Beauty Corner','Chăm sóc sắc đẹp & Spa','Instagram','#f43f75',true,'ig_9283647102938456'],
            ['home','Home Decor','Thiết kế nội thất cao cấp','Facebook','#475569',true,'fb_3847562910384756'],
            ['tech','Tech Support','Kênh kỹ thuật & bảo hành','WhatsApp','#008460',true,'wa_5839281746382910'],
            ['studio','Studio Creative','Thiết kế & sáng tạo','Instagram','#8b5cf6',false,'ig_2384619023845761'],
            ['garden','Little Garden','Không gian sống xanh','Facebook','#65a30d',false,'fb_1384765982345710']
        ].map(([id,name,description,channel,color,connected,externalId]) => ({ id:`page-${id}`, name, description, channel, color, connected, externalId,
            initials:name.split(' ').slice(0,2).map(x=>x[0]).join(''), handle:externalId, enabled:id !== 'home', hidden:false, pinned:false }));
    }
    function makeTemplate(id, name, description, symbol, titles, builtin = true) {
        const config = copy(seed);
        config.app.menus = [{ id:'menu-default', name:'Menu mặc định', mode:'DEFAULT', status:'DRAFT', createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(),
            items:titles.map((title,i) => ({ id:`${id}-item-${i}`, title, order:i+1, action:{ type:'NEW_MESSAGE', text:`Cảm ơn bạn đã quan tâm. Bạn cần hỗ trợ về ${title.toLowerCase()}?` }, shouldSwitchMenu:false, targetMenuId:null })) }];
        config.app.userMenuAssignments = [];
        config.app.rules = [];
        config.published = [];
        config.welcome.text = `👋 Chào mừng bạn đến với ${name}! Chúng tôi có thể hỗ trợ gì cho bạn hôm nay?`;
        config.dirtyMenus = []; config.dirtyModules = []; config.fallbackDirty = false;
        return { id, name, description, symbol, config, builtin, rootTemplateId:id };
    }
    function seedTemplates() {
        return [
            makeTemplate('template-shop-online','Shop online','Kịch bản bán hàng trực tuyến: tra cứu danh mục sản phẩm, bảng giá ưu đãi và tư vấn đặt hàng.','🛍️',['Xem sản phẩm','Bảng giá & Khuyến mãi','Tư vấn đặt hàng'],true),
            makeTemplate('template-real-estate','Bất động sản','Kịch bản tư vấn dự án bất động sản, tra cứu bảng giá căn hộ/đất nền và đăng ký tham quan thực tế.','🏢',['Dự án nổi bật','Bảng giá & Chính sách','Đặt lịch tham quan'],true),
            makeTemplate('template-cosmetics','Cửa hàng mĩ phẩm','Kịch bản tư vấn mỹ phẩm, các bước chăm sóc da theo liệu trình và combo làm đẹp cá nhân.','💄',['Sản phẩm dưỡng da','Bảng giá & Combo hot','Tư vấn soi da & Makeup'],false)
        ];
    }
    function makeTemplateVariant(template, pageId, variant) {
        const config = copy(templateSnapshot(template));
        const menu = config.app.menus[0];
        const isBeauty = variant === 'beauty';
        const now = '2026-10-01T09:00:00+07:00';
        const variantData = isBeauty ? {
            label:'Biến thể mỹ phẩm',
            summary:'Đổi nội dung sang tư vấn da, combo mỹ phẩm và đặt lịch soi da.',
            welcome:'✨ Chào bạn đến với Beauty Corner! Bạn muốn soi da, tìm sản phẩm hay xem combo hôm nay?',
            reply:'Soi da miễn phí',
            fallback:'Mình chưa xác định được nhu cầu của bạn. Bạn có thể chọn loại da, sản phẩm quan tâm hoặc để lại số điện thoại nhé.',
            menu:[
                ['Soi da & tư vấn routine','Mình sẽ hỏi 3 câu ngắn để xác định loại da và routine phù hợp cho bạn.'],
                ['Combo bán chạy','Beauty Corner đang có combo làm sạch, phục hồi và chống nắng theo từng loại da.'],
                ['Đặt lịch tại spa','Bạn muốn đặt lịch tại chi nhánh nào và khung giờ nào?']
            ],
            faqs:[
                ['Da nhạy cảm nên dùng sản phẩm nào?','Ưu tiên công thức dịu nhẹ, không hương liệu và thử trước trên vùng da nhỏ.'],
                ['Có soi da miễn phí không?','Có. Bạn có thể soi da online hoặc đặt lịch miễn phí tại cửa hàng.'],
                ['Bao lâu thì giao hàng?','Nội thành giao trong 2–4 giờ; các tỉnh từ 2–4 ngày làm việc.'],
                ['Sản phẩm có được đổi trả không?','Hỗ trợ đổi trong 7 ngày nếu sản phẩm còn nguyên tem và chưa sử dụng.']
            ],
            keywords:[['Hỏi routine','routine, chăm sóc da, da dầu','Mình sẽ tư vấn routine theo loại da và ngân sách của bạn.'],['Đặt lịch soi da','soi da, đặt lịch spa','Bạn cho mình chi nhánh và thời gian mong muốn nhé.']],
            sequence:['Chăm sóc sau tư vấn da','Sau 3 ngày, bot hỏi phản hồi về routine và nhắc cách sử dụng đúng.'],
            rule:'Khách yêu cầu soi da → ghi danh chăm sóc sau tư vấn'
        } : {
            label:'Biến thể nội thất',
            summary:'Đổi nội dung sang tư vấn không gian, dự toán và đặt lịch khảo sát.',
            welcome:'🏠 Chào mừng bạn đến với Home Decor! Bạn cần thiết kế căn hộ, nhà phố hay một phòng riêng?',
            reply:'Nhận tư vấn thiết kế',
            fallback:'Mình chưa rõ loại không gian bạn cần thiết kế. Hãy cho biết diện tích, phong cách và ngân sách dự kiến nhé.',
            menu:[
                ['Xem bộ sưu tập thiết kế','Bạn thích phong cách Hiện đại, Japandi, Indochine hay Tối giản?'],
                ['Nhận dự toán sơ bộ','Vui lòng gửi diện tích, loại không gian và mức đầu tư dự kiến.'],
                ['Đặt lịch khảo sát','Bạn cho mình địa chỉ công trình và khung giờ thuận tiện nhé.']
            ],
            faqs:[
                ['Chi phí thiết kế tính thế nào?','Chi phí được tính theo diện tích và phạm vi thiết kế; báo giá chi tiết sau khi nhận mặt bằng.'],
                ['Thời gian thi công bao lâu?','Căn hộ tiêu chuẩn thường mất 30–45 ngày tùy phạm vi và vật liệu.'],
                ['Có nhận thi công trọn gói không?','Có, Home Decor nhận thiết kế, sản xuất và thi công hoàn thiện trọn gói.'],
                ['Khảo sát có mất phí không?','Khảo sát nội thành miễn phí khi khách đặt lịch tư vấn dự án.']
            ],
            keywords:[['Hỏi dự toán','dự toán, báo giá, chi phí','Bạn gửi diện tích và phong cách để mình lập dự toán sơ bộ nhé.'],['Đặt lịch khảo sát','khảo sát, đo đạc, đặt lịch','Bạn cho mình địa chỉ công trình và thời gian thuận tiện.']],
            sequence:['Theo dõi khách nhận dự toán','Sau 2 ngày, bot hỏi phản hồi về dự toán và đề nghị đặt lịch khảo sát.'],
            rule:'Khách nhận dự toán → ghi danh theo dõi dự án'
        };

        menu.updatedAt = now;
        menu.status = 'DRAFT';
        menu.items = variantData.menu.map(([title,text],index)=>({
            id:`demo-${variant}-${index+1}`, title, order:index+1,
            action:{type:'NEW_MESSAGE',text}, shouldSwitchMenu:false, targetMenuId:null
        }));
        config.app.faqs = variantData.faqs.map(([question,text],index)=>({
            id:`demo-${variant}-faq-${index+1}`, question, status:'DRAFT', action:{type:'NEW_MESSAGE',text}
        }));
        config.app.keywords = variantData.keywords.map(([name,keyword,response],index)=>({
            id:`demo-${variant}-kw-${index+1}`, name, keyword, excludeTerms:'', matchType:'CONTAINS_ANY', response, active:false, priority:index+1
        }));
        config.app.sequences = [{ id:`demo-${variant}-seq`, name:variantData.sequence[0], active:false, subscribers:0, steps:[
            {id:`demo-${variant}-step`,delay:isBeauty?3:2,unit:'DAY',type:'MESSAGE',content:variantData.sequence[1]}
        ] }];
        config.app.rules = [{ id:`demo-${variant}-rule`,name:variantData.rule,active:false,mode:'ALL',conditions:['Khách đã nhận tư vấn'],actions:[`Ghi danh ${variantData.sequence[0]}`],actionRefs:[{type:'SEQUENCE',targetId:`demo-${variant}-seq`}] }];
        config.welcome = {text:variantData.welcome,active:false,reply:variantData.reply};
        config.fallback = {...copy(config.fallback),active:false,text:variantData.fallback};
        config.fallbackDraft = copy(config.fallback);
        // Applying/customizing a template only replaces the draft. The live version remains intact.
        config.published = copy(seed.published || []);
        config.dirtyMenus = [menu.id];
        config.dirtyModules = ['welcome-message','faq','keywords','sequences','rules'];
        config.fallbackDirty = true;
        config.templateOrigin = {
            templateId:template.id, templateName:template.name, pageId, variantLabel:variantData.label,
            summary:variantData.summary, customizedAt:now,
            changedAreas:['Menu chính','Tin nhắn mở đầu','Tin nhắn mặc định','FAQ','Từ khóa','Kịch bản','Quy luật']
        };
        return config;
    }
    function ensureTemplateVariantDemo() {
        if (data.demoTemplateVariantVersion >= 2) return;
        const template = data.templates.find(t=>t.id==='template-shop-online');
        if (!template) return;
        let beauty = pageById('page-beauty'), home = pageById('page-home');
        if (!beauty) {
            beauty = {id:'page-beauty',name:'Beauty Corner',description:'',channel:'Instagram',color:'#f43f75',connected:true,externalId:'ig_9283647102938456',initials:'BC',handle:'ig_9283647102938456',enabled:true,hidden:false,pinned:false};
            data.pages.push(beauty);
        }
        if (!home) {
            home = {id:'page-home',name:'Home Decor',description:'',channel:'Facebook',color:'#475569',connected:true,externalId:'fb_3847562910384756',initials:'HD',handle:'fb_3847562910384756',enabled:true,hidden:false,pinned:false};
            data.pages.push(home);
        }
        data.records['page:page-beauty'] = makeTemplateVariant(template,'page-beauty','beauty');
        data.records['page:page-home'] = makeTemplateVariant(template,'page-home','home');
        beauty.description = 'Mỹ phẩm · Biến thể từ mẫu Shop online';
        home.description = 'Nội thất · Biến thể từ mẫu Shop online';
        data.demoTemplateVariantVersion = 2;
        save();
    }
    api.init = () => {
        seed = snapshot(); seed.dirtyMenus = []; seed.dirtyModules = []; seed.fallbackDirty = false;
        try { data = JSON.parse(localStorage.getItem(KEY)); } catch (_) {}
        if (!data?.pages?.length || !data.records || !Array.isArray(data.templates) || !data.templates.some(t => t.id === 'template-shop-online')) {
            const legacy = localStorage.getItem(WORKSPACE_STORAGE_KEY);
            const pages = legacy ? copy(workspaceData.pages).map(p => ({...p, enabled:true, hidden:false, pinned:false, description:p.handle, externalId:p.id})) : seedPages();
            const groups = legacy ? copy(workspaceData.groups) : [
                { id:'group-retail',name:'Bán lẻ & Dịch vụ',color:'#00449e',pageIds:['page-coffee','page-green'],autoSync:true },
                { id:'group-care',name:'Chăm sóc khách hàng',color:'#009b6e',pageIds:['page-travel','page-tech'],autoSync:true }
            ];
            data = { version:2, pages, groups, records: data?.records || {}, templates: seedTemplates() };
            pages.forEach(p => { if (!data.records[`page:${p.id}`]) data.records[`page:${p.id}`] = copy(seed); });
            groups.forEach(g => {
                if (!data.records[`group:${g.id}`]) {
                    const snap = copy(seed);
                    if (g.config?.menus) { snap.app = copy(g.config); snap.published = snap.app.menus.filter(m=>m.status==='PUBLISHED').map(copy); }
                    data.records[`group:${g.id}`] = snap;
                    delete g.config;
                }
            });
            save();
        }
        ensureTemplateVariantDemo();
        workspaceData.pages = data.pages; workspaceData.groups = data.groups;
        workspaceData.activePageId = data.pages[0].id;
        api.ready = true;
        const modal = document.createElement('div');
        modal.id = 'hubModal'; modal.className = 'hub-modal'; modal.hidden = true;
        modal.addEventListener('click', e => { if (e.target === modal) api.closeDialog(); });
        document.body.append(modal);
        document.addEventListener('keydown', event => {
            if (modal.hidden) return;
            if (event.key === 'Escape') { event.stopImmediatePropagation(); api.closeDialog(); }
            if (event.key === 'Tab') {
                const items = [...modal.querySelectorAll('button,input,select,a')].filter(x => !x.disabled && x.offsetParent);
                const first = items[0], last = items.at(-1);
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }
        }, true);
        // Drafts are retained per scope, including after a reload. Published menu snapshots stay separate.
        window.addEventListener('pagehide', () => api.persist());
        api.open();
    };
    api.persist = () => {
        if (!api.ready || !api.scope) return;
        data.records[scopeKey(api.scope)] = snapshot();
        save();
    };
    api.publishLinkedTemplate = (moduleName, forceCreate = false) => {
        if (!api.ready || !api.scope) return null;
        if (!forceCreate) return null;
        api.persist();
        const key = scopeKey(api.scope);
        const record = data.records[key];
        let template = data.templates.find(t=>t.id===record?.managedTemplateId);
        const nextSnapshot = copy(record);
        delete nextSnapshot.managedTemplateId;
        delete nextSnapshot.templateOrigin;
        nextSnapshot.app.userMenuAssignments = [];
        if (!template && api.scope.type === 'page') {
            const page = pageById(api.scope.id);
            if (!page) return null;
            const parentId = record?.templateOrigin?.templateId && data.templates.some(t=>t.id===record.templateOrigin.templateId)
                ? record.templateOrigin.templateId : null;
            const root = data.templates.find(t=>t.id===parentId);
            const baseName = `Mẫu ${page.name}`;
            let name = baseName, suffix = 2;
            while (data.templates.some(t=>t.name.trim().toLowerCase()===name.toLowerCase())) name = `${baseName} ${suffix++}`;
            const templateId = uid('template'), versionId = uid('tplv'), createdAt = new Date().toISOString();
            template = {
                id:templateId, organizationId:'org-antbuddy-default', name, nameNormalized:name.toLowerCase(),
                description:`Cấu hình Automation của ${page.name}`, symbol:'📦',
                parentTemplateId:parentId, rootTemplateId:root?.rootTemplateId || parentId,
                sourcePageId:page.id, sourceChannel:page.channel, managedScopeKey:key,
                ownerId:'user-admin', status:'ACTIVE', builtin:false,
                versions:[{id:versionId,versionNo:1,status:'READY',snapshot:nextSnapshot,dependencies:[],contentHash:`hash-${crypto.randomUUID().slice(0,8)}`,createdBy:'Quản trị viên',createdAt,publishedModule:moduleName}],
                currentVersionId:versionId, config:nextSnapshot, runs:[], updatedAt:createdAt, lastPublishedModule:moduleName
            };
            record.managedTemplateId = templateId;
            data.templates.push(template);
            templateCreationPending = false;
            save();
            api.showEditor();
            notify(`Đã tạo mẫu "${name}" từ ${page.name} và lưu phiên bản v1.`);
            return {templateId,templateName:name,versionNo:1};
        }
        if (!template || template.status === 'ARCHIVED') return null;
        const currentSnapshot = templateSnapshot(template);
        if (JSON.stringify(currentSnapshot) === JSON.stringify(nextSnapshot)) return null;
        const versionNo = Math.max(0,...(template.versions||[]).map(v=>Number(v.versionNo)||0)) + 1;
        const version = {
            id:uid('tplv'), versionNo, status:'READY', snapshot:nextSnapshot, dependencies:[],
            contentHash:`hash-${crypto.randomUUID().slice(0,8)}`,
            createdBy:'Quản trị viên', createdAt:new Date().toISOString(), publishedModule:moduleName
        };
        template.versions ||= [];
        template.versions.push(version);
        template.currentVersionId = version.id;
        template.config = nextSnapshot;
        template.updatedAt = version.createdAt;
        template.lastPublishedModule = moduleName;
        save();
        notify(`Đã cập nhật mẫu "${template.name}" lên v${versionNo} từ ${moduleName}.`);
        return {templateId:template.id,templateName:template.name,versionNo};
    };
    api.publishPageTemplate = () => {
        if (!api.ready || !api.scope) return notify('Vui lòng chọn một trang Automation trước khi xuất bản.');
        if (api.scope.type !== 'page') return notify('Hãy mở một trang cụ thể để xuất bản thành mẫu của trang.');
        api.persist();
        const key = scopeKey(api.scope), record = data.records[key], page = pageById(api.scope.id);
        if (!record || !page) return notify('Không tìm thấy cấu hình trang để xuất bản.');
        const beforeTemplate = data.templates.find(t=>t.id===record.managedTemplateId);
        const beforeVersion = beforeTemplate?.versions?.length || 0;
        const result = api.publishLinkedTemplate('Toàn bộ cấu hình trang',true);
        const template = data.templates.find(t=>t.id===(result?.templateId || record.managedTemplateId));
        data.publishLogs ||= [];
        data.publishLogs.unshift({
            id:uid('publish-log'), pageId:page.id, pageName:page.name, templateId:template?.id || null,
            templateName:template?.name || null, versionNo:result?.versionNo || template?.versions?.at(-1)?.versionNo || null,
            module:'ALL_AUTOMATION', config:copy(templateSnapshot(template) || record),
            counts:{menus:record.app?.menus?.length||0,faqs:record.app?.faqs?.length||0,keywords:record.app?.keywords?.length||0,sequences:record.app?.sequences?.length||0,rules:record.app?.rules?.length||0},
            publishedBy:'Quản trị viên', publishedAt:new Date().toISOString()
        });
        data.publishLogs = data.publishLogs.slice(0,100);
        save();
        if (!result && template) notify(`Đã ghi log xuất bản toàn bộ cấu hình ${page.name}; mẫu không đổi nên giữ nguyên v${beforeVersion}.`);
        api.showEditor();
        return {templateId:template?.id,versionNo:result?.versionNo || beforeVersion};
    };
    function restore(config) {
        appData = copy(config.app);
        menuRepository.publishedVersions = new Map(config.published.map(m => [m.id,copy(m)]));
        persistedDefaultMessage = copy(config.fallback || getSafeDefaultConfig());
        draftDefaultMessage = copy(config.fallbackDraft || persistedDefaultMessage);
        isDefaultMessageDirty = !!config.fallbackDirty;
        dirtyMenuIds.clear(); (config.dirtyMenus || []).forEach(id => dirtyMenuIds.add(id));
        moduleDirtyState.clear(); (config.dirtyModules || []).forEach(id => moduleDirtyState.add(id));
        const welcome = config.welcome || seed.welcome;
        document.getElementById('welcomeMsgInput').value = welcome.text;
        document.getElementById('welcomeActiveToggle').checked = welcome.active;
        document.getElementById('welcomeQuickReplyInput').value = welcome.reply;
        document.getElementById('simWelcomeBubble').textContent = welcome.text;
        document.getElementById('simWelcomeBtn').textContent = welcome.reply;
        document.getElementById('welcomeCharCount').textContent = document.getElementById('welcomeComposerCount').textContent = `${welcome.text.length}/640`;
        currentEditingMenuId = overviewSelectedMenuId = simViewingMenuId = 'menu-default';
        currentEditingItemIndex = currentFaqIndex = 0;
        currentSequenceId = appData.sequences[0]?.id; currentRuleId = appData.rules[0]?.id;
        defaultTestCooldownHistory = {};
        document.querySelectorAll('.messenger-chat-scroll').forEach(el => { if (!el.querySelector('[id]')) el.replaceChildren(); });
        renderFaqRows(); renderKeywords(); renderSequences(); renderRules(); renderDefaultMessageModule();
    }
    function canNavigate() {
        if (menuRequestInFlight || isSavingDefaultMessage) { notify('Đang lưu cấu hình, vui lòng đợi hoàn tất.'); return false; }
        return true;
    }
    api.open = (nextTab = tab) => {
        if (!canNavigate()) return;
        if (nextTab !== 'pages') templateCreationPending = false;
        api.persist(); if (api.scope) lastScope = {...api.scope};
        api.scope = null; api.isOpen = true; tab = nextTab;
        closeMenuItemEditor(); closeWorkspaceSwitcher(); closeAccountMenu();
        document.body.classList.add('hub-mode');
        document.querySelectorAll('.tab-content-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-sub-btn').forEach(b => { b.disabled = true; b.classList.remove('active'); b.title = 'Chọn trang hoặc nhóm trong Automation để cấu hình'; });
        document.getElementById('automationScopeBar').hidden = true;
        document.getElementById('automationHub').hidden = false;

        const navTemplates = document.getElementById('navItemTemplates');
        const navAutoBtn = document.getElementById('navItemAutomation');
        const hubNavLink = document.querySelector('.hub-nav-link');
        if (tab === 'templates') {
            if (navTemplates) navTemplates.classList.add('active');
            if (navAutoBtn) navAutoBtn.classList.remove('active');
            if (hubNavLink) hubNavLink.classList.remove('active');
        } else {
            if (navTemplates) navTemplates.classList.remove('active');
            if (navAutoBtn) navAutoBtn.classList.add('active');
            if (hubNavLink) hubNavLink.classList.add('active');
        }

        api.header(); render();
    };
    api.openTemplateView = () => {
        api.open('templates');
    };
    api.header = () => {
        document.getElementById('globalHeaderTitle').textContent = tab === 'templates' ? 'Mẫu' : 'Automation';
        document.getElementById('globalHeaderSubtitle').textContent = tab === 'templates' ? 'Khám phá và tái sử dụng các mẫu kịch bản' : 'Quản lý trang và cấu hình dùng chung';
        document.getElementById('globalHeaderActions').innerHTML = '';
        document.getElementById('workspaceScopeHost').innerHTML = '';
    };
    api.showEditor = () => {
        api.isOpen = false;
        document.body.classList.remove('hub-mode');
        document.getElementById('automationHub').hidden = true;
        document.querySelectorAll('.nav-sub-btn').forEach(b => { b.disabled = false; b.title = ''; });
        const navTemplates = document.getElementById('navItemTemplates');
        if (navTemplates) navTemplates.classList.remove('active');
        const bar = document.getElementById('automationScopeBar'); bar.hidden = false;
        const scope = api.scope, group = scope.type === 'group' ? groupById(scope.id) : groupForPage(scope.id);
        const scopeRecord = data.records[scopeKey(scope)];
        const managedTemplate = data.templates.find(t=>t.id===scopeRecord?.managedTemplateId);
        const origin = scopeRecord?.templateOrigin;
        const pendingLabel = templateCreationPending && scope.type === 'page' && !managedTemplate
            ? ' · <mark class="hub-template-origin">Mẫu mới · Lưu/Xuất bản để tạo mẫu</mark>' : '';
        bar.innerHTML = `<button onclick="AutomationHub.open('pages')">← Danh sách trang</button><span class="hub-scope-detail"><strong>${h(scopeName(scope))}</strong> · ${scope.type === 'group' ? `${group.pageIds.length} trang trong nhóm` : h(pageById(scope.id).channel)}${group?.autoSync ? ' · Cấu hình dùng chung' : ' · Cấu hình riêng'}${managedTemplate ? ` · <mark class="hub-template-origin">Đang cấu hình mẫu: ${h(managedTemplate.name)}</mark>` : pendingLabel || (origin ? ` · <mark class="hub-template-origin">${h(origin.variantLabel)} từ ${h(origin.templateName)}</mark>` : '')}</span>${data.templateBackups?.[scopeKey(scope)]?'<button onclick="AutomationHub.restoreTemplateBackup()">Khôi phục trước mẫu</button>':''}${scope.type==='group'&&!group.autoSync?'<button onclick="AutomationHub.sync()">Đồng bộ nhóm</button>':''}${managedTemplate?`<button onclick="AutomationHub.previewTemplate('${managedTemplate.id}')">Xem mẫu</button>`:''}`;
        document.getElementById('activePageName').textContent = scopeName(scope);
        document.getElementById('activePageMeta').textContent = scope.type === 'group' ? `Nhóm · ${group.pageIds.length} trang` : pageById(scope.id).channel;
        const item = scope.type === 'group' ? group : pageById(scope.id);
        document.getElementById('activePageAvatar').textContent = item.initials || '▦';
        document.getElementById('activePageAvatar').style.background = item.color;
        document.querySelectorAll('.messenger-header-name strong').forEach(el => el.textContent = scopeName(scope));
    };
    api.enter = (type, id) => {
        const item = type === 'group' ? groupById(id) : pageById(id);
        if (!item || !canNavigate()) return;
        if (type === 'page' && (!item.connected || item.hidden)) return notify('Hãy kích hoạt và hiển thị trang trước khi mở cấu hình.');
        if (type === 'group' && !item.pageIds.every(p => pageById(p)?.connected && !pageById(p)?.hidden)) return notify('Nhóm có trang chưa kích hoạt hoặc đã ẩn. Hãy cập nhật thành viên trước.');
        api.persist(); api.scope = {type,id}; lastScope = {...api.scope};
        workspaceData.activePageId = type === 'page' ? id : item.pageIds[0];
        const key = scopeKey(api.scope);
        if (data.records[key]?.managedTemplateId) templateCreationPending = false;
        restore(data.records[key] || seed);
        closeWorkspaceSwitcher(); closeAccountMenu();
        api.showEditor(); switchTab('main-menu');
        renderAccountWorkspace();
    };
    api.switchView = next => { tab = next; query = ''; platform = 'all'; pageNumber = 1; selected.clear(); render(); };
    api.switchTemplateCategory = cat => { templateCategory = cat; query = ''; renderContent(); };
    api.filter = (key,value) => { if (key === 'query') query = value; if (key === 'platform') platform = value; if (key === 'status') { status = value; selected.clear(); } pageNumber = 1; renderContent(); };
    api.globalSearch = value => { if (!api.isOpen) api.open('pages'); tab = 'pages'; query = value; pageNumber = 1; render(); };
    function filteredPages() {
        return data.pages.filter(p => (status === 'hidden' ? p.hidden : !p.hidden && p.connected === (status === 'active')) && (platform === 'all' || p.channel === platform) && `${p.name} ${p.description} ${p.externalId}`.toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi')))
            .sort((a,b) => Number(b.pinned) - Number(a.pinned));
    }
    function render() {
        const titles = {
            pages: ['Danh sách trang', 'Quản lý và đồng bộ các kênh hội thoại, fanpage và ứng dụng nhắn tin kết nối.'],
            groups: ['Chế độ gộp trang', 'Nhóm các trang để thiết lập Automation một lần và dùng chung cấu hình.'],
            templates: ['Mẫu Automation', 'Bắt đầu nhanh với mẫu hệ thống hoặc tái sử dụng các mẫu kịch bản của bạn.']
        };
        const currentTitle = titles[tab] || titles.pages;
        const breadcrumb = tab === 'templates' ? 'Mẫu' : 'Automation';
        const primaryAction = tab === 'pages'
            ? '<button class="hub-primary" onclick="AutomationHub.connect()">＋ Kết nối</button>'
            : tab === 'groups'
                ? '<button class="hub-primary" onclick="AutomationHub.editGroup()">＋ Tạo nhóm</button>'
                : '<button class="hub-primary" onclick="AutomationHub.beginTemplateCreation()">＋ Tạo mẫu</button>';
        document.getElementById('automationHub').innerHTML = `<div class="hub-breadcrumb">${breadcrumb}</div><div class="hub-heading"><div><h1>${currentTitle[0]}</h1><p>${currentTitle[1]}</p></div></div><div class="hub-panel"><div class="hub-toolbar">${tab === 'pages' ? `<select aria-label="Nền tảng" onchange="AutomationHub.filter('platform',this.value)"><option value="all">Nền tảng: Tất cả</option>${platforms.map(p=>`<option ${platform===p?'selected':''}>${p}</option>`).join('')}</select>` : ''}<input id="hubSearch" aria-label="Tìm kiếm danh sách" placeholder="${tab === 'pages' ? '⌕  Tìm kiếm trang, ID...' : tab === 'groups' ? '⌕  Tìm nhóm trang...' : '⌕  Tìm mẫu Automation...'}" value="${h(query)}" oninput="AutomationHub.filter('query',this.value)">${primaryAction}</div><div id="hubContent"></div></div>`;
        renderContent();
    }
    function renderContent() {
        const content = document.getElementById('hubContent'); if (!content) return;
        if (tab === 'pages') renderPages(content);
        if (tab === 'groups') renderGroups(content);
        if (tab === 'templates') renderTemplates(content);
    }
    function avatar(p) { return `<span class="page-avatar" style="background:${h(p.color)}">${h(p.initials || '▦')}</span>`; }
    function platformBadge(p) { return `<span class="hub-platform ${p.channel.toLowerCase().replace(/\s/g,'')}">${icons[p.channel] || '◉'} &nbsp;${h(p.channel)}</span>`; }
    function renderPages(content) {
        const rows = filteredPages(), pages = Math.max(1,Math.ceil(rows.length/6)); pageNumber = Math.min(pageNumber,pages);
        const visible = rows.slice((pageNumber-1)*6,pageNumber*6);
        const count = key => data.pages.filter(p => key === 'hidden' ? p.hidden : !p.hidden && p.connected === (key === 'active')).length;
        const pageRows = visible.map(p=>{
            const managedTemplate = data.templates.find(t=>t.id===data.records[scopeKey({type:'page',id:p.id})]?.managedTemplateId);
            const rowClass = selected.has(p.id)?'selected':'';
            const actionButtons = `${managedTemplate?`<button class="hub-template-customize" onclick="AutomationHub.enter('page','${p.id}')">Tùy chỉnh mẫu</button>`:''}<button onclick="AutomationHub.hidePage('${p.id}')">${p.hidden?'Hiện':'Ẩn'}</button><button class="${p.pinned?'pinned':''}" onclick="AutomationHub.pinPage('${p.id}')">${p.pinned?'Bỏ ghim':'Ghim'}</button>`;
            return `<tr class="${rowClass}"><td><input type="checkbox" aria-label="Chọn ${h(p.name)}" ${selected.has(p.id)?'checked':''} onchange="AutomationHub.select('${p.id}',this.checked)"></td><td><button class="hub-page-link" onclick="AutomationHub.enter('page','${p.id}')" ${!p.connected || p.hidden ? 'disabled':''}>${avatar(p)}<span><strong>${h(p.name)}${p.pinned?' · ⌖':''}</strong><small>${managedTemplate?`Đang cấu hình mẫu: ${h(managedTemplate.name)}`:h(p.description)}</small></span></button></td><td>${platformBadge(p)}</td><td><span class="hub-page-id">${h(p.externalId)}</span></td><td>${p.connected ? `<label class="toggle-control"><input type="checkbox" aria-label="Bật Automation ${h(p.name)}" ${p.enabled?'checked':''} onchange="AutomationHub.togglePage('${p.id}',this.checked)"><span class="toggle-track"></span></label>` : `<button class="hub-secondary" onclick="AutomationHub.activate('${p.id}')">Kích hoạt</button>`}</td><td><div class="hub-row-actions">${actionButtons}</div></td></tr>`;
        }).join('');
        content.innerHTML = `<div class="hub-status-tabs">${[['active','Kích hoạt'],['inactive','Chưa kích hoạt'],['hidden','Đã ẩn']].map(([key,label])=>`<button class="${status===key?'active':''}" onclick="AutomationHub.filter('status','${key}')">${label}<b>${count(key)}</b></button>`).join('')}</div>${selected.size ? `<div class="hub-bulk"><strong>Đã chọn ${selected.size} trang</strong><button onclick="AutomationHub.editGroup()">Tạo nhóm từ trang đã chọn</button><button onclick="AutomationHub.bulkHidden()">${status==='hidden'?'Hiện lại':'Ẩn trang'}</button><button onclick="AutomationHub.clearSelection()">Bỏ chọn</button></div>` : ''}<div class="hub-table-scroll"><table class="hub-table"><thead><tr><th><input id="hubSelectAll" type="checkbox" aria-label="Chọn tất cả trang đang hiển thị" ${visible.length && visible.every(p=>selected.has(p.id))?'checked':''} onchange="AutomationHub.selectAll(this.checked)"></th><th>TRANG</th><th>NỀN TẢNG</th><th>PAGE ID</th><th>TRẠNG THÁI</th><th>THAO TÁC</th></tr></thead><tbody>${pageRows}</tbody></table></div>${!visible.length?'<div class="hub-empty"><strong>Không tìm thấy trang</strong>Thử đổi từ khóa, nền tảng hoặc trạng thái.</div>':''}<div class="hub-pagination"><button ${pageNumber===1?'disabled':''} onclick="AutomationHub.paginate(${pageNumber-1})">Trước</button>${Array.from({length:pages},(_,i)=>`<button class="${i+1===pageNumber?'current':''}" onclick="AutomationHub.paginate(${i+1})">${i+1}</button>`).join('')}<button ${pageNumber===pages?'disabled':''} onclick="AutomationHub.paginate(${pageNumber+1})">Sau</button><span>${rows.length} trang · Chọn tên trang để mở Menu chính</span></div>`;
        const all = document.getElementById('hubSelectAll');
        if (all) all.indeterminate = visible.some(p=>selected.has(p.id)) && !visible.every(p=>selected.has(p.id));
    }
    api.paginate = n => { pageNumber = n; renderContent(); };
    api.select = (id,on) => { on ? selected.add(id) : selected.delete(id); renderContent(); };
    api.selectAll = on => { filteredPages().slice((pageNumber-1)*6,pageNumber*6).forEach(p=>on?selected.add(p.id):selected.delete(p.id)); renderContent(); };
    api.clearSelection = () => { selected.clear(); renderContent(); };
    api.togglePage = (id,on) => { pageById(id).enabled = on; save(); notify(`${on?'Đã bật':'Đã tắt'} Automation cho ${pageById(id).name}`); };
    api.hidePage = id => { const p = pageById(id); p.hidden = !p.hidden; selected.delete(id); save(); renderContent(); };
    api.pinPage = id => { const p = pageById(id); p.pinned = !p.pinned; save(); renderContent(); };
    api.bulkHidden = () => { selected.forEach(id=>pageById(id).hidden = status !== 'hidden'); selected.clear(); save(); renderContent(); };
    function renderGroups(content) {
        const groups = data.groups.filter(g => g.name.toLowerCase().includes(query.toLowerCase()));
        content.innerHTML = groups.length ? `<div class="hub-cards">${groups.map(g=>`<article class="hub-card"><div class="hub-card-body">${avatar(g)}<h2>${h(g.name)}</h2><p>${g.pageIds.length} trang · ${g.autoSync?'Dùng chung cấu hình':'Đồng bộ thủ công'}</p><div class="hub-member-stack">${g.pageIds.map(id=>avatar(pageById(id))).join('')}</div><p>${g.pageIds.map(id=>h(pageById(id).name)).join(' · ')}</p></div><div class="hub-card-foot"><button class="hub-secondary" onclick="AutomationHub.editGroup('${g.id}')">Chỉnh sửa</button><button class="hub-primary" onclick="AutomationHub.enter('group','${g.id}')">Mở nhóm →</button></div></article>`).join('')}</div>` : '<div class="hub-empty"><strong>Chưa có nhóm phù hợp</strong>Tạo nhóm từ ít nhất hai trang để dùng chung cấu hình.</div>';
    }
    function renderTemplates(content) {
        const builtins = data.templates.filter(t => t.builtin);
        const mine = data.templates.filter(t => !t.builtin);
        const activeList = templateCategory === 'builtin' ? builtins : mine;
        const filtered = activeList.filter(t => {
            const matchesQuery = `${t.name} ${t.description}`.toLowerCase().includes(query.toLowerCase());
            const matchesStatus = templateStatusFilter === 'all' || (t.status || 'ACTIVE') === templateStatusFilter;
            const matchesChannel = templateChannelFilter === 'all' || t.sourceChannel === templateChannelFilter || t.builtin;
            return matchesQuery && matchesStatus && matchesChannel;
        });

        content.innerHTML = `
            <div class="hub-status-tabs">
                <button class="${templateCategory === 'builtin' ? 'active' : ''}" onclick="AutomationHub.switchTemplateCategory('builtin')">
                    Mẫu sẵn có (Hệ thống) <b>${builtins.length}</b>
                </button>
                <button class="${templateCategory === 'mine' ? 'active' : ''}" onclick="AutomationHub.switchTemplateCategory('mine')">
                    Mẫu của tôi <b>${mine.length}</b>
                </button>
            </div>
            <div class="hub-toolbar" style="border-top:0;padding-top:0;">
                <select aria-label="Trạng thái mẫu" onchange="AutomationHub.switchTemplateStatusFilter(this.value)">
                    <option value="all" ${templateStatusFilter==='all'?'selected':''}>Trạng thái: Tất cả</option>
                    <option value="ACTIVE" ${templateStatusFilter==='ACTIVE'?'selected':''}>Đang hoạt động</option>
                    <option value="ARCHIVED" ${templateStatusFilter==='ARCHIVED'?'selected':''}>Đã ngừng sử dụng</option>
                </select>
                <select aria-label="Kênh nguồn mẫu" onchange="AutomationHub.switchTemplateChannelFilter(this.value)">
                    <option value="all" ${templateChannelFilter==='all'?'selected':''}>Kênh: Tất cả</option>
                    ${platforms.map(p=>`<option value="${h(p)}" ${templateChannelFilter===p?'selected':''}>${h(p)}</option>`).join('')}
                </select>
            </div>
            ${filtered.length ? `
                <div class="hub-cards">
                    ${filtered.map(t => { const snap=templateSnapshot(t); const menuItems=(snap.app?.menus||[]).reduce((sum,m)=>sum+(m.items?.length||0),0); const parent=data.templates.find(x=>x.id===t.parentTemplateId); const usedPages=data.pages.filter(p=>{const record=data.records[scopeKey({type:'page',id:p.id})];return record?.managedTemplateId===t.id||record?.templateOrigin?.templateId===t.id;}); const usedPageLabel=usedPages.length?`${usedPages.slice(0,2).map(p=>p.name).join(' · ')}${usedPages.length>2?` · +${usedPages.length-2} trang`:''}`:'Chưa có trang sử dụng'; return `
                        <article class="hub-card">
                            <div class="hub-template-art">
                                <span class="hub-template-symbol">${h(t.symbol || '▦')}</span>
                                <div class="hub-template-art-info">
                                    <span class="hub-template-tag ${t.builtin ? 'tag-builtin' : 'tag-mine'}">${t.builtin ? 'MẪU HỆ THỐNG' : 'MẪU CỦA TÔI'}</span>
                                    <h2>${h(t.name)}</h2>
                                    <span class="hub-template-used" title="${h(usedPages.map(p=>p.name).join(', '))}">${h(usedPageLabel)}</span>
                                </div>
                            </div>
                            <div class="hub-card-body">
                                <p>${h(t.description)}</p>
                                <div class="hub-template-lineage"><span>Mẫu gốc</span><strong>${h(t.builtin ? `${t.name} · Hệ thống` : parent?.name || 'Chưa xác định')}</strong></div>
                                <div class="hub-template-summary">
                                    <span>${menuItems} mục menu</span>
                                    <span>·</span>
                                    <span>${snap.app?.faqs?.length || 0} câu hỏi</span>
                                    <span>·</span>
                                    <span>${snap.app?.keywords?.length || 0} từ khóa</span>
                                    <span>·</span>
                                    <span>${usedPages.length} trang đang dùng</span>
                                </div>
                            </div>
                            <div class="hub-card-foot">
                                <button class="hub-secondary hub-action-preview" onclick="AutomationHub.previewTemplate('${t.id}')">Xem trước</button>
                                ${t.builtin
                                    ? '<span class="hub-action-placeholder" aria-hidden="true"></span><span class="hub-action-placeholder" aria-hidden="true"></span>'
                                    : t.status === 'ARCHIVED'
                                        ? `<button class="hub-secondary hub-action-edit" onclick="AutomationHub.restoreTemplate('${t.id}')">Kích hoạt lại</button><button class="hub-secondary hub-action-lifecycle danger" onclick="AutomationHub.deleteTemplate('${t.id}')">Xóa</button>`
                                        : `<button class="hub-secondary hub-action-edit" onclick="AutomationHub.openTemplateEditor('${t.id}')">Chỉnh sửa</button><button class="hub-secondary hub-action-lifecycle" title="Ngừng cho áp dụng mới nhưng vẫn giữ mẫu, lịch sử và cấu hình trên các trang" onclick="AutomationHub.archiveTemplate('${t.id}')">Ngừng sử dụng</button>`}
                                <button class="hub-primary hub-action-use" ${t.status === 'ARCHIVED' ? 'disabled title="Kích hoạt lại mẫu trước khi sử dụng"' : ''} onclick="AutomationHub.renderApplicationModal('${t.id}')">Sử dụng mẫu</button>
                            </div>
                        </article>
                    `; }).join('')}
                </div>
            ` : `
                <div class="hub-empty">
                    <strong>${templateCategory === 'builtin' ? 'Không tìm thấy mẫu sẵn có' : 'Chưa có mẫu của tôi'}</strong>
                    ${templateCategory === 'builtin' ? 'Thử tìm với từ khóa khác.' : 'Bấm nút "＋ Tạo mẫu", chọn trang nguồn rồi cấu hình trực tiếp trong Automation của trang đó.'}
                </div>
            `}
        `;
    }
    function dialog(title,body,label,action,extra='') {
        closeAccountMenu(); closeWorkspaceSwitcher(); focusReturn = document.activeElement; dialogAction = action;
        const modal = document.getElementById('hubModal'); modal.hidden = false;
        modal.innerHTML = `<div class="hub-dialog" role="dialog" aria-modal="true" aria-labelledby="hubDialogTitle"><div class="hub-dialog-head"><h2 id="hubDialogTitle">${h(title)}</h2><button aria-label="Đóng" onclick="AutomationHub.closeDialog()">×</button></div><form id="hubForm"><div class="hub-dialog-body">${body}<p class="hub-error" id="hubFormError" role="alert" hidden></p></div><div class="hub-dialog-foot">${extra}<button type="button" class="hub-secondary" onclick="AutomationHub.closeDialog()">Hủy</button><button class="hub-primary" type="submit">${label}</button></div></form></div>`;
        document.getElementById('hubForm').onsubmit = event => { event.preventDefault(); dialogAction?.(); };
        modal.querySelector('input,select,button')?.focus();
    }
    api.closeDialog = () => { document.getElementById('hubModal').hidden = true; dialogAction = null; focusReturn?.focus(); };
    function error(message) { const el = document.getElementById('hubFormError'); el.textContent = message; el.hidden = false; }
    api.connect = () => dialog('Kết nối trang', `<p class="hub-note">Thêm trang mô phỏng để thử cấu hình Automation. Kết nối tài khoản thật cần tích hợp xác thực của nền tảng.</p><label class="hub-field"><span>Nền tảng</span><select id="hubConnectPlatform">${platforms.map(p=>`<option>${p}</option>`).join('')}</select></label><label class="hub-field"><span>Tên trang</span><input id="hubConnectName" required maxlength="60" placeholder="Ví dụ: Coffee House Quận 1"></label><label class="hub-field"><span>Page ID</span><input id="hubConnectId" required maxlength="80" pattern="[A-Za-z0-9_-]+" placeholder="Nhập ID trang"></label>`, 'Thêm trang', () => {
        const name = document.getElementById('hubConnectName').value.trim(), externalId = document.getElementById('hubConnectId').value.trim(), channel = document.getElementById('hubConnectPlatform').value;
        if (!name || !externalId) return error('Nhập tên trang và Page ID.');
        if (data.pages.some(p=>p.externalId===externalId && p.channel===channel)) return error('Trang này đã được kết nối.');
        const id = uid('page'); data.pages.push({id,name,externalId,channel,handle:externalId,description:'Trang mới kết nối',color:'#00449e',initials:name.split(' ').slice(0,2).map(x=>x[0]).join(''),connected:true,enabled:true,hidden:false,pinned:false});
        data.records[`page:${id}`] = copy(seed); save(); api.closeDialog(); tab='pages'; status='active'; query=''; platform='all'; render(); notify('Đã thêm trang. Chọn tên trang để cấu hình.');
    });
    api.activate = id => dialog('Kích hoạt trang', `<p class="hub-note">Kích hoạt <strong>${h(pageById(id).name)}</strong> trong không gian thử nghiệm để bắt đầu cấu hình.</p>`, 'Kích hoạt', () => { pageById(id).connected = true; save(); api.closeDialog(); renderContent(); });
    api.editGroup = (id = null) => {
        if (!api.isOpen) api.open('groups');
        const group = groupById(id), picked = group?.pageIds || [...selected];
        dialog(group?'Chỉnh sửa nhóm trang':'Tạo nhóm trang', `<label class="hub-field"><span>Tên nhóm</span><input id="hubGroupName" required maxlength="48" value="${h(group?.name || '')}" placeholder="Ví dụ: Chuỗi cửa hàng miền Nam"></label><div class="hub-field"><span>Trang thành viên · chọn ít nhất 2 trang</span><div class="hub-checks">${data.pages.map(p=>{ const other = groupForPage(p.id), unavailable = !p.connected || p.hidden || (other && other.id !== id); return `<label><input type="checkbox" name="members" value="${p.id}" ${picked.includes(p.id)&&!unavailable?'checked':''} ${unavailable?'disabled':''}>${h(p.name)}<small>${other && other.id !== id ? h(other.name) : !p.connected ? 'Chưa kích hoạt' : p.hidden ? 'Đã ẩn' : h(p.channel)}</small></label>`; }).join('')}</div></div>${!group?'<label class="hub-field"><span>Lấy cấu hình ban đầu từ</span><select id="hubGroupSource"></select></label>':''}<label class="hub-field" style="display:flex;align-items:center;gap:9px;"><input style="width:16px;height:16px;" id="hubGroupAuto" type="checkbox" ${group?.autoSync!==false?'checked':''}><span>Dùng chung cấu hình cho tất cả trang thành viên</span></label><p class="hub-note">Các trang dùng chung cấu hình sẽ nhận cùng thay đổi khi lưu. Trang chỉ thuộc một nhóm. Tắt tùy chọn này để mỗi trang giữ cấu hình riêng và đồng bộ thủ công từ nhóm.</p>`, group?'Lưu nhóm':'Tạo nhóm', () => {
            const name = document.getElementById('hubGroupName').value.trim(), pageIds = [...document.querySelectorAll('#hubForm input[name="members"]:checked')].map(x=>x.value), autoSync = document.getElementById('hubGroupAuto').checked;
            if (!name || pageIds.length < 2) return error('Nhập tên nhóm và chọn ít nhất 2 trang khả dụng.');
            if (data.groups.some(g=>g.id!==id && g.name.toLocaleLowerCase('vi')===name.toLocaleLowerCase('vi'))) return error('Tên nhóm đã tồn tại.');
            const groupId = id || uid('group');
            if (group) {
                const oldConfig = data.records[`group:${id}`];
                group.pageIds.forEach(p=>{ if (group.autoSync && (!pageIds.includes(p) || !autoSync)) data.records[`page:${p}`] = copy(oldConfig); });
                Object.assign(group,{name,pageIds,autoSync});
            } else {
                const sourceId = document.getElementById('hubGroupSource').value;
                if (!pageIds.includes(sourceId)) return error('Chọn trang nguồn thuộc nhóm.');
                data.records[`group:${groupId}`] = copy(data.records[`page:${sourceId}`] || seed);
                data.groups.push({id:groupId,name,pageIds,autoSync,color:'#00449e'});
            }
            save(); selected.clear(); api.closeDialog(); if (api.isOpen) { tab='groups'; query=''; render(); } notify(`Đã lưu nhóm ${name} · ${pageIds.length} trang`);
        }, group ? `<button class="hub-secondary" type="button" style="margin-right:auto;color:#ba3434;" onclick="AutomationHub.removeGroup('${id}')">Giải tán nhóm</button>` : '');
        if (!group) {
            const updateSource = () => { const source = document.getElementById('hubGroupSource'), old = source.value; source.innerHTML = [...document.querySelectorAll('#hubForm input[name="members"]:checked')].map(x=>`<option value="${x.value}">${h(pageById(x.value).name)}</option>`).join(''); if ([...source.options].some(o=>o.value===old)) source.value=old; };
            document.querySelectorAll('#hubForm input[name="members"]').forEach(x=>x.addEventListener('change',updateSource)); updateSource();
        }
    };
    api.removeGroup = id => {
        const group = groupById(id);
        dialog('Giải tán nhóm?',`<p class="hub-note">${h(group.name)} sẽ được giải tán. ${group.pageIds.length} trang thành viên giữ lại cấu hình hiện tại và có thể chỉnh sửa riêng.</p>`,'Giải tán nhóm',()=>{
            if (group.autoSync) group.pageIds.forEach(p=>data.records[`page:${p}`]=copy(data.records[`group:${id}`]));
            data.groups.splice(data.groups.indexOf(group),1); delete data.records[`group:${id}`];
            save(); api.closeDialog(); api.open('groups');
        });
    };
    api.sync = () => {
        if (!api.scope) return;
        const group = api.scope.type==='group'?groupById(api.scope.id):groupForPage(api.scope.id);
        if (!group) return notify('Trang này chưa thuộc nhóm.');
        api.persist(); const snap = data.records[scopeKey(api.scope)];
        data.records[`group:${group.id}`] = copy(snap);
        group.pageIds.forEach(p=>data.records[`page:${p}`]=copy(snap)); save(); closeWorkspaceSwitcher();
        notify(`Đã đồng bộ cấu hình cho ${group.pageIds.length} trang trong ${group.name}`);
    };
    function targetOptions(preferred) {
        return `<optgroup label="Trang">${data.pages.filter(p=>p.connected&&!p.hidden).map(p=>`<option value="page:${p.id}" ${preferred?.type==='page'&&preferred.id===p.id?'selected':''}>${h(p.name)}${groupForPage(p.id)?.autoSync?' · dùng chung nhóm':''}</option>`).join('')}</optgroup><optgroup label="Nhóm">${data.groups.map(g=>`<option value="group:${g.id}" ${preferred?.type==='group'&&preferred.id===g.id?'selected':''}>${h(g.name)} · ${g.pageIds.length} trang</option>`).join('')}</optgroup>`;
    }
    const selectedTarget = () => { const [type,id] = document.getElementById('hubTarget').value.split(':'); return {type,id}; };
    api.previewTemplate = id => {
        const template = data.templates.find(t=>t.id===id);
        if (!template) return notify('Không tìm thấy mẫu.');
        const snap = templateSnapshot(template);
        const app = snap.app || {};
        const menus = app.menus || [], menuItems = menus.flatMap(menu => menu.items || []);
        const faqs = app.faqs || [], keywords = app.keywords || [], flows = app.flows || [];
        const sequences = app.sequences || [], rules = app.rules || [];
        const version = template.versions?.find(v=>v.id===template.currentVersionId) || template.versions?.[0];
        const source = pageById(template.sourcePageId);
        const sourceLabel = source ? `${source.name} · ${source.channel}` : template.builtin ? 'Mẫu hệ thống AntBot' : template.description?.replace(/^Mẫu tạo từ\s*/,'') || 'Không xác định';
        const versionLabel = version ? `v${version.versionNo}` : template.builtin ? 'Bản hệ thống' : 'v1';
        const statusLabel = template.status === 'ARCHIVED' ? 'Đã ngừng sử dụng' : version?.status === 'READY' || template.builtin ? 'Sẵn sàng' : 'Đang hoạt động';
        const dependencies = version?.dependencies || [];
        const parentTemplate = data.templates.find(t=>t.id===template.parentTemplateId);
        const baseTemplateLabel = template.builtin ? `${template.name} · Mẫu gốc hệ thống` : parentTemplate?.name || 'Chưa xác định';
        const variants = data.pages.map(page=>({page,record:data.records[scopeKey({type:'page',id:page.id})]}))
            .filter(item=>item.record?.managedTemplateId===template.id||item.record?.templateOrigin?.templateId===template.id);
        const actionLabel = action => ({
            NEW_MESSAGE:'Tin nhắn', MESSAGE_FLOW:'Luồng tin nhắn', START_FLOW:'Luồng tin nhắn',
            OPT_IN:'Nhận thông báo', OPEN_URL:'Mở liên kết', TRANSFER_INBOX:'Chuyển tư vấn viên'
        })[action?.type] || action?.type || 'Chưa cấu hình';
        const section = (title,count,content,open=false) => `<details class="tpl-preview-section" ${open?'open':''}><summary><span>${title}</span><b>${count}</b></summary><div class="tpl-preview-section-body">${content}</div></details>`;
        const empty = label => `<p class="tpl-preview-empty">Không có ${label} trong mẫu này.</p>`;
        const list = (items, renderer, label) => items.length ? `<div class="tpl-preview-list">${items.map(renderer).join('')}</div>` : empty(label);
        const menuPreviewContent = menus.length
            ? list(menus,menu=>`<div class="tpl-preview-menu-block"><strong>${h(menu.name || 'Menu')}</strong><small>${menu.mode==='DEFAULT'?'Mặc định':'Tùy chỉnh'} · ${(menu.items||[]).length} mục</small><div class="hub-preview-menu">${(menu.items||[]).map(item=>`<div><span>☰ &nbsp;${h(item.title)}</span><small>${h(actionLabel(item.action))}</small></div>`).join('') || '<div>Menu chưa có mục</div>'}</div></div>`,'menu')
            : '<div class="hub-preview-menu"><div>Không có menu trong mẫu này</div></div>';

        focusReturn = document.activeElement;
        closeAccountMenu(); closeWorkspaceSwitcher();
        const modal = document.getElementById('hubModal');
        modal.hidden = false;
        modal.innerHTML = `
            <div class="hub-dialog hub-dialog-large tpl-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="tplPreviewTitle">
                <div class="hub-dialog-head tpl-preview-head">
                    <div>
                        <div class="tpl-preview-badges"><span>${template.builtin?'Mẫu hệ thống':'Mẫu của tôi'}</span><span>${h(statusLabel)}</span><span>${h(versionLabel)}</span></div>
                        <h2 id="tplPreviewTitle">${h(template.name)}</h2>
                        <p>${h(template.description || 'Không có mô tả')}</p>
                    </div>
                    <button aria-label="Đóng" onclick="AutomationHub.closeDialog()">×</button>
                </div>
                <div class="tpl-preview-scroll">
                    <div class="tpl-preview-meta">
                        <div><span>Nguồn cấu hình</span><strong>${h(sourceLabel)}</strong></div>
                        <div><span>Mẫu gốc</span><strong>${h(baseTemplateLabel)}</strong></div>
                        <div><span>Phiên bản</span><strong>${h(versionLabel)} · ${h(statusLabel)}</strong></div>
                        <div><span>Chế độ áp dụng</span><strong>Bản nháp / Tắt</strong></div>
                    </div>
                    <div class="tpl-preview-metrics" aria-label="Thống kê nội dung mẫu">
                        ${[['Menu',menus.length],['Mục menu',menuItems.length],['FAQ',faqs.length],['Từ khóa',keywords.length],['Luồng',flows.length],['Kịch bản',sequences.length],['Quy luật',rules.length],['Phụ thuộc',dependencies.length]].map(([label,value])=>`<div><strong>${value}</strong><span>${label}</span></div>`).join('')}
                    </div>
                    <section class="tpl-preview-variants" aria-label="Các trang đang sử dụng mẫu">
                        <div class="tpl-preview-variants-head"><div><strong>Trang đang sử dụng mẫu</strong><span>${variants.length ? `${variants.length} trang đang cấu hình hoặc đã áp dụng mẫu` : 'Chưa có trang nào áp dụng mẫu này'}</span></div></div>
                        ${variants.length ? `
                        <div class="tpl-preview-variant-grid">${variants.map(({page,record})=>`<article>
                            <div>${avatar(page)}<span><strong>${h(page.name)}</strong><small>${h(page.channel)} · ${record.managedTemplateId===template.id?'Trang cấu hình mẫu':h(record.templateOrigin?.variantLabel || 'Đã áp dụng')}</small></span></div>
                            <p>${record.managedTemplateId===template.id?'Các lần Lưu/Xuất bản hợp lệ trên trang này sẽ tạo phiên bản mới cho mẫu.':h(record.templateOrigin?.summary || `Đã áp dụng mẫu ${template.name}.`)}</p>
                            <div class="tpl-preview-change-tags">${(record.templateOrigin?.changedAreas || ['Menu chính','Tin nhắn','FAQ','Từ khóa']).slice(0,4).map(area=>`<span>${h(area)}</span>`).join('')}</div>
                            <button type="button" class="hub-secondary" onclick="AutomationHub.openTemplateVariant('${page.id}')">Mở cấu hình trang →</button>
                        </article>`).join('')}</div>` : '<div class="tpl-preview-no-usage">Áp dụng mẫu cho một trang để bắt đầu tạo biến thể riêng.</div>'}
                    </section>
                    <div class="tpl-preview-columns">
                        <div>
                            ${section('Menu chính',menuItems.length,menuPreviewContent,true)}
                            ${section('Tin nhắn',Number(!!snap.welcome)+Number(!!snap.fallback),`${snap.welcome?.text?`<div class="tpl-preview-message"><strong>Tin nhắn mở đầu</strong><p>${h(snap.welcome.text)}</p></div>`:empty('tin nhắn mở đầu')}${snap.fallback?.text?`<div class="tpl-preview-message"><strong>Tin nhắn mặc định</strong><p>${h(snap.fallback.text)}</p></div>`:empty('tin nhắn mặc định')}`,true)}
                            ${section('Câu hỏi thường gặp',faqs.length,list(faqs,(faq,index)=>`<div class="tpl-preview-row"><span><b>${index+1}.</b> ${h(faq.question)}</span><small>${h(actionLabel(faq.action))}</small></div>`,'FAQ'))}
                        </div>
                        <div>
                            ${section('Từ khóa',keywords.length,list(keywords,item=>`<div class="tpl-preview-row"><span><strong>${h(item.name)}</strong><small>${h(item.keyword || item.includeTerms?.join(', ') || 'Chưa có cụm từ')}</small></span><em>${item.active?'Đang bật':'Sẽ tắt'}</em></div>`,'từ khóa'),true)}
                            ${section('Luồng tin nhắn',flows.length,list(flows,item=>`<div class="tpl-preview-row"><span><strong>${h(item.name)}</strong><small>${item.blocks?.length || item.steps?.length || 0} bước/khối</small></span><em>Sẽ tắt</em></div>`,'luồng tin nhắn'))}
                            ${section('Kịch bản chăm sóc',sequences.length,list(sequences,item=>`<div class="tpl-preview-row"><span><strong>${h(item.name)}</strong><small>${item.steps?.length || 0} bước</small></span><em>Sẽ tắt</em></div>`,'kịch bản'))}
                            ${section('Quy luật',rules.length,list(rules,item=>`<div class="tpl-preview-row"><span><strong>${h(item.name)}</strong><small>${item.conditions?.length || 0} điều kiện · ${item.actions?.length || 0} hành động</small></span><em>Sẽ tắt</em></div>`,'quy luật'))}
                            ${section('Liên kết phụ thuộc',dependencies.length,dependencies.length?list(dependencies,item=>`<div class="tpl-preview-row"><span>${h(item.fromName || item.fromId || 'Cấu hình')} → ${h(item.needName || item.needId || 'Tài nguyên')}</span></div>`,'liên kết'): '<p class="tpl-preview-safe">✓ Không có liên kết thiếu trong phiên bản mẫu.</p>')}
                        </div>
                    </div>
                    <div class="tpl-preview-warning"><strong>Trước khi sử dụng</strong><span>Mẫu chỉ được nạp dưới dạng Bản nháp/Tắt. Bạn cần kiểm tra nội dung, liên kết và khả năng hỗ trợ của kênh trước khi xuất bản.</span></div>
                </div>
                <div class="hub-dialog-foot">
                    ${!template.builtin?`<button type="button" class="hub-secondary tpl-preview-delete" onclick="AutomationHub.deleteTemplate('${id}')">Xóa mẫu</button>`:''}
                    <button type="button" class="hub-secondary" onclick="AutomationHub.closeDialog()">Đóng</button>
                    ${!template.builtin&&template.status!=='ARCHIVED'?`<button type="button" class="hub-secondary" onclick="AutomationHub.closeDialog();AutomationHub.openTemplateEditor('${id}')">Chỉnh sửa mẫu</button>`:''}
                    <button type="button" class="hub-primary" ${template.status==='ARCHIVED'?'disabled title="Kích hoạt lại mẫu trước khi sử dụng"':''} onclick="AutomationHub.closeDialog();AutomationHub.renderApplicationModal('${id}')">Sử dụng mẫu</button>
                </div>
            </div>`;
        modal.querySelector('.hub-dialog-head button')?.focus();
    };
    api.openTemplateVariant = pageId => {
        api.closeDialog();
        api.enter('page',pageId);
    };
    api.applyTemplate = id => {
        api.persist(); const template = data.templates.find(t=>t.id===id);
        dialog(`Sử dụng mẫu ${template.name}`,`<label class="hub-field"><span>Áp dụng cho trang hoặc nhóm</span><select id="hubTarget">${targetOptions(lastScope)}</select></label><p class="hub-note" id="hubTemplateImpact"></p><div class="hub-checks"><label><input id="hubApplyConfirm" type="checkbox" required> Tôi đồng ý thay thế bản nháp bằng cấu hình của mẫu.</label></div>`,'Áp dụng & mở Menu chính',()=>{
            const target = selectedTarget(), key = scopeKey(target), previous = data.records[key] || seed, next = copy(template.config);
            data.templateBackups ||= {}; data.templateBackups[key] = copy(previous);
            next.published = copy(previous.published);
            next.app.userMenuAssignments = copy(previous.app.userMenuAssignments || []);
            next.app.menus.forEach(m=>{ m.status='DRAFT'; });
            next.dirtyMenus = next.app.menus.map(m=>m.id); next.dirtyModules=[]; next.fallbackDirty=false;
            next.templateOrigin = {
                templateId:template.id, templateName:template.name,
                rootTemplateId:template.rootTemplateId || template.id,
                pageId:target.type==='page'?target.id:null,
                variantLabel:`Biến thể của ${scopeName(target)}`,
                summary:`Cấu hình được áp dụng từ mẫu ${template.name} và có thể tùy chỉnh độc lập.`,
                customizedAt:new Date().toISOString(),
                changedAreas:['Menu chính','Tin nhắn','FAQ','Từ khóa','Kịch bản','Quy luật']
            };
            data.records[key] = next;
            // Do not persist the old editor over the newly applied template when entering its scope.
            api.scope = null;
            save(); api.closeDialog(); api.enter(target.type,target.id); notify('Đã áp dụng mẫu vào bản nháp. Kiểm tra nội dung trước khi xuất bản menu.');
        });
        const impact = () => { const target=selectedTarget(), group=target.type==='group'?groupById(target.id):groupForPage(target.id); document.getElementById('hubTemplateImpact').textContent = `Thay thế cấu hình bản nháp của ${scopeName(target)}${group?.autoSync?` và ${group.pageIds.length} trang dùng chung trong nhóm ${group.name}`:''}. Menu đã xuất bản được giữ đến khi bạn xuất bản lại. Phiên bản trước được lưu để khôi phục.`; };
        document.getElementById('hubTarget').onchange=impact; impact();
    };
    let templateStatusFilter = 'all';
    let templateChannelFilter = 'all';

    let tplWizard = {
        editingTemplateId: null,
        step: 1,
        name: '',
        description: '',
        baseTemplateId: 'template-shop-online',
        sourcePageId: null,
        sourceChannel: 'Facebook',
        workingConfig: null,
        selected: {
            menus: new Set(),
            faqs: new Set(),
            welcome: false,
            defaultMessage: false,
            keywords: new Set(),
            sequences: new Set(),
            rules: new Set(),
            flows: new Set()
        },
        dependencies: []
    };

    api.switchTemplateStatusFilter = s => { templateStatusFilter = s; renderContent(); };
    api.switchTemplateChannelFilter = c => { templateChannelFilter = c; renderContent(); };

    function getSourceConfig(pageId) {
        return copy(data.records[scopeKey({ type:'page', id:pageId })] || seed);
    }
    function getWizardSourceConfig() {
        return tplWizard.workingConfig || getSourceConfig(tplWizard.sourcePageId);
    }

    function analyzeDependencies() {
        const source = getWizardSourceConfig();
        const sel = tplWizard.selected;
        const issues = [];

        // Check Menus
        (source.app.menus || []).forEach(m => {
            if (sel.menus.has(m.id)) {
                (m.items || []).forEach(item => {
                    if (item.action?.type === 'MESSAGE_FLOW' && item.action?.messageFlowId) {
                        if (!sel.flows.has(item.action.messageFlowId)) {
                            const flow = (source.app.flows || []).find(f => f.id === item.action.messageFlowId);
                            issues.push({
                                id: `dep-menu-flow-${item.id}`,
                                fromType: 'Mục menu',
                                fromName: `${m.name} › ${item.title}`,
                                needType: 'Luồng tin nhắn',
                                needId: item.action.messageFlowId,
                                needName: flow?.name || item.action.messageFlowId,
                                dropAction: `AutomationHub.wizardToggleItem('menus','${m.id}',false)`
                            });
                        }
                    }
                    if (item.shouldSwitchMenu && item.targetMenuId && item.targetMenuId !== m.id) {
                        if (!sel.menus.has(item.targetMenuId)) {
                            const targetM = (source.app.menus || []).find(tm => tm.id === item.targetMenuId);
                            issues.push({
                                id: `dep-menu-submenu-${item.id}`,
                                fromType: 'Mục menu',
                                fromName: `${m.name} › ${item.title}`,
                                needType: 'Menu con',
                                needId: item.targetMenuId,
                                needName: targetM?.name || item.targetMenuId,
                                dropAction: `AutomationHub.wizardToggleItem('menus','${m.id}',false)`
                            });
                        }
                    }
                });
            }
        });

        // Check FAQs
        (source.app.faqs || []).forEach(f => {
            if (sel.faqs.has(f.id)) {
                if (f.action?.type === 'MESSAGE_FLOW' && f.action?.messageFlowId) {
                    if (!sel.flows.has(f.action.messageFlowId)) {
                        const flow = (source.app.flows || []).find(fl => fl.id === f.action.messageFlowId);
                        issues.push({
                            id: `dep-faq-flow-${f.id}`,
                            fromType: 'Câu hỏi FAQ',
                            fromName: f.question,
                            needType: 'Luồng tin nhắn',
                            needId: f.action.messageFlowId,
                            needName: flow?.name || f.action.messageFlowId,
                            dropAction: `AutomationHub.wizardToggleItem('faqs','${f.id}',false)`
                        });
                    }
                }
            }
        });

        // Check Keywords
        (source.app.keywords || []).forEach(k => {
            if (sel.keywords.has(k.id)) {
                if (k.response?.type === 'MESSAGE_FLOW' && k.response?.messageFlowId) {
                    if (!sel.flows.has(k.response.messageFlowId)) {
                        const flow = (source.app.flows || []).find(fl => fl.id === k.response.messageFlowId);
                        issues.push({
                            id: `dep-kw-flow-${k.id}`,
                            fromType: 'Từ khóa',
                            fromName: k.name,
                            needType: 'Luồng tin nhắn',
                            needId: k.response.messageFlowId,
                            needName: flow?.name || k.response.messageFlowId,
                            dropAction: `AutomationHub.wizardToggleItem('keywords','${k.id}',false)`
                        });
                    }
                }
            }
        });

        // Check Rules
        (source.app.rules || []).forEach(r => {
            if (sel.rules.has(r.id)) {
                (r.actions || []).forEach(act => {
                    if (act.type === 'ENROLL_SEQUENCE' && act.sequenceId) {
                        if (!sel.sequences.has(act.sequenceId)) {
                            const seq = (source.app.sequences || []).find(s => s.id === act.sequenceId);
                            issues.push({
                                id: `dep-rule-seq-${r.id}`,
                                fromType: 'Quy luật',
                                fromName: r.name,
                                needType: 'Kịch bản chăm sóc',
                                needId: act.sequenceId,
                                needName: seq?.name || act.sequenceId,
                                dropAction: `AutomationHub.wizardToggleItem('rules','${r.id}',false)`
                            });
                        }
                    }
                });
            }
        });

        tplWizard.dependencies = issues;
        return issues;
    }

    function totalSelectedCount() {
        const s = tplWizard.selected;
        return s.menus.size + s.faqs.size + (s.welcome ? 1 : 0) + (s.defaultMessage ? 1 : 0) + s.keywords.size + s.sequences.size + s.rules.size + s.flows.size;
    }

    api.saveTemplate = () => {
        api.persist();
        dialog('Lưu cấu hình thành mẫu', `<label class="hub-field"><span>Tên mẫu</span><input id="hubTemplateName" required placeholder="Nhập tên mẫu..."></label>`, 'Lưu mẫu', () => {
            const name = document.getElementById('hubTemplateName').value.trim();
            if (!name) return notify('Tên mẫu không được để trống.');
            if (data.templates.some(t => t.name.trim().toLowerCase() === name.toLowerCase())) {
                return notify(`Tên mẫu "${name}" đã tồn tại.`);
            }
            const sourceKey = scopeKey(api.scope || { type: 'page', id: data.pages[0]?.id });
            const source = copy(data.records[sourceKey] || seed);
            source.app.userMenuAssignments = [];
            const newTpl = {
                id: uid('template'),
                name,
                description: `Mẫu tạo từ ${scopeName(api.scope || { type: 'page', id: data.pages[0]?.id })}`,
                builtin: false,
                parentTemplateId: source.templateOrigin?.templateId || 'template-shop-online',
                rootTemplateId: source.templateOrigin?.rootTemplateId || source.templateOrigin?.templateId || 'template-shop-online',
                config: source
            };
            data.templates.push(newTpl);
            save();
            api.closeDialog();
            templateCategory = 'mine';
            api.open('templates');
            notify('Đã lưu mẫu thành công.');
        });
    };

    api.beginTemplateCreation = () => {
        templateCreationPending = true;
        status = 'active'; query = ''; platform = 'all'; pageNumber = 1; selected.clear();
        api.open('pages');
        notify('Chọn một trang, thiết lập Automation rồi Lưu/Xuất bản để tạo mẫu.');
    };

    api.openTemplateWizard = forcedSourcePageId => {
        api.persist();
        const sourcePageId = forcedSourcePageId || (api.scope?.type === 'page' ? api.scope.id : data.pages.find(p=>p.connected && !p.hidden)?.id) || data.pages[0]?.id;
        const sourceConfig = getSourceConfig(sourcePageId);
        tplWizard = {
            editingTemplateId: null,
            step: 1,
            name: '',
            description: '',
            baseTemplateId: sourceConfig.templateOrigin?.templateId || 'template-shop-online',
            sourcePageId,
            sourceChannel: 'Facebook',
            workingConfig: copy(sourceConfig),
            selected: {
                menus: new Set(),
                faqs: new Set(),
                welcome: false,
                defaultMessage: false,
                keywords: new Set(),
                sequences: new Set(),
                rules: new Set(),
                flows: new Set()
            },
            dependencies: []
        };
        api.renderWizard();
    };

    api.openTemplateEditor = templateId => {
        const template = data.templates.find(t=>t.id===templateId);
        if (!template || template.builtin) return notify('Chỉ có thể chỉnh sửa Mẫu của tôi.');
        if (template.status === 'ARCHIVED') return notify('Hãy kích hoạt lại mẫu trước khi chỉnh sửa.');
        const sourcePageId = template.sourcePageId && pageById(template.sourcePageId)
            ? template.sourcePageId
            : data.pages.find(p=>p.connected&&!p.hidden)?.id;
        if (!sourcePageId) return notify('Mẫu chưa có trang cấu hình hợp lệ.');
        const key = scopeKey({type:'page',id:sourcePageId});
        const current = copy(data.records[key] || templateSnapshot(template));
        const conflictingTemplate = current.managedTemplateId && current.managedTemplateId !== template.id
            ? data.templates.find(t=>t.id===current.managedTemplateId)
            : null;
        if (conflictingTemplate) return notify(`Trang cấu hình đang được liên kết với mẫu "${conflictingTemplate.name}".`);
        current.managedTemplateId = template.id;
        data.records[key] = current;
        template.sourcePageId = sourcePageId;
        save();
        api.closeDialog();
        api.scope = null;
        api.enter('page',sourcePageId);
        notify(`Đang chỉnh sửa mẫu "${template.name}" bằng workspace Automation của ${pageById(sourcePageId).name}.`);
    };

    api.renderWizard = () => {
        const step = tplWizard.step;
        const isEditing = !!tplWizard.editingTemplateId;
        const sourcePage = pageById(tplWizard.sourcePageId) || data.pages[0];
        tplWizard.sourceChannel = sourcePage.channel;
        const source = getWizardSourceConfig();

        let body = '';
        let foot = '';

        if (step === 1) {
            body = `
                <div class="tpl-wizard-steps">
                    <div class="tpl-step active"><span class="tpl-step-num">1</span><span>Thông tin mẫu</span></div>
                    <div class="tpl-step-line"></div>
                    <div class="tpl-step"><span class="tpl-step-num">2</span><span>Cấu hình trong Automation</span></div>
                </div>
                <div style="padding:18px 22px;display:grid;gap:14px;">
                    <div class="tpl-source-summary">
                        ${avatar(sourcePage)}
                        <div><span>Trang cấu hình</span><strong>${h(sourcePage.name)}</strong><small>${h(sourcePage.channel)} · ${h(sourcePage.externalId || '')}</small></div>
                        ${isEditing?'':`<button type="button" onclick="AutomationHub.closeDialog()">Đổi trang</button>`}
                    </div>
                    <label class="hub-field">
                        <span>Mẫu gốc *</span>
                        <select id="tplBaseTemplate" required onchange="AutomationHub.wizardChangeBase(this.value)">
                            <option value="">-- Chọn mẫu gốc --</option>
                            ${data.templates.filter(t=>t.status!=='ARCHIVED'&&t.id!==tplWizard.editingTemplateId).map(t=>`<option value="${t.id}" ${t.id===tplWizard.baseTemplateId?'selected':''}>${h(t.name)}${t.builtin?' · Hệ thống':''}</option>`).join('')}
                        </select>
                        <small>Mẫu mới là một biến thể độc lập và luôn giữ liên kết truy vết về mẫu gốc.</small>
                    </label>
                    <input id="tplSourcePage" type="hidden" value="${h(sourcePage.id)}">
                    <label class="hub-field">
                        <span>Tên mẫu (1 - 100 ký tự) *</span>
                        <input id="tplName" required maxlength="100" value="${h(tplWizard.name)}" placeholder="Ví dụ: Kịch bản bán hàng thời trang hè">
                    </label>
                    <label class="hub-field">
                        <span>Mô tả mẫu</span>
                        <textarea id="tplDesc" style="height:65px;border:1px solid #dbe3ef;border-radius:7px;padding:8px 10px;font-size:11.5px;outline:none;" placeholder="Mô tả mục đích sử dụng, kịch bản hỗ trợ...">${h(tplWizard.description)}</textarea>
                    </label>
                    <p class="hub-note">Sau khi tạo, hệ thống mở Automation của ${h(sourcePage.name)}. Hãy thiết lập Menu chính, FAQ, tin nhắn, từ khóa, kịch bản và quy luật tại đây. Mỗi lần Lưu/Xuất bản hợp lệ sẽ cập nhật một phiên bản mới cho mẫu.</p>
                </div>
            `;
            foot = `
                <button type="button" class="hub-secondary" onclick="AutomationHub.closeDialog()">Hủy</button>
                <button type="button" class="hub-primary" onclick="AutomationHub.wizardStep1Submit()">Tạo mẫu & mở Automation →</button>
            `;
        } else if (step === 2) {
            const count = totalSelectedCount();
            body = `
                <div class="tpl-wizard-steps">
                    <div class="tpl-step done"><span class="tpl-step-num">✓</span><span>Tên mẫu: ${h(tplWizard.name)}</span></div>
                    <div class="tpl-step-line done"></div>
                    <div class="tpl-step active"><span class="tpl-step-num">2</span><span>Chọn nội dung</span></div>
                    <div class="tpl-step-line"></div>
                    <div class="tpl-step"><span class="tpl-step-num">3</span><span>Kiểm tra liên kết</span></div>
                </div>
                <div class="tpl-wizard-selection">
                    <div class="tpl-two-col">
                        <div class="tpl-col-left">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <span style="font-size:11.5px;color:#64748b;font-weight:600;">MẪU: <strong>${h(tplWizard.name)}</strong> · MẪU GỐC: <strong>${h(data.templates.find(t=>t.id===tplWizard.baseTemplateId)?.name || 'Chưa chọn')}</strong> · NGUỒN: <strong>${h(sourcePage.name)}</strong></span>
                                <div style="display:flex;gap:6px;">
                                    <button type="button" class="tpl-btn-sm tpl-btn-add" onclick="AutomationHub.wizardSelectAll(true)">Chọn tất cả</button>
                                    <button type="button" class="tpl-btn-sm tpl-btn-drop" onclick="AutomationHub.wizardSelectAll(false)">Bỏ chọn</button>
                                </div>
                            </div>

                            <!-- Menu group -->
                            <div class="tpl-group-box">
                                <div class="tpl-group-head" onclick="AutomationHub.wizardToggleGroup('menus', !document.getElementById('chkGroupMenus').checked)">
                                    <input type="checkbox" id="chkGroupMenus" ${source.app.menus?.length && source.app.menus.every(m=>tplWizard.selected.menus.has(m.id))?'checked':''} onclick="event.stopPropagation();AutomationHub.wizardToggleGroup('menus',this.checked)">
                                    <span>📋 Menu chính (${source.app.menus?.length || 0})</span>
                                </div>
                                <div class="tpl-group-body">
                                    ${(source.app.menus || []).map(m=>`
                                        <label class="tpl-item-check">
                                            <input type="checkbox" ${tplWizard.selected.menus.has(m.id)?'checked':''} onchange="AutomationHub.wizardToggleItem('menus','${m.id}',this.checked)">
                                            <span><strong>${h(m.name)}</strong> (${m.items?.length || 0} mục)</span>
                                            <span class="meta">${m.mode === 'DEFAULT' ? 'Mặc định' : 'Tùy chỉnh'}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- FAQ group -->
                            <div class="tpl-group-box">
                                <div class="tpl-group-head" onclick="AutomationHub.wizardToggleGroup('faqs', !document.getElementById('chkGroupFaqs').checked)">
                                    <input type="checkbox" id="chkGroupFaqs" ${source.app.faqs?.length && source.app.faqs.every(f=>tplWizard.selected.faqs.has(f.id))?'checked':''} onclick="event.stopPropagation();AutomationHub.wizardToggleGroup('faqs',this.checked)">
                                    <span>❓ Câu hỏi thường gặp (${source.app.faqs?.length || 0})</span>
                                </div>
                                <div class="tpl-group-body">
                                    ${(source.app.faqs || []).map(f=>`
                                        <label class="tpl-item-check">
                                            <input type="checkbox" ${tplWizard.selected.faqs.has(f.id)?'checked':''} onchange="AutomationHub.wizardToggleItem('faqs','${f.id}',this.checked)">
                                            <span>${h(f.question)}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Welcome and Fallback -->
                            <div class="tpl-group-box">
                                <div class="tpl-group-head"><span>👋 Tin nhắn tương tác mở đầu & dự phòng</span></div>
                                <div class="tpl-group-body">
                                    <label class="tpl-item-check">
                                        <input type="checkbox" ${tplWizard.selected.welcome?'checked':''} onchange="AutomationHub.wizardToggleSingleton('welcome',this.checked)">
                                        <span>Tin nhắn mở đầu (Welcome Message)</span>
                                    </label>
                                    <label class="tpl-item-check">
                                        <input type="checkbox" ${tplWizard.selected.defaultMessage?'checked':''} onchange="AutomationHub.wizardToggleSingleton('defaultMessage',this.checked)">
                                        <span>Tin nhắn mặc định (Default Fallback)</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Keywords group -->
                            <div class="tpl-group-box">
                                <div class="tpl-group-head" onclick="AutomationHub.wizardToggleGroup('keywords', !document.getElementById('chkGroupKw').checked)">
                                    <input type="checkbox" id="chkGroupKw" ${source.app.keywords?.length && source.app.keywords.every(k=>tplWizard.selected.keywords.has(k.id))?'checked':''} onclick="event.stopPropagation();AutomationHub.wizardToggleGroup('keywords',this.checked)">
                                    <span>🔑 Từ khóa (${source.app.keywords?.length || 0})</span>
                                </div>
                                <div class="tpl-group-body">
                                    ${(source.app.keywords || []).map(k=>`
                                        <label class="tpl-item-check">
                                            <input type="checkbox" ${tplWizard.selected.keywords.has(k.id)?'checked':''} onchange="AutomationHub.wizardToggleItem('keywords','${k.id}',this.checked)">
                                            <span><strong>${h(k.name)}</strong>: <em>${h(k.keyword || k.includeTerms?.join(', '))}</em></span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Sequences group -->
                            <div class="tpl-group-box">
                                <div class="tpl-group-head" onclick="AutomationHub.wizardToggleGroup('sequences', !document.getElementById('chkGroupSeq').checked)">
                                    <input type="checkbox" id="chkGroupSeq" ${source.app.sequences?.length && source.app.sequences.every(s=>tplWizard.selected.sequences.has(s.id))?'checked':''} onclick="event.stopPropagation();AutomationHub.wizardToggleGroup('sequences',this.checked)">
                                    <span>⏱️ Kịch bản chăm sóc (${source.app.sequences?.length || 0})</span>
                                </div>
                                <div class="tpl-group-body">
                                    ${(source.app.sequences || []).map(s=>`
                                        <label class="tpl-item-check">
                                            <input type="checkbox" ${tplWizard.selected.sequences.has(s.id)?'checked':''} onchange="AutomationHub.wizardToggleItem('sequences','${s.id}',this.checked)">
                                            <span><strong>${h(s.name)}</strong> (${s.steps?.length || 0} bước)</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Rules group -->
                            <div class="tpl-group-box">
                                <div class="tpl-group-head" onclick="AutomationHub.wizardToggleGroup('rules', !document.getElementById('chkGroupRules').checked)">
                                    <input type="checkbox" id="chkGroupRules" ${source.app.rules?.length && source.app.rules.every(r=>tplWizard.selected.rules.has(r.id))?'checked':''} onclick="event.stopPropagation();AutomationHub.wizardToggleGroup('rules',this.checked)">
                                    <span>⚙️ Quy luật tự động (${source.app.rules?.length || 0})</span>
                                </div>
                                <div class="tpl-group-body">
                                    ${(source.app.rules || []).map(r=>`
                                        <label class="tpl-item-check">
                                            <input type="checkbox" ${tplWizard.selected.rules.has(r.id)?'checked':''} onchange="AutomationHub.wizardToggleItem('rules','${r.id}',this.checked)">
                                            <span>${h(r.name)}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Flows group -->
                            <div class="tpl-group-box">
                                <div class="tpl-group-head" onclick="AutomationHub.wizardToggleGroup('flows', !document.getElementById('chkGroupFlows').checked)">
                                    <input type="checkbox" id="chkGroupFlows" ${source.app.flows?.length && source.app.flows.every(f=>tplWizard.selected.flows.has(f.id))?'checked':''} onclick="event.stopPropagation();AutomationHub.wizardToggleGroup('flows',this.checked)">
                                    <span>🌊 Luồng tin nhắn (${source.app.flows?.length || 0})</span>
                                </div>
                                <div class="tpl-group-body">
                                    ${(source.app.flows || []).map(f=>`
                                        <label class="tpl-item-check">
                                            <input type="checkbox" ${tplWizard.selected.flows.has(f.id)?'checked':''} onchange="AutomationHub.wizardToggleItem('flows','${f.id}',this.checked)">
                                            <span>${h(f.name)}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Right Panel: Manifest Summary -->
                        <div class="tpl-col-right" id="tplManifestHost">
                            <!-- Populated by renderWizardManifest -->
                        </div>
                    </div>
                </div>
            `;
            foot = `
                <button type="button" class="hub-secondary" onclick="AutomationHub.wizardBack(1)">← Quay lại</button>
                <button type="button" class="hub-primary" onclick="AutomationHub.wizardStep2Submit()">Tiếp tục: Kiểm tra liên kết →</button>
            `;
        } else if (step === 3) {
            const issues = analyzeDependencies();
            const count = totalSelectedCount();
            const isValid = issues.length === 0 && count > 0;

            body = `
                <div class="tpl-wizard-steps">
                    <div class="tpl-step done"><span class="tpl-step-num">✓</span><span>${h(tplWizard.name)}</span></div>
                    <div class="tpl-step-line done"></div>
                    <div class="tpl-step done"><span class="tpl-step-num">✓</span><span>${count} mục đã chọn</span></div>
                    <div class="tpl-step-line done"></div>
                    <div class="tpl-step active"><span class="tpl-step-num">3</span><span>Kiểm tra liên kết</span></div>
                </div>
                <div style="padding:18px 24px;display:flex;flex-direction:column;gap:14px;max-height:55vh;overflow-y:auto;">
                    ${count === 0 ? `
                        <div class="tpl-dep-alert error">
                            <strong>Mẫu chưa có nội dung</strong>
                            <p style="font-size:11.5px;color:#991b1b;">Bạn chưa chọn bất kỳ mục cấu hình nào từ trang nguồn. Vui lòng quay lại bước 2 để chọn ít nhất 1 mục.</p>
                        </div>
                    ` : issues.length > 0 ? `
                        <div class="tpl-dep-alert">
                            <strong style="color:#c2410c;">Phát hiện ${issues.length} liên kết phụ thuộc cần xử lý</strong>
                            <p style="font-size:11.5px;color:#7c2d12;">Một số mục đã chọn có tham chiếu đến tài nguyên chưa được đưa vào mẫu. Bạn có thể bấm thêm vào mẫu hoặc bỏ mục để hoàn tất.</p>
                            <div style="display:flex;flex-direction:column;gap:6px;margin-top:4px;">
                                ${issues.map(iss=>`
                                    <div class="tpl-dep-item">
                                        <span>• <strong>${h(iss.fromType)}:</strong> ${h(iss.fromName)} ➜ cần <strong>${h(iss.needType)}:</strong> <em>${h(iss.needName)}</em></span>
                                        <div class="tpl-dep-actions">
                                            <button type="button" class="tpl-btn-sm tpl-btn-add" onclick="AutomationHub.wizardAutoAddDep('${iss.needType}','${iss.needId}')">+ Thêm vào mẫu</button>
                                            <button type="button" class="tpl-btn-sm tpl-btn-drop" onclick="${iss.dropAction}">Bỏ mục này</button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : `
                        <div class="tpl-dep-alert success">
                            <strong style="color:#15803d;display:flex;align-items:center;gap:6px;">✓ Đồ thị liên kết hoàn toàn hợp lệ</strong>
                            <p style="font-size:11.5px;color:#166534;">Tất cả ${count} mục cấu hình đã chọn có liên kết khép kín, không phát sinh tham chiếu mồ côi hoặc thiếu mục phụ thuộc.</p>
                        </div>
                    `}

                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;">
                        <h4 style="font-size:12px;font-weight:700;color:#1e293b;margin-bottom:8px;">TÓM TẮT ĐÓNG GÓI PHIÊN BẢN v1</h4>
                        <ul style="font-size:11.5px;color:#475569;display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-left:16px;">
                            <li>Tên mẫu: <strong>${h(tplWizard.name)}</strong></li>
                            <li>Trang nguồn: <strong>${h(sourcePage.name)} (${sourcePage.channel})</strong></li>
                            <li>Menu chính: <strong>${tplWizard.selected.menus.size} menu</strong></li>
                            <li>Câu hỏi FAQ: <strong>${tplWizard.selected.faqs.size} câu hỏi</strong></li>
                            <li>Tin nhắn mở đầu: <strong>${tplWizard.selected.welcome ? 'Đã chọn' : 'Không'}</strong></li>
                            <li>Tin nhắn mặc định: <strong>${tplWizard.selected.defaultMessage ? 'Đã chọn' : 'Không'}</strong></li>
                            <li>Từ khóa: <strong>${tplWizard.selected.keywords.size} từ khóa</strong></li>
                            <li>Kịch bản chăm sóc: <strong>${tplWizard.selected.sequences.size} kịch bản</strong></li>
                            <li>Quy luật: <strong>${tplWizard.selected.rules.size} quy luật</strong></li>
                            <li>Luồng tin nhắn: <strong>${tplWizard.selected.flows.size} luồng</strong></li>
                        </ul>
                    </div>
                </div>
            `;
            foot = `
                <button type="button" class="hub-secondary" onclick="AutomationHub.wizardBack(2)">← Quay lại</button>
                <button type="button" class="hub-primary" ${isValid ? '' : 'disabled'} onclick="AutomationHub.finalizeTemplate()">${isEditing?'Lưu phiên bản mới':'Hoàn tất tạo mẫu'}</button>
            `;
        }

        const modal = document.getElementById('hubModal');
        modal.hidden = false;
        modal.innerHTML = `
            <div class="hub-dialog hub-dialog-large" role="dialog" aria-modal="true">
                <div class="hub-dialog-head">
                    <h2>${isEditing?'Chỉnh sửa mẫu Automation':'Tạo mẫu từ cấu hình trang'}</h2>
                    <button aria-label="Đóng" onclick="AutomationHub.closeDialog()">×</button>
                </div>
                <div class="tpl-wizard-content tpl-wizard-content-step-${step}">${body}</div>
                <div class="hub-dialog-foot">${foot}</div>
            </div>
        `;

        if (step === 2) api.renderWizardManifest();
    };

    api.wizardChangeSource = pageId => {
        tplWizard.sourcePageId = pageId;
        tplWizard.workingConfig = getSourceConfig(pageId);
        if (tplWizard.workingConfig.templateOrigin?.templateId) {
            tplWizard.baseTemplateId = tplWizard.workingConfig.templateOrigin.templateId;
        }
        tplWizard.selected.menus.clear();
        tplWizard.selected.faqs.clear();
        tplWizard.selected.keywords.clear();
        tplWizard.selected.sequences.clear();
        tplWizard.selected.rules.clear();
        tplWizard.selected.flows.clear();
        tplWizard.selected.welcome = false;
        tplWizard.selected.defaultMessage = false;
    };

    api.wizardChangeBase = templateId => {
        tplWizard.baseTemplateId = templateId;
    };

    api.wizardToggleSingleton = (key, on) => {
        if (key !== 'welcome' && key !== 'defaultMessage') return;
        tplWizard.selected[key] = !!on;
        api.renderWizardManifest();
    };

    api.wizardBack = step => {
        tplWizard.step = step;
        api.renderWizard();
    };

    api.wizardStep1Submit = () => {
        const nameInput = document.getElementById('tplName');
        const descInput = document.getElementById('tplDesc');
        const name = (nameInput?.value || '').trim();
        const baseTemplateId = document.getElementById('tplBaseTemplate')?.value || '';
        if (!name) return notify('Vui lòng nhập tên mẫu (từ 1 đến 100 ký tự).');
        if (!baseTemplateId || !data.templates.some(t=>t.id===baseTemplateId)) return notify('Vui lòng chọn mẫu gốc cho mẫu mới.');
        if (name.length > 100) return notify('Tên mẫu không được vượt quá 100 ký tự.');

        const normalized = name.toLowerCase();
        if (data.templates.some(t => t.id!==tplWizard.editingTemplateId && t.name.trim().toLowerCase() === normalized)) {
            return notify(`Tên mẫu "${name}" đã tồn tại trong tổ chức. Vui lòng chọn tên khác.`);
        }

        tplWizard.name = name;
        tplWizard.baseTemplateId = baseTemplateId;
        tplWizard.description = (descInput?.value || '').trim();
        const page = pageById(tplWizard.sourcePageId);
        if (!page) return notify('Trang cấu hình không còn tồn tại.');
        const key = scopeKey({type:'page',id:page.id});
        const source = copy(data.records[key] || seed);
        if (source.managedTemplateId) {
            const existing = data.templates.find(t=>t.id===source.managedTemplateId);
            return notify(existing
                ? `Trang này đã cấu hình mẫu "${existing.name}". Hãy mở mẫu đó để chỉnh sửa.`
                : 'Trang này đã được liên kết với một mẫu khác.');
        }
        const templateId = uid('template');
        const versionId = uid('tplv');
        const initialSnapshot = copy(source);
        delete initialSnapshot.managedTemplateId;
        delete initialSnapshot.templateOrigin;
        initialSnapshot.app.userMenuAssignments = [];
        const parent = data.templates.find(t=>t.id===baseTemplateId);
        const newTemplate = {
            id:templateId,
            organizationId:'org-antbuddy-default',
            name,
            nameNormalized:normalized,
            description:tplWizard.description || `Mẫu được cấu hình tại ${page.name}`,
            symbol:'📦',
            parentTemplateId:baseTemplateId,
            rootTemplateId:parent?.rootTemplateId || baseTemplateId,
            sourcePageId:page.id,
            sourceChannel:page.channel,
            managedScopeKey:key,
            ownerId:'user-admin',
            status:'ACTIVE',
            builtin:false,
            versions:[{id:versionId,versionNo:1,status:'READY',snapshot:initialSnapshot,dependencies:[],contentHash:`hash-${crypto.randomUUID().slice(0,8)}`,createdBy:'Quản trị viên',createdAt:new Date().toISOString(),publishedModule:'Khởi tạo từ trang'}],
            currentVersionId:versionId,
            config:initialSnapshot,
            runs:[]
        };
        source.managedTemplateId = templateId;
        data.records[key] = source;
        data.templates.push(newTemplate);
        save();
        api.closeDialog();
        templateCreationPending = false;
        api.scope = null;
        api.enter('page',page.id);
        notify(`Đã tạo mẫu "${name}". Hãy thiết lập và Lưu/Xuất bản Automation của ${page.name}.`);
    };

    api.wizardSelectAll = on => {
        const source = getWizardSourceConfig();
        if (on) {
            (source.app.menus || []).forEach(m => tplWizard.selected.menus.add(m.id));
            (source.app.faqs || []).forEach(f => tplWizard.selected.faqs.add(f.id));
            tplWizard.selected.welcome = true;
            tplWizard.selected.defaultMessage = true;
            (source.app.keywords || []).forEach(k => tplWizard.selected.keywords.add(k.id));
            (source.app.sequences || []).forEach(s => tplWizard.selected.sequences.add(s.id));
            (source.app.rules || []).forEach(r => tplWizard.selected.rules.add(r.id));
            (source.app.flows || []).forEach(fl => tplWizard.selected.flows.add(fl.id));
        } else {
            tplWizard.selected.menus.clear();
            tplWizard.selected.faqs.clear();
            tplWizard.selected.keywords.clear();
            tplWizard.selected.sequences.clear();
            tplWizard.selected.rules.clear();
            tplWizard.selected.flows.clear();
            tplWizard.selected.welcome = false;
            tplWizard.selected.defaultMessage = false;
        }
        api.renderWizard();
    };

    api.wizardToggleGroup = (group, on) => {
        const source = getWizardSourceConfig();
        const map = {
            menus: source.app.menus,
            faqs: source.app.faqs,
            keywords: source.app.keywords,
            sequences: source.app.sequences,
            rules: source.app.rules,
            flows: source.app.flows
        };
        const items = map[group] || [];
        items.forEach(it => {
            if (on) tplWizard.selected[group].add(it.id);
            else tplWizard.selected[group].delete(it.id);
        });
        api.renderWizard();
    };

    api.wizardToggleItem = (group, id, on) => {
        if (on) tplWizard.selected[group].add(id);
        else tplWizard.selected[group].delete(id);
        api.renderWizard();
    };

    api.wizardAutoAddDep = (type, id) => {
        if (type === 'Luồng tin nhắn') tplWizard.selected.flows.add(id);
        else if (type === 'Menu con') tplWizard.selected.menus.add(id);
        else if (type === 'Kịch bản chăm sóc') tplWizard.selected.sequences.add(id);
        api.renderWizard();
    };

    api.renderWizardManifest = () => {
        const host = document.getElementById('tplManifestHost');
        if (!host) return;
        const source = getWizardSourceConfig();
        const sel = tplWizard.selected;
        const count = totalSelectedCount();

        let groupsHtml = '';

        if (sel.menus.size) {
            groupsHtml += `<div class="tpl-manifest-group"><div class="tpl-manifest-group-title"><span>Menu chính</span><span>${sel.menus.size}</span></div>${[...sel.menus].map(id=>`<div class="tpl-manifest-item">📋 ${h(source.app.menus?.find(m=>m.id===id)?.name || id)}</div>`).join('')}</div>`;
        }
        if (sel.faqs.size) {
            groupsHtml += `<div class="tpl-manifest-group"><div class="tpl-manifest-group-title"><span>Câu hỏi FAQ</span><span>${sel.faqs.size}</span></div>${[...sel.faqs].map(id=>`<div class="tpl-manifest-item">❓ ${h(source.app.faqs?.find(f=>f.id===id)?.question || id)}</div>`).join('')}</div>`;
        }
        if (sel.welcome) {
            groupsHtml += `<div class="tpl-manifest-group"><div class="tpl-manifest-group-title"><span>Tin nhắn mở đầu</span><span>1</span></div><div class="tpl-manifest-item">👋 Tin nhắn chào đón khách mới</div></div>`;
        }
        if (sel.defaultMessage) {
            groupsHtml += `<div class="tpl-manifest-group"><div class="tpl-manifest-group-title"><span>Tin nhắn mặc định</span><span>1</span></div><div class="tpl-manifest-item">🤖 Phản hồi tự động ngoài giờ</div></div>`;
        }
        if (sel.keywords.size) {
            groupsHtml += `<div class="tpl-manifest-group"><div class="tpl-manifest-group-title"><span>Từ khóa</span><span>${sel.keywords.size}</span></div>${[...sel.keywords].map(id=>`<div class="tpl-manifest-item">🔑 ${h(source.app.keywords?.find(k=>k.id===id)?.name || id)}</div>`).join('')}</div>`;
        }
        if (sel.sequences.size) {
            groupsHtml += `<div class="tpl-manifest-group"><div class="tpl-manifest-group-title"><span>Kịch bản chăm sóc</span><span>${sel.sequences.size}</span></div>${[...sel.sequences].map(id=>`<div class="tpl-manifest-item">⏱️ ${h(source.app.sequences?.find(s=>s.id===id)?.name || id)}</div>`).join('')}</div>`;
        }
        if (sel.rules.size) {
            groupsHtml += `<div class="tpl-manifest-group"><div class="tpl-manifest-group-title"><span>Quy luật</span><span>${sel.rules.size}</span></div>${[...sel.rules].map(id=>`<div class="tpl-manifest-item">⚙️ ${h(source.app.rules?.find(r=>r.id===id)?.name || id)}</div>`).join('')}</div>`;
        }
        if (sel.flows.size) {
            groupsHtml += `<div class="tpl-manifest-group"><div class="tpl-manifest-group-title"><span>Luồng tin nhắn</span><span>${sel.flows.size}</span></div>${[...sel.flows].map(id=>`<div class="tpl-manifest-item">🌊 ${h(source.app.flows?.find(f=>f.id===id)?.name || id)}</div>`).join('')}</div>`;
        }

        let editorHtml = '';
        [...sel.menus].forEach(menuId => {
            const menu = source.app.menus?.find(item=>item.id===menuId);
            if (!menu) return;
            editorHtml += `<div class="tpl-tune-group"><strong>📋 ${h(menu.name)}</strong>${(menu.items||[]).map(item=>`<label><span>Tên mục menu</span><input maxlength="30" value="${h(item.title)}" oninput="AutomationHub.wizardEditField('menuItem','${menu.id}','${item.id}','title',this.value)"></label>`).join('')}</div>`;
        });
        [...sel.faqs].forEach(id => {
            const item = source.app.faqs?.find(f=>f.id===id);
            if (item) editorHtml += `<div class="tpl-tune-group"><strong>❓ Câu hỏi FAQ</strong><label><span>Câu hỏi</span><input maxlength="120" value="${h(item.question)}" oninput="AutomationHub.wizardEditField('faq','${id}','','question',this.value)"></label><label><span>Nội dung trả lời</span><textarea maxlength="640" oninput="AutomationHub.wizardEditField('faq','${id}','','answer',this.value)">${h(item.action?.text || '')}</textarea></label></div>`;
        });
        if (sel.welcome && source.welcome) editorHtml += `<div class="tpl-tune-group"><strong>👋 Tin nhắn mở đầu</strong><label><span>Nội dung</span><textarea maxlength="640" oninput="AutomationHub.wizardEditField('welcome','','','text',this.value)">${h(source.welcome.text || '')}</textarea></label><label><span>Nhãn trả lời nhanh</span><input maxlength="30" value="${h(source.welcome.reply || '')}" oninput="AutomationHub.wizardEditField('welcome','','','reply',this.value)"></label></div>`;
        if (sel.defaultMessage && source.fallback) editorHtml += `<div class="tpl-tune-group"><strong>🤖 Tin nhắn mặc định</strong><label><span>Nội dung</span><textarea maxlength="1200" oninput="AutomationHub.wizardEditField('fallback','','','text',this.value)">${h(source.fallback.text || '')}</textarea></label></div>`;
        [...sel.keywords].forEach(id => {
            const item = source.app.keywords?.find(k=>k.id===id);
            if (item) editorHtml += `<div class="tpl-tune-group"><strong>🔑 Từ khóa</strong><label><span>Tên quy tắc</span><input maxlength="80" value="${h(item.name || '')}" oninput="AutomationHub.wizardEditField('keyword','${id}','','name',this.value)"></label><label><span>Cụm từ kích hoạt</span><input value="${h(item.keyword || '')}" oninput="AutomationHub.wizardEditField('keyword','${id}','','keyword',this.value)"></label></div>`;
        });
        [...sel.sequences].forEach(id => {
            const item = source.app.sequences?.find(s=>s.id===id);
            if (item) editorHtml += `<div class="tpl-tune-group"><strong>⏱️ Kịch bản chăm sóc</strong><label><span>Tên kịch bản</span><input maxlength="100" value="${h(item.name || '')}" oninput="AutomationHub.wizardEditField('sequence','${id}','','name',this.value)"></label></div>`;
        });
        [...sel.rules].forEach(id => {
            const item = source.app.rules?.find(r=>r.id===id);
            if (item) editorHtml += `<div class="tpl-tune-group"><strong>⚙️ Quy luật</strong><label><span>Tên quy luật</span><input maxlength="100" value="${h(item.name || '')}" oninput="AutomationHub.wizardEditField('rule','${id}','','name',this.value)"></label></div>`;
        });

        host.innerHTML = `
            <div class="tpl-manifest-head">
                <h3>Nội dung mẫu</h3>
                <span class="tpl-manifest-badge">${count} mục</span>
            </div>
            ${count ? `
                <div style="overflow-y:auto;display:flex;flex-direction:column;gap:6px;">
                    ${groupsHtml}
                </div>
                <div class="tpl-tune-head"><div><strong>Tinh chỉnh nội dung mẫu</strong><span>Chỉ sửa bản sao đang tạo, không thay đổi trang nguồn hoặc mẫu gốc.</span></div><button type="button" class="hub-secondary" onclick="AutomationHub.wizardResetEdits()">Khôi phục nội dung</button></div>
                <div class="tpl-tune-editor">${editorHtml || '<p class="tpl-preview-empty">Các mục đã chọn hiện không có trường nội dung có thể chỉnh nhanh.</p>'}</div>
            ` : `
                <div class="tpl-manifest-empty">
                    <p style="font-size:24px;margin-bottom:6px;">📦</p>
                    <strong>Chưa có mục nào được chọn</strong>
                    <p style="font-size:11px;margin-top:4px;">Tick chọn các mục cấu hình bên trái để thêm vào gói Mẫu.</p>
                </div>
            `}
        `;
    };

    api.wizardEditField = (type, id, childId, field, value) => {
        const source = tplWizard.workingConfig;
        if (!source) return;
        let item;
        if (type === 'menuItem') item = source.app.menus?.find(m=>m.id===id)?.items?.find(i=>i.id===childId);
        if (type === 'faq') item = source.app.faqs?.find(f=>f.id===id);
        if (type === 'keyword') item = source.app.keywords?.find(k=>k.id===id);
        if (type === 'sequence') item = source.app.sequences?.find(s=>s.id===id);
        if (type === 'rule') item = source.app.rules?.find(r=>r.id===id);
        if (type === 'welcome') item = source.welcome;
        if (type === 'fallback') item = source.fallback;
        if (!item) return;
        if (type === 'faq' && field === 'answer') {
            item.action ||= {type:'NEW_MESSAGE'};
            item.action.text = value;
        } else item[field] = value;
    };

    api.wizardResetEdits = () => {
        tplWizard.workingConfig = getSourceConfig(tplWizard.sourcePageId);
        api.renderWizard();
    };

    api.wizardStep2Submit = () => {
        if (totalSelectedCount() === 0) return notify('Vui lòng chọn ít nhất 1 mục cấu hình để đóng gói mẫu.');
        tplWizard.step = 3;
        api.renderWizard();
    };

    api.finalizeTemplate = () => {
        const issues = analyzeDependencies();
        if (issues.length > 0) return notify('Còn phụ thuộc chưa giải quyết. Vui lòng bấm "+ Thêm vào mẫu" hoặc bỏ mục.');
        if (totalSelectedCount() === 0) return notify('Mẫu không có nội dung.');

        const source = getWizardSourceConfig();
        const sel = tplWizard.selected;

        // Build immutable snapshot
        const snapshotData = {
            app: {
                menus: (source.app.menus || []).filter(m => sel.menus.has(m.id)),
                faqs: (source.app.faqs || []).filter(f => sel.faqs.has(f.id)),
                keywords: (source.app.keywords || []).filter(k => sel.keywords.has(k.id)),
                sequences: (source.app.sequences || []).filter(s => sel.sequences.has(s.id)),
                rules: (source.app.rules || []).filter(r => sel.rules.has(r.id)),
                flows: (source.app.flows || []).filter(fl => sel.flows.has(fl.id)),
                userMenuAssignments: []
            },
            welcome: sel.welcome ? copy(source.welcome || seed.welcome) : null,
            fallback: sel.defaultMessage ? copy(source.fallback || seed.fallback) : null,
            published: []
        };

        const editingTemplate = data.templates.find(t=>t.id===tplWizard.editingTemplateId);
        const nextVersionNo = editingTemplate
            ? Math.max(0,...(editingTemplate.versions||[]).map(v=>Number(v.versionNo)||0)) + 1
            : 1;
        const templateId = uid('template');
        const versionId = uid('tplv');
        const v1 = {
            id: versionId,
            versionNo: nextVersionNo,
            status: 'READY',
            snapshot: snapshotData,
            dependencies: [],
            contentHash: `hash-${crypto.randomUUID().slice(0,8)}`,
            createdBy: 'Quản trị viên',
            createdAt: new Date().toISOString()
        };

        if (editingTemplate) {
            editingTemplate.name = tplWizard.name;
            editingTemplate.nameNormalized = tplWizard.name.toLowerCase();
            editingTemplate.description = tplWizard.description || editingTemplate.description;
            editingTemplate.parentTemplateId = tplWizard.baseTemplateId;
            editingTemplate.rootTemplateId = data.templates.find(t=>t.id===tplWizard.baseTemplateId)?.rootTemplateId || tplWizard.baseTemplateId;
            editingTemplate.sourcePageId = tplWizard.sourcePageId;
            editingTemplate.sourceChannel = tplWizard.sourceChannel;
            editingTemplate.versions ||= [];
            editingTemplate.versions.push(v1);
            editingTemplate.currentVersionId = versionId;
            editingTemplate.config = snapshotData;
            editingTemplate.updatedAt = new Date().toISOString();
            save();
            api.closeDialog();
            templateCategory = 'mine';
            api.open('templates');
            notify(`Đã lưu phiên bản v${nextVersionNo} cho mẫu "${editingTemplate.name}".`);
            return;
        }

        const newTemplate = {
            id: templateId,
            organizationId: 'org-antbuddy-default',
            name: tplWizard.name,
            nameNormalized: tplWizard.name.toLowerCase(),
            description: tplWizard.description || `Đóng gói từ ${pageById(tplWizard.sourcePageId)?.name || 'Trang nguồn'}`,
            parentTemplateId: tplWizard.baseTemplateId,
            rootTemplateId: data.templates.find(t=>t.id===tplWizard.baseTemplateId)?.rootTemplateId || tplWizard.baseTemplateId,
            symbol: '📦',
            sourcePageId: tplWizard.sourcePageId,
            sourceChannel: tplWizard.sourceChannel,
            ownerId: 'user-admin',
            status: 'ACTIVE',
            builtin: false,
            versions: [v1],
            currentVersionId: versionId,
            config: snapshotData,
            runs: []
        };

        data.templates.push(newTemplate);
        save();
        api.closeDialog();
        templateCategory = 'mine';
        api.open('templates');
        notify(`Đã hoàn tất tạo mẫu "${newTemplate.name}" (phiên bản v1).`);
    };

    // Application Plan & Execution (FR-TPL-006, 007, 008)
    api._planOverrides = api._planOverrides || {};

    api.changePlanDecision = (templateId, targetPageId, itemKey, decision, stayInCompare) => {
        const key = `${templateId}:${targetPageId}:${itemKey}`;
        api._planOverrides[key] = decision;
        if (stayInCompare) {
            api.openCompareModal(templateId, targetPageId, itemKey);
        } else {
            api.renderApplicationModal(templateId, targetPageId, true);
        }
    };

    api.openCompareModal = (templateId, targetPageId, itemKey) => {
        const template = data.templates.find(t=>t.id===templateId);
        const targetPage = pageById(targetPageId);
        if (!template || !targetPage) return;

        const snap = template.versions?.[0]?.snapshot || template.config;
        const targetConfig = getSourceConfig(targetPage.id);

        let itemName = '';
        let itemCategory = '';
        let oldData = null;
        let newData = null;

        const [cat, id] = itemKey.split(':');
        const isZaloUnsupported = targetPage.channel === 'Zalo OA' && cat === 'faq';

        if (cat === 'menu') {
            itemCategory = 'Menu chính / Menu tùy chỉnh';
            if (id === 'menu-default') {
                itemName = 'Menu mặc định';
                oldData = (targetConfig.app?.menus || []).find(m => m.mode === 'DEFAULT');
                newData = (snap.app?.menus || []).find(m => m.mode === 'DEFAULT');
            } else {
                newData = (snap.app?.menus || []).find(m => m.id === id);
                itemName = newData?.name || 'Menu tùy chỉnh';
                oldData = (targetConfig.app?.menus || []).find(m => m.name === newData?.name || m.id === id);
            }
        } else if (cat === 'faq') {
            itemCategory = 'Câu hỏi FAQ';
            newData = (snap.app?.faqs || []).find(f => f.id === id || f.question === id);
            itemName = newData?.question || 'Câu hỏi FAQ';
            oldData = (targetConfig.app?.faqs || []).find(f => f.question === newData?.question || f.id === id);
        } else if (cat === 'welcome') {
            itemCategory = 'Tin nhắn mở đầu (Welcome)';
            itemName = 'Tin nhắn mở đầu';
            newData = snap.welcome;
            oldData = targetConfig.welcome;
        } else if (cat === 'fallback') {
            itemCategory = 'Tin nhắn mặc định (Fallback)';
            itemName = 'Tin nhắn mặc định';
            newData = snap.fallback;
            oldData = targetConfig.fallback;
        } else if (cat === 'keyword') {
            itemCategory = 'Từ khóa phản hồi';
            newData = (snap.app?.keywords || []).find(k => k.id === id);
            itemName = newData?.name || 'Từ khóa';
            oldData = (targetConfig.app?.keywords || []).find(k => k.name === newData?.name);
        } else if (cat === 'sequence') {
            itemCategory = 'Kịch bản chăm sóc (Sequence)';
            newData = (snap.app?.sequences || []).find(s => s.id === id);
            itemName = newData?.name || 'Kịch bản chăm sóc';
            oldData = (targetConfig.app?.sequences || []).find(s => s.name === newData?.name);
        } else if (cat === 'rule') {
            itemCategory = 'Quy luật tự động (Rule)';
            newData = (snap.app?.rules || []).find(r => r.id === id);
            itemName = newData?.name || 'Quy luật';
            oldData = (targetConfig.app?.rules || []).find(r => r.name === newData?.name);
        }

        const currentDecision = api._planOverrides[`${templateId}:${targetPageId}:${itemKey}`] || 
            (oldData ? (itemKey.includes('default') ? 'KEEP' : 'CREATE') : 'CREATE');

        const renderProps = (dataObj, isNew = false) => {
            if (!dataObj) {
                return `<div class="tpl-compare-empty">Trang đích hiện chưa có mục này (Đang trống)</div>`;
            }
            if (cat === 'menu') {
                return `
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Tên Menu:</span>
                        <span class="tpl-compare-prop-value"><strong>${h(dataObj.name || 'Menu mặc định')}</strong></span>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Danh sách nút bấm (${(dataObj.items||[]).length} nút):</span>
                        <div class="tpl-compare-prop-value">
                            ${(dataObj.items||[]).map((it, idx) => `
                                <div style="padding:4px 0;border-bottom:1px dashed #e2e8f0;">
                                    ${idx + 1}. <strong>${h(it.title)}</strong> ${it.action?.type ? `<span style="color:#64748b;font-size:11px;font-weight:600;">(${it.action.type})</span>` : ''}
                                </div>
                            `).join('') || '<span style="color:#94a3b8;">Không có nút nào</span>'}
                        </div>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Trạng thái:</span>
                        <span class="tpl-compare-prop-value">${dataObj.status === 'PUBLISHED' ? '<span style="color:#059669;font-weight:700;">Đang hoạt động (Published)</span>' : '<span style="color:#64748b;font-weight:600;">Bản nháp (Draft)</span>'}</span>
                    </div>
                `;
            }
            if (cat === 'faq') {
                return `
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Câu hỏi:</span>
                        <span class="tpl-compare-prop-value"><strong>${h(dataObj.question)}</strong></span>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Hành động phản hồi:</span>
                        <span class="tpl-compare-prop-value">${h(dataObj.action?.type || 'Tin nhắn / Luồng')}${dataObj.action?.text ? `<div style="margin-top:4px;color:#475569;">"${h(dataObj.action.text)}"</div>` : ''}</span>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Trạng thái:</span>
                        <span class="tpl-compare-prop-value">${dataObj.status === 'PUBLISHED' ? '<span style="color:#059669;font-weight:700;">Đang bật</span>' : '<span style="color:#64748b;font-weight:600;">Bản nháp / Tắt</span>'}</span>
                    </div>
                `;
            }
            if (cat === 'welcome' || cat === 'fallback') {
                return `
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Nội dung:</span>
                        <div class="tpl-compare-prop-value" style="background:#fff;padding:8px 10px;border-radius:4px;border:1px solid #e2e8f0;white-space:pre-wrap;">${h(dataObj.text || 'Chưa có nội dung')}</div>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Trạng thái kích hoạt:</span>
                        <span class="tpl-compare-prop-value">${dataObj.active ? '<span style="color:#059669;font-weight:700;">Đang bật</span>' : '<span style="color:#b45309;font-weight:600;">Đang tắt</span>'}</span>
                    </div>
                `;
            }
            if (cat === 'keyword') {
                return `
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Tên từ khóa:</span>
                        <span class="tpl-compare-prop-value"><strong>${h(dataObj.name)}</strong></span>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Cụm từ kích hoạt:</span>
                        <span class="tpl-compare-prop-value">${(dataObj.patterns || [dataObj.name]).map(p=>`<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;margin-right:4px;font-family:inherit;">${h(p)}</code>`).join('')}</span>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Trạng thái:</span>
                        <span class="tpl-compare-prop-value">${dataObj.active ? '<span style="color:#059669;font-weight:700;">Đang bật</span>' : '<span style="color:#64748b;font-weight:600;">Đang tắt</span>'}</span>
                    </div>
                `;
            }
            if (cat === 'sequence') {
                return `
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Tên kịch bản:</span>
                        <span class="tpl-compare-prop-value"><strong>${h(dataObj.name)}</strong></span>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Số bước gửi tin:</span>
                        <span class="tpl-compare-prop-value">${(dataObj.steps || []).length} bước chăm sóc</span>
                    </div>
                    <div class="tpl-compare-prop">
                        <span class="tpl-compare-prop-label">Trạng thái:</span>
                        <span class="tpl-compare-prop-value">${dataObj.active ? '<span style="color:#059669;font-weight:700;">Đang bật</span>' : '<span style="color:#64748b;font-weight:600;">Đang tắt</span>'}</span>
                    </div>
                `;
            }
            return `<pre style="font-size:12px;max-height:180px;overflow:auto;font-family:inherit;">${h(JSON.stringify(dataObj, null, 2))}</pre>`;
        };

        const modal = document.getElementById('hubModal');
        modal.hidden = false;
        modal.innerHTML = `
            <div class="hub-dialog hub-dialog-large" role="dialog" aria-modal="true" style="max-width:820px;">
                <div class="hub-dialog-head">
                    <div>
                        <h2>Chi tiết cấu hình</h2>
                        <p style="font-size:12px;color:#64748b;margin-top:2px;">So sánh nội dung giữa bản hiện tại trên trang và bản trong gói mẫu</p>
                    </div>
                </div>
                <div style="padding:18px 22px;display:flex;flex-direction:column;gap:14px;">
                    <div class="tpl-hero-item">
                        <span class="tpl-hero-badge">${h(itemCategory)}</span>
                        <span class="tpl-hero-title">${h(itemName)}</span>
                    </div>

                    <div class="tpl-compare-container">
                        <div class="tpl-compare-panel left-panel">
                            <div class="tpl-compare-head">
                                <span class="tpl-compare-head-title" title="Bản hiện tại trên: ${h(targetPage.name)}">Bản hiện tại trên: ${h(targetPage.name)}</span>
                                <span class="tpl-badge ${oldData ? 'keep' : 'skip'}">${oldData ? 'HIỆN CÓ TRÊN TRANG' : 'TRỐNG'}</span>
                            </div>
                            <div class="tpl-compare-body">
                                ${renderProps(oldData, false)}
                            </div>
                        </div>
                        <div class="tpl-compare-panel right-panel">
                            <div class="tpl-compare-head">
                                <span class="tpl-compare-head-title" title="Bản trong Gói Mẫu: ${h(template.name)}">Bản trong Gói Mẫu: ${h(template.name)}</span>
                                <span class="tpl-badge create">NỘI DUNG MẪU</span>
                            </div>
                            <div class="tpl-compare-body">
                                ${renderProps(newData, true)}
                            </div>
                        </div>
                    </div>

                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
                        <div>
                            <strong style="font-size:13px;color:#1e293b;">Quyết định xử lý cho mục này:</strong>
                            <p style="font-size:12px;color:#64748b;margin:2px 0 0;">Bạn có thể đổi quyết định áp dụng ngay tại đây.</p>
                        </div>
                        <div style="width:180px;flex-shrink:0;">
                            ${isZaloUnsupported ? `
                                <span class="tpl-badge unsupported">KHÔNG HỖ TRỢ</span>
                            ` : `
                                <select id="compareDecisionSelect" class="tpl-decision-select ${currentDecision.toLowerCase()}" onchange="AutomationHub.changePlanDecision('${templateId}','${targetPageId}','${itemKey}',this.value,true)">
                                    <option value="KEEP" ${currentDecision==='KEEP'?'selected':''}>GIỮ NGUYÊN</option>
                                    <option value="UPDATE" ${currentDecision==='UPDATE'?'selected':''}>CẬP NHẬT</option>
                                    <option value="CREATE" ${currentDecision==='CREATE'?'selected':''}>TẠO MỚI</option>
                                </select>
                            `}
                        </div>
                    </div>
                </div>
                <div class="hub-dialog-foot">
                    <button type="button" class="hub-primary" onclick="AutomationHub.renderApplicationModal('${templateId}','${targetPageId}',true)">← Quay lại danh sách áp dụng</button>
                </div>
            </div>
        `;
    };

    api.renderApplicationModal = (templateId, targetPageId, keepTargets = false) => {
        const template = data.templates.find(t=>t.id===templateId);
        if (!template) return notify('Không tìm thấy mẫu.');
        if (template.status === 'ARCHIVED') return notify('Mẫu đã lưu trữ. Hãy khôi phục mẫu trước khi sử dụng.');
        const availablePages = data.pages.filter(p=>p.connected&&!p.hidden);
        const fallbackPage = pageById(targetPageId) || availablePages[0];
        api._applicationTargets ||= {};
        if (!keepTargets || !api._applicationTargets[templateId]) api._applicationTargets[templateId] = new Set(fallbackPage?[fallbackPage.id]:[]);
        const selectedIds = [...api._applicationTargets[templateId]].filter(id=>availablePages.some(p=>p.id===id));
        const targetPage = pageById(selectedIds[0]) || fallbackPage;
        if (!targetPage) return notify('Không có trang đích khả dụng.');
        if (!selectedIds.length) api._applicationTargets[templateId].add(targetPage.id);
        const selectedPages = availablePages.filter(p=>api._applicationTargets[templateId].has(p.id));

        const snap = templateSnapshot(template);
        const targetConfig = getSourceConfig(targetPage.id);

        // Analyze Channel Constraints (FR-TPL-006)
        const isZalo = targetPage.channel === 'Zalo OA';
        const isFacebook = targetPage.channel === 'Facebook';

        const planItems = [];

        // Check menus
        (snap.app?.menus || []).forEach(m => {
            const isDef = m.mode === 'DEFAULT';
            const itemKey = `menu:${m.id || (isDef ? 'menu-default' : 'custom')}`;
            const targetItem = isDef ? (targetConfig.app?.menus || []).find(tm => tm.mode === 'DEFAULT') : (targetConfig.app?.menus || []).find(tm => tm.name === m.name);
            
            const savedDec = api._planOverrides[`${templateId}:${targetPage.id}:${itemKey}`];
            let decision = savedDec;
            if (!decision) {
                decision = isDef ? 'KEEP' : 'CREATE';
            }

            planItems.push({
                key: itemKey,
                name: m.name,
                type: isDef ? 'Menu chính (Mặc định)' : 'Menu tùy chỉnh',
                decision,
                hasOld: !!targetItem
            });
        });

        // Check FAQ
        (snap.app?.faqs || []).forEach(f => {
            const itemKey = `faq:${f.id}`;
            const targetItem = (targetConfig.app?.faqs || []).find(tf => tf.question === f.question);
            const savedDec = api._planOverrides[`${templateId}:${targetPage.id}:${itemKey}`];

            let decision = savedDec;
            if (isZalo) {
                decision = 'UNSUPPORTED';
            } else if (!decision) {
                decision = targetItem ? 'UPDATE' : 'CREATE';
            }

            planItems.push({
                key: itemKey,
                name: f.question,
                type: 'Câu hỏi FAQ',
                decision,
                hasOld: !!targetItem,
                isZaloUnsupported: isZalo
            });
        });

        // Check Welcome
        if (snap.welcome) {
            const itemKey = 'welcome:welcome';
            const targetItem = targetConfig.welcome;
            const savedDec = api._planOverrides[`${templateId}:${targetPage.id}:${itemKey}`];
            const decision = savedDec || (targetItem?.text ? 'UPDATE' : 'CREATE');

            planItems.push({
                key: itemKey,
                name: 'Tin nhắn mở đầu',
                type: 'Welcome',
                decision,
                hasOld: !!targetItem?.text
            });
        }

        if (snap.fallback) {
            const itemKey = 'fallback:fallback';
            const savedDec = api._planOverrides[`${templateId}:${targetPage.id}:${itemKey}`];
            planItems.push({
                key: itemKey,
                name: 'Tin nhắn mặc định',
                type: 'Default fallback',
                decision: savedDec || (targetConfig.fallback ? 'UPDATE' : 'CREATE'),
                hasOld: !!targetConfig.fallback
            });
        }

        // Check Keywords
        (snap.app?.keywords || []).forEach(k => {
            const itemKey = `keyword:${k.id}`;
            const targetItem = (targetConfig.app?.keywords || []).find(tk => tk.name === k.name);
            const savedDec = api._planOverrides[`${templateId}:${targetPage.id}:${itemKey}`];
            const decision = savedDec || (targetItem ? 'UPDATE' : 'CREATE');

            planItems.push({
                key: itemKey,
                name: k.name,
                type: 'Từ khóa',
                decision,
                hasOld: !!targetItem
            });
        });

        // Check Sequences
        (snap.app?.sequences || []).forEach(s => {
            const itemKey = `sequence:${s.id}`;
            const targetItem = (targetConfig.app?.sequences || []).find(ts => ts.name === s.name);
            const savedDec = api._planOverrides[`${templateId}:${targetPage.id}:${itemKey}`];
            const decision = savedDec || (targetItem ? 'UPDATE' : 'CREATE');

            planItems.push({
                key: itemKey,
                name: s.name,
                type: 'Kịch bản chăm sóc',
                decision,
                hasOld: !!targetItem
            });
        });

        // Check Rules
        (snap.app?.rules || []).forEach(r => {
            const itemKey = `rule:${r.id}`;
            const targetItem = (targetConfig.app?.rules || []).find(tr => tr.name === r.name);
            const savedDec = api._planOverrides[`${templateId}:${targetPage.id}:${itemKey}`];
            const decision = savedDec || (targetItem ? 'UPDATE' : 'CREATE');

            planItems.push({
                key: itemKey,
                name: r.name,
                type: 'Quy luật',
                decision,
                hasOld: !!targetItem
            });
        });

        const modal = document.getElementById('hubModal');
        modal.hidden = false;
        modal.innerHTML = `
            <div class="hub-dialog hub-dialog-large" role="dialog" aria-modal="true" style="max-width:880px;display:flex;flex-direction:column;max-height:90vh;overflow:hidden;">
                <div class="hub-dialog-head" style="flex-shrink:0;">
                    <div>
                        <h2>Áp dụng Mẫu: ${h(template.name)}</h2>
                        <p style="font-size:12px;color:#64748b;margin-top:2px;">Tùy chỉnh quyết định cho từng mục hoặc xem chi tiết trước khi áp dụng</p>
                    </div>
                </div>
                <div style="padding:18px 22px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;flex:1;">
                    <div class="tpl-page-dropdown-container">
                        <span style="font-size:13px;font-weight:700;color:#1e293b;display:block;margin-bottom:6px;">Chọn nhiều trang đích</span>
                        <button type="button" id="tplPageDropdownTrigger" class="tpl-page-dropdown-trigger" onclick="const m=document.getElementById('tplPageDropdownMenu');if(m)m.hidden=!m.hidden;">
                            <div class="tpl-page-card-avatar" style="background:#00176B;">${selectedPages.length}</div>
                            <div class="tpl-page-card-info">
                                <span class="tpl-page-card-name">${selectedPages.length} trang đã chọn</span>
                                <span class="tpl-page-card-sub">${h(selectedPages.map(p=>p.name).join(' · ') || 'Chưa chọn trang')}</span>
                            </div>
                            <svg class="tpl-page-dropdown-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>

                        <div id="tplPageDropdownMenu" class="tpl-page-dropdown-menu" hidden>
                            ${availablePages.map(p=>{
                                const isSel = api._applicationTargets[templateId].has(p.id);
                                const handleText = p.handle || `@${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
                                return `
                                    <label class="tpl-page-card ${isSel ? 'selected' : ''}">
                                        <input type="checkbox" ${isSel?'checked':''} onchange="AutomationHub.toggleApplicationTarget('${templateId}','${p.id}',this.checked)">
                                        <div class="tpl-page-card-avatar" style="background:${p.color || '#4f46e5'};">${h(p.initials || '▦')}</div>
                                        <div class="tpl-page-card-info">
                                            <span class="tpl-page-card-name">${h(p.name)}</span>
                                            <span class="tpl-page-card-sub">${h(handleText)} · ${h(p.channel)}</span>
                                        </div>
                                        ${isSel ? '<span class="tpl-page-card-check">✓</span>' : ''}
                                    </label>
                                `;
                            }).join('')}
                        </div>

                        <small style="display:block;margin-top:6px;color:#64748b;">Bảng so sánh dùng trang đầu tiên đã chọn; mỗi trang vẫn có backup và application log riêng.</small>
                    </div>

                    ${isZalo && (snap.app?.faqs?.length || 0) > 0 ? `
                        <div class="tpl-dep-alert">
                            <strong style="color:#c2410c;font-size:13px;">Cảnh báo tương thích kênh Zalo OA</strong>
                            <p style="font-size:12.5px;color:#7c2d12;margin:0;">Kênh Zalo OA không hỗ trợ khối gợi ý FAQ dạng Messenger. Hệ thống sẽ tự động bỏ qua ${snap.app.faqs.length} câu hỏi FAQ và vẫn đảm bảo các mục khác hoạt động bình thường.</p>
                        </div>
                    ` : ''}

                    <div class="tpl-table-scroll-wrap">
                        <table class="tpl-plan-matrix">
                            <thead>
                                <tr>
                                    <th style="width:44%;">MỤC CẤU HÌNH</th>
                                    <th style="width:26%;">PHÂN LOẠI</th>
                                    <th style="width:30%;text-align:left;padding-left:16px;">QUYẾT ĐỊNH</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${planItems.map(it=>`
                                    <tr>
                                        <td><strong>${h(it.name)}</strong></td>
                                        <td style="color:#475569;">${h(it.type)}</td>
                                        <td style="text-align:left;padding-left:16px;">
                                            <div style="display:inline-flex;align-items:center;justify-content:flex-start;gap:8px;width:100%;">
                                                ${it.isZaloUnsupported ? `
                                                    <span class="tpl-badge unsupported">KHÔNG HỖ TRỢ</span>
                                                ` : `
                                                    <select class="tpl-decision-select ${it.decision.toLowerCase()}" style="width:130px;" onchange="AutomationHub.changePlanDecision('${templateId}','${targetPage.id}','${it.key}',this.value)">
                                                        <option value="KEEP" ${it.decision==='KEEP'?'selected':''}>GIỮ NGUYÊN</option>
                                                        <option value="UPDATE" ${it.decision==='UPDATE'?'selected':''}>CẬP NHẬT</option>
                                                        <option value="CREATE" ${it.decision==='CREATE'?'selected':''}>TẠO MỚI</option>
                                                    </select>
                                                `}
                                                <button type="button" class="tpl-eye-btn" title="Xem chi tiết cấu hình & So sánh" onclick="event.stopPropagation(); AutomationHub.openCompareModal('${templateId}','${targetPage.id}','${it.key}')">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;">
                        <label style="display:flex;align-items:center;gap:9px;font-size:13px;color:#166534;font-weight:600;cursor:pointer;">
                            <input type="checkbox" id="chkAppPlanConfirm" onchange="const b=document.getElementById('btnApplyTemplateSubmit');if(b)b.disabled=!this.checked||${selectedPages.length}===0;">
                            <span>Tôi xác nhận áp dụng mẫu cho ${selectedPages.length} trang đã chọn dưới dạng Bản nháp / Tắt.</span>
                        </label>
                    </div>
                </div>
                <div class="hub-dialog-foot" style="flex-shrink:0;">
                    <button type="button" class="hub-secondary" onclick="AutomationHub.closeDialog()">Hủy</button>
                    <button type="button" id="btnApplyTemplateSubmit" class="hub-primary" disabled onclick="AutomationHub.executeApplications('${templateId}')">Áp dụng cho ${selectedPages.length} trang</button>
                </div>
            </div>
        `;
    };

    api.toggleApplicationTarget = (templateId,pageId,on) => {
        api._applicationTargets ||= {};
        const targets = api._applicationTargets[templateId] ||= new Set();
        on ? targets.add(pageId) : targets.delete(pageId);
        api.renderApplicationModal(templateId,pageId,true);
        const menu = document.getElementById('tplPageDropdownMenu');
        if (menu) menu.hidden = false;
    };

    api.executeApplication = (templateId, targetPageId, batchMode = false) => {
        const confirmCheck = document.getElementById('chkAppPlanConfirm');
        if (confirmCheck && !confirmCheck.checked) return notify('Vui lòng xác nhận đồng ý với kế hoạch áp dụng.');

        const template = data.templates.find(t=>t.id===templateId);
        const targetPage = pageById(targetPageId);
        if (!template || !targetPage) return;

        const snap = copy(templateSnapshot(template));
        const key = scopeKey({ type:'page', id:targetPage.id });
        const previous = copy(data.records[key] || seed);

        data.templateBackups ||= {};
        data.templateBackups[key] = copy(previous);

        // Generate ID re-mappings to guarantee isolation (FR-TPL-007)
        const idMapping = {};
        const isZalo = targetPage.channel === 'Zalo OA';

        // Map flows
        (snap.app?.flows || []).forEach(f => {
            const newId = `flow-${targetPage.id.slice(5)}-${uid('fl').slice(-6)}`;
            idMapping[f.id] = newId;
            f.id = newId;
        });

        // Helper to get effective decision for an item
        const getDecision = (cat, id, defaultVal) => {
            const override = api._planOverrides[`${templateId}:${targetPage.id}:${cat}:${id}`];
            return override || defaultVal;
        };

        // Prepare merged config
        const nextConfig = copy(previous);
        nextConfig.app ||= {};
        nextConfig.app.menus ||= [];
        nextConfig.app.faqs ||= [];
        nextConfig.app.keywords ||= [];
        nextConfig.app.sequences ||= [];
        nextConfig.app.rules ||= [];
        nextConfig.app.flows ||= [];

        // Menus
        (snap.app?.menus || []).forEach(m => {
            const isDef = m.mode === 'DEFAULT';
            const itemKey = isDef ? 'menu-default' : (m.id || 'custom');
            const dec = getDecision('menu', itemKey, isDef ? 'KEEP' : 'CREATE');

            if (dec === 'KEEP' || dec === 'SKIP') return;

            if (isDef && dec === 'UPDATE') {
                nextConfig.app.menus = nextConfig.app.menus.filter(tm => tm.id !== 'menu-default');
                m.id = 'menu-default';
                m.status = 'DRAFT';
                nextConfig.app.menus.unshift(m);
            } else if (dec === 'CREATE') {
                const newId = isDef ? `menu-${targetPage.id.slice(5)}-copy-default` : `menu-${targetPage.id.slice(5)}-${uid('m').slice(-6)}`;
                idMapping[m.id] = newId;
                m.id = newId;
                if (isDef) {
                    m.mode = 'USER_LEVEL';
                    m.name = `${m.name} (Sao chép)`;
                }
                m.status = 'DRAFT';
                nextConfig.app.menus.push(m);
            }
        });

        // Re-point menu item targetMenuIds & messageFlowIds
        (nextConfig.app.menus || []).forEach(m => {
            (m.items || []).forEach(it => {
                if (it.action?.type === 'MESSAGE_FLOW' && it.action?.messageFlowId) {
                    it.action.messageFlowId = idMapping[it.action.messageFlowId] || it.action.messageFlowId;
                }
                if (it.shouldSwitchMenu && it.targetMenuId) {
                    it.targetMenuId = idMapping[it.targetMenuId] || it.targetMenuId;
                }
            });
        });

        // FAQs
        if (!isZalo) {
            (snap.app?.faqs || []).forEach(f => {
                const dec = getDecision('faq', f.id, 'CREATE');
                if (dec === 'KEEP' || dec === 'SKIP' || dec === 'UNSUPPORTED') return;

                if (f.action?.type === 'MESSAGE_FLOW' && f.action?.messageFlowId) {
                    f.action.messageFlowId = idMapping[f.action.messageFlowId] || f.action.messageFlowId;
                }

                if (dec === 'UPDATE') {
                    const existingIdx = nextConfig.app.faqs.findIndex(tf => tf.question === f.question);
                    if (existingIdx >= 0) {
                        nextConfig.app.faqs[existingIdx] = { ...f, id: nextConfig.app.faqs[existingIdx].id, status: 'DRAFT' };
                    } else {
                        f.id = `faq-${targetPage.id.slice(5)}-${uid('fq').slice(-6)}`;
                        f.status = 'DRAFT';
                        nextConfig.app.faqs.push(f);
                    }
                } else if (dec === 'CREATE') {
                    f.id = `faq-${targetPage.id.slice(5)}-${uid('fq').slice(-6)}`;
                    f.status = 'DRAFT';
                    nextConfig.app.faqs.push(f);
                }
            });
        }

        // Welcome
        if (snap.welcome) {
            const dec = getDecision('welcome', 'welcome', 'UPDATE');
            if (dec === 'UPDATE' || dec === 'CREATE') {
                nextConfig.welcome = copy(snap.welcome);
                nextConfig.welcome.active = false; // Safe mode
            }
        }

        if (snap.fallback) {
            const dec = getDecision('fallback', 'fallback', nextConfig.fallback ? 'UPDATE' : 'CREATE');
            if (dec === 'UPDATE' || dec === 'CREATE') {
                nextConfig.fallback = copy(snap.fallback);
                nextConfig.fallback.enabled = false;
                nextConfig.fallbackDraft = copy(nextConfig.fallback);
                nextConfig.fallbackDirty = true;
            }
        }

        // Keywords
        (snap.app?.keywords || []).forEach(k => {
            const dec = getDecision('keyword', k.id, 'CREATE');
            if (dec === 'KEEP' || dec === 'SKIP') return;

            const newId = `kw-${targetPage.id.slice(5)}-${uid('kw').slice(-6)}`;
            idMapping[k.id] = newId;
            k.id = newId;
            k.active = false;
            if (k.response?.type === 'MESSAGE_FLOW' && k.response?.messageFlowId) {
                k.response.messageFlowId = idMapping[k.response.messageFlowId] || k.response.messageFlowId;
            }

            if (dec === 'UPDATE') {
                const existingIdx = nextConfig.app.keywords.findIndex(tk => tk.name === k.name);
                if (existingIdx >= 0) {
                    nextConfig.app.keywords[existingIdx] = k;
                } else {
                    nextConfig.app.keywords.push(k);
                }
            } else if (dec === 'CREATE') {
                nextConfig.app.keywords.push(k);
            }
        });

        // Sequences
        (snap.app?.sequences || []).forEach(s => {
            const dec = getDecision('sequence', s.id, 'CREATE');
            if (dec === 'KEEP' || dec === 'SKIP') return;

            const newId = `seq-${targetPage.id.slice(5)}-${uid('sq').slice(-6)}`;
            idMapping[s.id] = newId;
            s.id = newId;
            s.active = false;

            if (dec === 'UPDATE') {
                const existingIdx = nextConfig.app.sequences.findIndex(ts => ts.name === s.name);
                if (existingIdx >= 0) {
                    nextConfig.app.sequences[existingIdx] = s;
                } else {
                    nextConfig.app.sequences.push(s);
                }
            } else if (dec === 'CREATE') {
                nextConfig.app.sequences.push(s);
            }
        });

        // Rules
        (snap.app?.rules || []).forEach(r => {
            const dec = getDecision('rule', r.id, 'CREATE');
            if (dec === 'KEEP' || dec === 'SKIP') return;

            const newId = `rule-${targetPage.id.slice(5)}-${uid('rl').slice(-6)}`;
            r.id = newId;
            r.active = false;
            (r.actions || []).forEach(act => {
                if (act.type === 'ENROLL_SEQUENCE' && act.sequenceId) {
                    act.sequenceId = idMapping[act.sequenceId] || act.sequenceId;
                }
            });

            if (dec === 'UPDATE') {
                const existingIdx = nextConfig.app.rules.findIndex(tr => tr.name === r.name);
                if (existingIdx >= 0) {
                    nextConfig.app.rules[existingIdx] = r;
                } else {
                    nextConfig.app.rules.push(r);
                }
            } else if (dec === 'CREATE') {
                nextConfig.app.rules.push(r);
            }
        });

        // Flows
        (snap.app?.flows || []).forEach(fl => nextConfig.app.flows.push(fl));

        nextConfig.templateOrigin = {
            templateId:template.id,
            templateName:template.name,
            rootTemplateId:template.rootTemplateId || template.id,
            pageId:targetPage.id,
            variantLabel:`Biến thể của ${targetPage.name}`,
            summary:`Đã áp dụng từ mẫu ${template.name}; các thay đổi sau áp dụng chỉ thuộc trang này.`,
            customizedAt:new Date().toISOString(),
            changedAreas:['Menu chính','Tin nhắn','FAQ','Từ khóa','Kịch bản','Quy luật']
        };

        data.records[key] = nextConfig;

        // Record ApplicationRun (FR-TPL-007, FR-TPL-009)
        const runRecord = {
            id: uid('run'),
            idempotencyKey: `${templateId}-${targetPage.id}-${Date.now()}`,
            targetPageId: targetPage.id,
            targetPageName: targetPage.name,
            status: 'SUCCESS',
            appliedItemCounts: {
                menus: snap.app?.menus?.length || 0,
                faqs: isZalo ? 0 : (snap.app?.faqs?.length || 0),
                keywords: snap.app?.keywords?.length || 0,
                sequences: snap.app?.sequences?.length || 0,
                rules: snap.app?.rules?.length || 0
            },
            idMapping,
            executedBy: 'Quản trị viên',
            executedAt: new Date().toISOString()
        };
        (template.runs ||= []).unshift(runRecord);

        save();

        // Show Post-Application Checklist (FR-TPL-008)
        if (batchMode) return {targetPage,runRecord};
        api.renderPostApplyChecklist(template, targetPage, runRecord);
        return {targetPage,runRecord};
    };

    api.executeApplications = templateId => {
        const confirmCheck = document.getElementById('chkAppPlanConfirm');
        if (!confirmCheck?.checked) return notify('Vui lòng xác nhận đồng ý với kế hoạch áp dụng.');
        const selectedIds = [...(api._applicationTargets?.[templateId] || [])];
        if (!selectedIds.length) return notify('Vui lòng chọn ít nhất một trang đích.');
        const uniqueScopes = new Set(), results = [];
        selectedIds.forEach(pageId=>{
            const key = scopeKey({type:'page',id:pageId});
            if (uniqueScopes.has(key)) return;
            uniqueScopes.add(key);
            const result = api.executeApplication(templateId,pageId,true);
            if (result) results.push(result);
        });
        const template = data.templates.find(t=>t.id===templateId);
        api._applicationTargets[templateId] = new Set();
        api.renderPostApplyBatchChecklist(template,results,selectedIds.length-results.length);
    };

    api.renderPostApplyBatchChecklist = (template,results,sharedScopeSkipped=0) => {
        const modal = document.getElementById('hubModal');
        modal.hidden = false;
        modal.innerHTML = `<div class="hub-dialog" role="dialog" aria-modal="true"><div class="hub-dialog-head"><h2 style="color:#059669;">✓ Áp dụng mẫu thành công</h2><button aria-label="Đóng" onclick="AutomationHub.closeDialog()">×</button></div><div style="padding:18px 22px;display:grid;gap:12px;"><p>Đã áp dụng <strong>${h(template?.name||'Mẫu')}</strong> cho <strong>${results.length} phạm vi cấu hình</strong>.</p><div class="tpl-checklist">${results.map(({targetPage})=>`<div class="tpl-chk-item done"><span class="tpl-chk-icon">✓</span><span>${h(targetPage.name)} · Đã tạo backup, cấu hình bản nháp và application log riêng</span></div>`).join('')}</div>${sharedScopeSkipped?`<p class="hub-note">${sharedScopeSkipped} trang thuộc nhóm dùng chung đã được gộp để tránh áp dụng trùng cùng một cấu hình.</p>`:''}</div><div class="hub-dialog-foot"><button class="hub-secondary" onclick="AutomationHub.closeDialog();AutomationHub.open('templates')">Về danh sách mẫu</button><button class="hub-primary" onclick="AutomationHub.closeDialog();AutomationHub.open('pages')">Về danh sách trang</button></div></div>`;
    };

    api.renderPostApplyChecklist = (template, targetPage, runRecord) => {
        const modal = document.getElementById('hubModal');
        modal.hidden = false;
        modal.innerHTML = `
            <div class="hub-dialog" role="dialog" aria-modal="true">
                <div class="hub-dialog-head">
                    <h2 style="color:#059669;display:flex;align-items:center;gap:8px;">✓ Áp dụng mẫu thành công!</h2>
                    <button aria-label="Đóng" onclick="AutomationHub.closeDialog()">×</button>
                </div>
                <div style="padding:18px 22px;display:flex;flex-direction:column;gap:14px;">
                    <p style="font-size:12px;color:#334155;">Đã sao chép gói cấu hình từ <strong>${h(template.name)}</strong> vào trang <strong>${h(targetPage.name)}</strong>. Toàn bộ cấu hình mới đang ở trạng thái an toàn để bạn kiểm tra.</p>

                    <div class="tpl-checklist">
                        <strong style="font-size:11.5px;color:#1e293b;">CHECKLIST XUẤT BẢN CẤU HÌNH (FR-TPL-008):</strong>
                        <div class="tpl-chk-item done"><span class="tpl-chk-icon">✓</span><span>Menu chính: Đã nạp ${runRecord.appliedItemCounts.menus} menu (Trạng thái Bản nháp)</span></div>
                        <div class="tpl-chk-item done"><span class="tpl-chk-icon">✓</span><span>FAQ: Đã nạp ${runRecord.appliedItemCounts.faqs} câu hỏi (Trạng thái Bản nháp)</span></div>
                        <div class="tpl-chk-item done"><span class="tpl-chk-icon">✓</span><span>Từ khóa & Kịch bản: ${runRecord.appliedItemCounts.keywords} từ khóa, ${runRecord.appliedItemCounts.sequences} kịch bản (Trạng thái Tắt)</span></div>
                        <div class="tpl-chk-item"><span class="tpl-chk-icon">○</span><span>Kiểm tra nội dung tin nhắn và bấm "Xuất bản" khi sẵn sàng đón khách.</span></div>
                    </div>

                    <p class="hub-note">Cấu hình chưa xuất bản sẽ không ảnh hưởng đến khách chat thực tế trên Fanpage/Zalo.</p>
                </div>
                <div class="hub-dialog-foot">
                    <button type="button" class="hub-secondary" onclick="AutomationHub.closeDialog();AutomationHub.open('templates')">Về danh sách mẫu</button>
                    <button type="button" class="hub-primary" onclick="AutomationHub.closeDialog();AutomationHub.enter('page','${targetPage.id}')">Mở cấu hình trang đích →</button>
                </div>
            </div>
        `;
    };

    api.archiveTemplate = id => {
        const t = data.templates.find(item=>item.id===id);
        if (!t) return;
        t.status = 'ARCHIVED';
        save();
        renderContent();
        notify(`Đã ngừng sử dụng mẫu "${t.name}". Mẫu được giữ lại nhưng không thể áp dụng mới.`);
    };

    api.restoreTemplate = id => {
        const t = data.templates.find(item=>item.id===id);
        if (!t) return;
        t.status = 'ACTIVE';
        save();
        renderContent();
        notify(`Đã kích hoạt lại mẫu "${t.name}".`);
    };

    api.deleteTemplate = id => dialog('Xóa mẫu?', '<p class="hub-note">Các trang và nhóm đã áp dụng mẫu vẫn giữ nguyên cấu hình. Liên kết cấu hình với trang nguồn sẽ được gỡ và mẫu bị xóa vĩnh viễn khỏi danh sách.</p>','Xóa mẫu',()=>{
        Object.values(data.records).forEach(record => {
            if (record?.managedTemplateId === id) delete record.managedTemplateId;
        });
        data.templates=data.templates.filter(t=>t.id!==id);
        save();api.closeDialog();renderContent();notify('Đã xóa mẫu và gỡ liên kết với trang cấu hình.');
    });

    api.restoreTemplateBackup = () => {
        if (!api.scope) return; const key=scopeKey(api.scope),backup=data.templateBackups?.[key];
        if(!backup)return notify('Không có phiên bản trước mẫu để khôi phục.');
        dialog('Khôi phục cấu hình?', '<p class="hub-note">Thay thế cấu hình hiện tại bằng phiên bản đã lưu trước khi áp dụng mẫu.</p>', 'Khôi phục', () => {
            data.records[key]=copy(backup);delete data.templateBackups[key];restore(backup);save();api.closeDialog();switchTab('main-menu');notify('Đã khôi phục cấu hình trước khi áp dụng mẫu.');
        });
    };
    return api;
})();

function saveWelcomeConfig() {
    const text=document.getElementById('welcomeMsgInput').value.trim();
    if(document.getElementById('welcomeActiveToggle').checked && !text) return notify('Vui lòng nhập tin nhắn mở đầu.');
    moduleDirtyState.delete('welcome-message');
    AutomationHub.persist(); notify('Đã lưu tin nhắn mở đầu.'); AutomationHub.publishLinkedTemplate('Tin nhắn mở đầu');
}
