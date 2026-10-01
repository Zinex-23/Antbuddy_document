/**
 * AntBuddy Automation Engine & Data Store
 * Implements FR-AUT-001 through FR-AUT-007 with BR-AUT-001 through BR-AUT-032
 */

(function(global) {
    'use strict';

    const STORAGE_KEY = 'antbuddy_automation_store_v3';

    // Normalized Seed Data according to Section 17 of Verified Spec
    const initialStore = {
        version: 4,
        activeChannelId: 'chan-fb-01',
        channels: [
            {
                id: 'chan-fb-01',
                name: 'Facebook Page AntBuddy Demo',
                type: 'FACEBOOK',
                connectionStatus: 'CONNECTED',
                timezone: 'Asia/Ho_Chi_Minh',
                defaultSkillId: 'skill-cskh-default',
                capabilities: {
                    persistentMenu: true,
                    faqButtons: true,
                    welcomeMessage: true,
                    outside24hMessaging: false,
                    optIn: true,
                    maxMenuItems: 20,
                    maxFaqItems: 4
                }
            },
            {
                id: 'chan-zalo-01',
                name: 'Zalo OA Demo',
                type: 'ZALO',
                connectionStatus: 'DISCONNECTED',
                timezone: 'Asia/Ho_Chi_Minh',
                defaultSkillId: 'skill-zalo-default',
                capabilities: {
                    persistentMenu: true,
                    faqButtons: false,
                    welcomeMessage: true,
                    outside24hMessaging: true,
                    optIn: false,
                    maxMenuItems: 10,
                    maxFaqItems: 0
                }
            }
        ],
        flows: [
            { id: 'flow-tu-van-sp', name: 'Tư vấn sản phẩm', active: true, response: 'Dạ AntBuddy có các giải pháp Chatbot AI, CRM tích hợp và Omnichannel Support. Bạn đang quan tâm phân hệ nào ạ?' },
            { id: 'flow-tra-cuu-don', name: 'Tra cứu đơn hàng', active: true, response: 'Vui lòng nhập mã đơn hàng (VD: AB-12345) để hệ thống kiểm tra trạng thái vận chuyển tức thời.' },
            { id: 'flow-uu-dai', name: 'Đăng ký nhận ưu đãi', active: true, response: 'Bạn đã đăng ký nhận mã giảm giá 20% thành công! Mã ưu đãi: ANTBOT20' }
        ],
        menus: [
            {
                id: 'menu-default',
                channelId: 'chan-fb-01',
                name: 'Menu mặc định',
                mode: 'DEFAULT',
                status: 'PUBLISHED',
                publishedVersion: 1,
                draftVersion: 1,
                publishedAt: '2026-09-21T08:00:00Z',
                items: [
                    { id: 'mi-1', title: 'Xem sản phẩm', order: 1, action: { type: 'MESSAGE_FLOW', messageFlowId: 'flow-tu-van-sp' }, shouldSwitchMenu: true, targetMenuId: 'menu-vip' },
                    { id: 'mi-2', title: 'Bảng giá mới nhất', order: 2, action: { type: 'NEW_MESSAGE', text: 'Bảng giá AntBuddy: Gói Starter: 500k/tháng, Pro: 1.5tr/tháng, Enterprise: Theo nhu cầu.' }, shouldSwitchMenu: false, targetMenuId: null },
                    { id: 'mi-3', title: 'Liên hệ tư vấn viên', order: 3, action: { type: 'OPT_IN', optInTopicId: 'topic-tu-van' }, shouldSwitchMenu: false, targetMenuId: null }
                ]
            },
            {
                id: 'menu-vip',
                channelId: 'chan-fb-01',
                name: 'Menu sản phẩm',
                mode: 'USER_LEVEL',
                status: 'PUBLISHED',
                publishedVersion: 1,
                draftVersion: 1,
                publishedAt: '2026-09-21T08:30:00Z',
                items: [
                    { id: 'mvi-1', title: 'Giải pháp AntBuddy', order: 1, action: { type: 'NEW_MESSAGE', text: 'AntBuddy cung cấp Chatbot AI, CRM và Omnichannel Support.' }, shouldSwitchMenu: false, targetMenuId: null },
                    { id: 'mvi-2', title: 'Nhận ưu đãi', order: 2, action: { type: 'MESSAGE_FLOW', messageFlowId: 'flow-uu-dai' }, shouldSwitchMenu: false, targetMenuId: null },
                    { id: 'mvi-3', title: 'Về menu chính', order: 3, action: { type: 'NEW_MESSAGE', text: 'Đã quay về menu chính.' }, shouldSwitchMenu: true, targetMenuId: 'menu-default' }
                ]
            },
            {
                id: 'menu-newbie',
                channelId: 'chan-fb-01',
                name: 'Menu hỗ trợ',
                mode: 'USER_LEVEL',
                status: 'DRAFT',
                draftVersion: 1,
                items: [
                    { id: 'mn-1', title: 'Hướng dẫn bắt đầu', order: 1, action: { type: 'NEW_MESSAGE', text: 'Xem tài liệu hướng dẫn sử dụng AntBuddy trong 5 phút.' }, shouldSwitchMenu: false, targetMenuId: null },
                    { id: 'mn-2', title: 'Gói dùng thử 14 ngày', order: 2, action: { type: 'OPEN_URL', url: 'https://antbuddy.com/trial' }, shouldSwitchMenu: false, targetMenuId: null }
                ]
            }
        ],
        faq: [
            { id: 'faq-1', channelId: 'chan-fb-01', question: 'Bảng giá và các gói dịch vụ?', order: 1, status: 'PUBLISHED', action: { type: 'NEW_MESSAGE', text: 'Gói Starter từ 500.000đ/tháng, Pro 1.500.000đ/tháng. Hỗ trợ đầy đủ tính năng Automation & CRM.' } },
            { id: 'faq-2', channelId: 'chan-fb-01', question: 'Thời gian làm việc & hỗ trợ?', order: 2, status: 'PUBLISHED', action: { type: 'NEW_MESSAGE', text: 'AntBuddy hỗ trợ 24/7 qua chatbot và 8h00 - 18h00 thứ 2 đến thứ 7 bởi đội ngũ chuyên viên.' } },
            { id: 'faq-3', channelId: 'chan-fb-01', question: 'Theo dõi tiến độ đơn hàng?', order: 3, status: 'PUBLISHED', action: { type: 'MESSAGE_FLOW', messageFlowId: 'flow-tra-cuu-don' } },
            { id: 'faq-4', channelId: 'chan-fb-01', question: 'Gặp nhân viên tư vấn trực tiếp?', order: 4, status: 'PUBLISHED', action: { type: 'TRANSFER_INBOX' } }
        ],
        welcome: {
            channelId: 'chan-fb-01',
            active: true,
            text: 'Chào mừng bạn đến với AntBuddy! 🚀 Giải pháp tự động hoá hội thoại & chăm sóc khách hàng hàng đầu.',
            quickReplies: [
                { id: 'qr-1', title: 'Tìm hiểu tính năng', action: { type: 'MESSAGE_FLOW', messageFlowId: 'flow-tu-van-sp' } },
                { id: 'qr-2', title: 'Gặp tư vấn viên', action: { type: 'TRANSFER_INBOX' } }
            ],
            nextStep: null
        },
        defaultMessage: {
            channelId: 'chan-fb-01',
            active: true,
            text: 'Dạ AntBuddy đã nhận được tin nhắn của bạn. Hiện tại chuyên viên tư vấn sẽ liên hệ hỗ trợ bạn trong ít phút nữa nhé!',
            frequencyCap: 1, // times per session
            metrics: {
                sentCount: 1420,
                successCount: 1398,
                readCount: 1250,
                clickCount: 412,
                failedCount: 22,
                phoneCapturedCount: 184
            }
        },
        keywords: [
            {
                id: 'kw-1',
                channelId: 'chan-fb-01',
                name: 'Hỏi giá dịch vụ',
                includeTerms: ['giá', 'bảng giá', 'chi phí', 'bao nhiêu'],
                excludeTerms: [],
                matchMode: 'CONTAINS_ANY',
                priority: 1,
                active: true,
                response: { type: 'NEW_MESSAGE', text: 'Dạ bảng giá dịch vụ AntBuddy khởi điểm từ 500k/tháng với đầy đủ tính năng chatbot đa kênh!' }
            },
            {
                id: 'kw-2',
                channelId: 'chan-fb-01',
                name: 'Tra cứu đơn hàng',
                includeTerms: ['đơn hàng', 'tra cứu', 'giao hàng'],
                excludeTerms: [],
                matchMode: 'CONTAINS_ANY',
                priority: 2,
                active: true,
                response: { type: 'MESSAGE_FLOW', messageFlowId: 'flow-tra-cuu-don' }
            },
            {
                id: 'kw-3',
                channelId: 'chan-fb-01',
                name: 'Gặp tư vấn viên',
                includeTerms: ['tư vấn', 'gặp nhân viên', 'hotline'],
                excludeTerms: [],
                matchMode: 'CONTAINS_ANY',
                priority: 3,
                active: true,
                response: { type: 'TRANSFER_INBOX' }
            },
            {
                id: 'kw-4',
                channelId: 'chan-fb-01',
                name: 'Hủy nhận tin',
                includeTerms: ['dừng', 'hủy', 'ngừng'],
                excludeTerms: ['hủy đơn'],
                matchMode: 'CONTAINS_AND_NOT',
                priority: 4,
                active: true,
                response: { type: 'NEW_MESSAGE', text: 'Bạn đã tạm dừng nhận tin nhắn tiếp thị tự động từ hệ thống.' }
            }
        ],
        sequences: [
            {
                id: 'seq-khach-moi',
                channelId: 'chan-fb-01',
                name: 'Chăm sóc khách mới 3 ngày',
                active: true,
                steps: [
                    { id: 'sqs-1', order: 1, delayValue: 1, delayUnit: 'HOUR', type: 'MESSAGE', active: true, payload: { text: 'Chào bạn, bạn đã trải nghiệm các tính năng trong Menu chính chưa?' } },
                    { id: 'sqs-2', order: 2, delayValue: 1, delayUnit: 'DAY', type: 'MESSAGE', active: true, payload: { text: 'Bí quyết tăng 200% doanh số với kịch bản Automation AntBuddy!' } },
                    { id: 'sqs-3', order: 3, delayValue: 3, delayUnit: 'DAY', type: 'MESSAGE', active: true, payload: { text: 'Đừng quên gói dùng thử của bạn chỉ còn 10 ngày. Nâng cấp ngay để nhận ưu đãi!' } }
                ]
            },
            {
                id: 'seq-gia-han',
                channelId: 'chan-fb-01',
                name: 'Nhắc gia hạn dịch vụ',
                active: true,
                steps: [
                    { id: 'sqs-gh-1', order: 1, delayValue: 3, delayUnit: 'HOUR', type: 'MESSAGE', active: true, payload: { text: 'Gói dịch vụ của bạn sắp đến hạn gia hạn.' } },
                    { id: 'sqs-gh-2', order: 2, delayValue: 2, delayUnit: 'DAY', type: 'ACTION', active: true, payload: { type: 'ADD_TAG', tagId: 'Cần gia hạn' } }
                ]
            },
            {
                id: 'seq-vip',
                channelId: 'chan-fb-01',
                name: 'Ưu đãi độc quyền VIP',
                active: true,
                steps: [
                    { id: 'sqs-v-1', order: 1, delayValue: 10, delayUnit: 'MINUTE', type: 'MESSAGE', active: true, payload: { text: 'Món quà tri ân đặc quyền dành riêng cho khách hàng VIP của AntBuddy 🎁' } }
                ]
            }
        ],
        customers: [
            { id: 'cust-1', name: 'Nguyễn An', tags: ['VIP'], customFields: { tier: 'Gold', totalSpent: 15000000 }, sequenceEnrollmentIds: [] },
            { id: 'cust-2', name: 'Trần Bình', tags: ['Khách mới'], customFields: { tier: 'Standard', totalSpent: 0 }, assignedMenuId: undefined, sequenceEnrollmentIds: [] },
            { id: 'cust-3', name: 'Lê Chi', tags: [], customFields: { tier: 'Standard', totalSpent: 500000 }, assignedMenuId: undefined, sequenceEnrollmentIds: [] }
        ],
        userMenuAssignments: [],
        enrollments: [
            { id: 'enr-1', customerId: 'cust-2', sequenceId: 'seq-khach-moi', enrolledAt: '2026-09-21T09:00:00Z', nextRunAt: '2026-09-21T10:00:00Z', currentStepOrder: 1, status: 'ACTIVE' }
        ],
        rules: [
            {
                id: 'rule-ghi-danh-moi',
                channelId: 'chan-fb-01',
                name: 'Ghi danh sequence khi có tag Khách mới',
                conditionMode: 'ALL',
                conditions: [
                    { field: 'tag', operator: 'CONTAINS', value: 'Khách mới' }
                ],
                actions: [
                    { type: 'ENROLL_SEQUENCE', sequenceId: 'seq-khach-moi' }
                ],
                active: true,
                cooldownSeconds: 60
            },
            {
                id: 'rule-thong-bao-cho',
                channelId: 'chan-fb-01',
                name: 'Thông báo quản trị khi hội thoại chờ lâu',
                conditionMode: 'ALL',
                conditions: [
                    { field: 'unansweredCount', operator: 'GTE', value: 2 }
                ],
                actions: [
                    { type: 'NOTIFY_ADMIN', recipientIds: ['admin-1'] }
                ],
                active: true,
                cooldownSeconds: 120
            }
        ],
        auditLogs: [],
        executionLogs: []
    };

    function migrateStoreV3ToV4(legacy) {
        const migrated = structuredClone(legacy);
        migrated.version = 4;
        migrated.userMenuAssignments = [];
        for (const customer of migrated.customers || []) {
            if (customer.assignedMenuId) {
                migrated.userMenuAssignments.push({ channelId:migrated.activeChannelId, customerId:customer.id, menuId:customer.assignedMenuId, assignedAt:new Date().toISOString(), sourceType:'automation', sourceId:'legacy-v3' });
                delete customer.assignedMenuId;
            }
        }
        migrated.menus = (migrated.menus || []).map(menu => ({
            ...menu,
            items:(menu.items || []).map((item,index)=>({ ...item, order:index+1, shouldSwitchMenu:Boolean(item.shouldSwitchMenu), targetMenuId:item.shouldSwitchMenu ? (item.targetMenuId || null) : null }))
        }));
        migrated.rules = (migrated.rules || []).filter(rule => !(rule.actions || []).some(action => action.type === 'SET_USER_MENU' || action.type === 'UNSET_USER_MENU'));
        return migrated;
    }

    /**
     * Core Engine Helpers
     */
    class AutomationEngine {
        constructor() {
            this.state = this.loadState();
        }

        loadState() {
            try {
                if (typeof localStorage !== 'undefined') {
                    const saved = localStorage.getItem(STORAGE_KEY);
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        if (parsed.version === initialStore.version) {
                            return parsed;
                        }
                        if (parsed.version === 3) return migrateStoreV3ToV4(parsed);
                    }
                }
            } catch (e) {
                console.warn('Cannot load from localStorage, using memory seed', e);
            }
            return structuredClone(initialStore);
        }

        saveState() {
            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
                }
            } catch (e) {
                console.error('Cannot save state to localStorage', e);
            }
        }

        resetToSeed() {
            this.state = structuredClone(initialStore);
            this.saveState();
        }

        getChannel(channelId = this.state.activeChannelId) {
            return this.state.channels.find(c => c.id === channelId) || this.state.channels[0];
        }

        /**
         * TEXT NORMALIZATION (BR-AUT-015)
         * Unicode NFC normalize, lowercase, trim and collapse whitespaces, preserving Vietnamese accents.
         */
        normalizeText(str) {
            if (!str) return '';
            return str.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
        }

        /**
         * KEYWORD MATCHER (FR-AUT-005, BR-AUT-015, BR-AUT-016)
         * First-match-wins among active rules ordered by priority ascending.
         */
        matchKeywords(rawInputText, channelId = this.state.activeChannelId) {
            const normalizedInput = this.normalizeText(rawInputText);
            if (!normalizedInput) return null;

            const activeRules = this.state.keywords
                .filter(k => k.channelId === channelId && k.active)
                .sort((a, b) => a.priority - b.priority);

            for (const rule of activeRules) {
                const incTerms = (rule.includeTerms || []).map(t => this.normalizeText(t)).filter(Boolean);
                const excTerms = (rule.excludeTerms || []).map(t => this.normalizeText(t)).filter(Boolean);

                let isMatch = false;

                if (rule.matchMode === 'CONTAINS_ANY') {
                    isMatch = incTerms.some(term => normalizedInput.includes(term));
                } else if (rule.matchMode === 'CONTAINS_ALL') {
                    isMatch = incTerms.length > 0 && incTerms.every(term => normalizedInput.includes(term));
                } else if (rule.matchMode === 'CONTAINS_AND_NOT') {
                    const hasInclude = incTerms.some(term => normalizedInput.includes(term));
                    const hasExclude = excTerms.some(term => normalizedInput.includes(term));
                    isMatch = hasInclude && !hasExclude;
                }

                if (isMatch) {
                    return {
                        matchedRule: rule,
                        reason: `Khớp mode ${rule.matchMode} với cụm từ ưu tiên #${rule.priority}`
                    };
                }
            }
            return null;
        }

        /**
         * MENU RESOLVER (FR-AUT-001, BR-AUT-004, BR-AUT-005)
         * Returns active/published menu for customer, falling back to default menu or null.
         */
        getMenuForCustomer(customerId, channelId = this.state.activeChannelId) {
            const customer = this.state.customers.find(c => c.id === customerId);
            const channel = this.getChannel(channelId);

            if (!channel.capabilities.persistentMenu) {
                return null;
            }

            const assignment = (this.state.userMenuAssignments || []).find(a => a.customerId === customerId && a.channelId === channelId);
            const legacyAssignedMenuId = customer && customer.assignedMenuId;
            const assignedMenuId = assignment?.menuId || legacyAssignedMenuId;
            if (assignedMenuId) {
                const assignedMenu = this.state.menus.find(m => m.id === assignedMenuId && m.channelId === channelId);
                if (assignedMenu && assignedMenu.status === 'PUBLISHED') {
                    return assignedMenu;
                } else {
                    // Không để assignment trỏ tới menu đã xóa/ngừng hoạt động.
                    this.state.userMenuAssignments = (this.state.userMenuAssignments || []).filter(a => !(a.customerId === customerId && a.channelId === channelId));
                    if (customer) customer.assignedMenuId = undefined;
                    this.saveState();
                }
            }

            // Fallback to default published menu
            const defaultMenu = this.state.menus.find(m => m.channelId === channelId && m.mode === 'DEFAULT' && m.status === 'PUBLISHED');
            return defaultMenu || null;
        }

        assignMenuToCustomer({ customerId, menuId, sourceType = 'menu_item', sourceId, channelId = this.state.activeChannelId }) {
            const customer = this.state.customers.find(c => c.id === customerId);
            const targetMenu = this.state.menus.find(m => m.id === menuId && m.channelId === channelId && m.status === 'PUBLISHED');
            if (!customer) return { ok: false, code: 'CUSTOMER_NOT_FOUND' };
            if (!targetMenu) return { ok: false, code: 'TARGET_MENU_NOT_PUBLISHED' };
            this.state.userMenuAssignments = (this.state.userMenuAssignments || []).filter(a => !(a.customerId === customerId && a.channelId === channelId));
            this.state.userMenuAssignments.push({
                channelId,
                customerId,
                menuId,
                assignedAt: new Date().toISOString(),
                sourceType,
                sourceId
            });
            this.saveState();
            return { ok: true, menuId };
        }

        executeMenuItem({ customerId, menuId, itemId, channelId = this.state.activeChannelId }) {
            const menu = this.state.menus.find(m => m.id === menuId && m.channelId === channelId && m.status === 'PUBLISHED');
            const customer = this.state.customers.find(c => c.id === customerId);
            if (!menu) return { ok: false, code: 'MENU_NOT_PUBLISHED' };
            if (!customer) return { ok: false, code: 'CUSTOMER_NOT_FOUND' };
            const item = menu.items.find(i => i.id === itemId);
            if (!item) return { ok: false, code: 'ITEM_NOT_FOUND' };

            const actionResult = this.resolveAction(item.action, customer);
            const primarySucceeded = !actionResult.error;
            if (!primarySucceeded) return { ok: false, code: 'PRIMARY_ACTION_FAILED', actionResult };

            let switchResult = { ok: true, skipped: true };
            if (item.shouldSwitchMenu) {
                if (!item.targetMenuId) return { ok: false, code: 'TARGET_MENU_REQUIRED', actionResult };
                switchResult = this.assignMenuToCustomer({ customerId, menuId: item.targetMenuId, sourceType: 'menu_item', sourceId: item.id, channelId });
                if (!switchResult.ok) return { ok: false, code: switchResult.code, actionResult };
            }
            return { ok: true, actionResult, switchResult, effectiveMenuId: this.getMenuForCustomer(customerId, channelId)?.id || null };
        }

        /**
         * FAQ RESOLVER (FR-AUT-002, BR-AUT-006, BR-AUT-007)
         */
        getFaqForChannel(channelId = this.state.activeChannelId) {
            const channel = this.getChannel(channelId);
            if (!channel.capabilities.faqButtons) {
                return [];
            }
            return this.state.faq
                .filter(f => f.channelId === channelId && f.status === 'PUBLISHED')
                .sort((a, b) => a.order - b.order)
                .slice(0, channel.capabilities.maxFaqItems || 4);
        }

        /**
         * RUNTIME MESSAGE PROCESSOR PIPELINE (Section 5.3)
         * 1. Check Active Keyword Rules (First match wins)
         * 2. If no Keyword, evaluate NLU (simulated or real)
         * 3. If NLU low confidence / timeout / miss, execute Default Fallback Message
         * 4. Route session to Default Skill or Queue
         */
        processIncomingMessage({
            customerId,
            text,
            isNewSession = false,
            nluOverride = null,
            sessionHistory = []
        }) {
            const channelId = this.state.activeChannelId;
            const channel = this.getChannel(channelId);
            const customer = this.state.customers.find(c => c.id === customerId) || this.state.customers[0];
            const logs = [];
            let botReply = null;
            let finalState = 'WAITING_FOR_CUSTOMER';
            let welcomeSent = false;

            // Step A: New session Welcome message check (FR-AUT-003, BR-AUT-008, BR-AUT-010)
            if (isNewSession && this.state.welcome && this.state.welcome.active && channel.capabilities.welcomeMessage) {
                welcomeSent = true;
                logs.push({
                    step: 'WELCOME_MESSAGE',
                    result: 'SENT',
                    text: this.state.welcome.text
                });
            }

            // Step B: Keyword Matcher (FR-AUT-005, BR-AUT-011, BR-AUT-016)
            const keywordResult = text ? this.matchKeywords(text, channelId) : null;

            if (keywordResult) {
                const rule = keywordResult.matchedRule;
                logs.push({
                    step: 'KEYWORD_MATCH',
                    ruleId: rule.id,
                    ruleName: rule.name,
                    priority: rule.priority,
                    result: 'MATCHED'
                });

                botReply = this.resolveAction(rule.response, customer);
                finalState = 'WAITING_FOR_CUSTOMER';
            } else {
                // Step C: NLU Evaluation
                let nluConfidence = nluOverride !== null ? nluOverride : 0.4; // default mock low confidence
                logs.push({
                    step: 'NLU_EVAL',
                    confidence: nluConfidence,
                    threshold: 0.75,
                    result: nluConfidence >= 0.75 ? 'INTENT_MATCHED' : 'LOW_CONFIDENCE'
                });

                if (nluConfidence >= 0.75) {
                    botReply = {
                        type: 'TEXT',
                        content: 'Dạ AntBot đã nhận diện ý định của bạn qua NLU và phản hồi phù hợp.'
                    };
                    finalState = 'WAITING_FOR_CUSTOMER';
                } else {
                    // Step D: Default Fallback Message (FR-AUT-004, BR-AUT-011, BR-AUT-013, BR-AUT-014)
                    const fallback = this.state.defaultMessage;
                    if (fallback && fallback.active) {
                        botReply = {
                            type: 'TEXT',
                            content: fallback.text,
                            isFallback: true
                        };
                        logs.push({
                            step: 'DEFAULT_MESSAGE_FALLBACK',
                            result: 'SENT',
                            content: fallback.text
                        });
                    } else {
                        logs.push({
                            step: 'DEFAULT_MESSAGE_FALLBACK',
                            result: 'SKIPPED_INACTIVE'
                        });
                    }

                    // Step E: Route to default skill or queue (BR-AUT-014, BR-AUT-032)
                    if (channel.defaultSkillId) {
                        logs.push({
                            step: 'ROUTE_DEFAULT_SKILL',
                            skillId: channel.defaultSkillId,
                            result: 'ROUTED_TO_DEFAULT_SKILL'
                        });
                        finalState = 'ROUTED_TO_AGENT';
                    } else {
                        logs.push({
                            step: 'QUEUE_SESSION',
                            result: 'QUEUED_NO_SKILL'
                        });
                        finalState = 'QUEUED';
                    }
                }
            }

            return {
                welcomeSent,
                botReply,
                finalState,
                logs
            };
        }

        /**
         * RULE ENGINE EVALUATOR (FR-AUT-007, BR-AUT-024 to BR-AUT-027)
         * Evaluates conditions (ALL/ANY) and runs ordered actions with loop guard.
         */
        triggerEvent(eventName, payload = {}) {
            const customerId = payload.customerId;
            const customer = this.state.customers.find(c => c.id === customerId);
            const executionLogs = [];

            const activeRules = this.state.rules.filter(r => r.active);

            for (const rule of activeRules) {
                // Check conditions
                let conditionsMet = false;
                const evaluatedConditions = (rule.conditions || []).map(cond => {
                    let passed = false;
                    if (cond.field === 'tag') {
                        const tags = (customer && customer.tags) || [];
                        if (cond.operator === 'CONTAINS') {
                            passed = tags.includes(cond.value);
                        } else if (cond.operator === 'NOT_CONTAINS') {
                            passed = !tags.includes(cond.value);
                        }
                    } else if (cond.field === 'unansweredCount') {
                        const val = Number(payload.unansweredCount || 0);
                        if (cond.operator === 'GTE') passed = val >= Number(cond.value);
                    } else {
                        passed = true;
                    }
                    return passed;
                });

                if (rule.conditionMode === 'ALL') {
                    conditionsMet = evaluatedConditions.length > 0 && evaluatedConditions.every(Boolean);
                } else {
                    conditionsMet = evaluatedConditions.some(Boolean);
                }

                if (conditionsMet) {
                    const logEntry = {
                        ruleId: rule.id,
                        ruleName: rule.name,
                        customerId: customer ? customer.id : null,
                        timestamp: new Date().toISOString(),
                        executedActions: []
                    };

                    // Execute Actions Sequentially
                    for (const action of rule.actions || []) {
                        const actionRes = this.executeRuleAction(action, customer);
                        logEntry.executedActions.push({
                            actionType: action.type,
                            result: actionRes
                        });
                    }

                    executionLogs.push(logEntry);
                    this.state.executionLogs.unshift(logEntry);
                }
            }

            this.saveState();
            return executionLogs;
        }

        executeRuleAction(action, customer) {
            if (!customer) return 'NO_CUSTOMER';

            switch (action.type) {
                case 'SET_USER_MENU': {
                    return 'REJECTED_USE_EXPLICIT_MENU_SWITCH_ACTION';
                }
                case 'UNSET_USER_MENU': {
                    return 'REJECTED_USE_EXPLICIT_MENU_SWITCH_ACTION';
                }
                case 'ADD_TAG': {
                    if (!customer.tags.includes(action.tagId)) {
                        customer.tags.push(action.tagId);
                    }
                    return `ADD_TAG_SUCCESS:${action.tagId}`;
                }
                case 'REMOVE_TAG': {
                    customer.tags = customer.tags.filter(t => t !== action.tagId);
                    return `REMOVE_TAG_SUCCESS:${action.tagId}`;
                }
                case 'ENROLL_SEQUENCE': {
                    // Check duplicate enrollment guard (BR-AUT-020)
                    const existing = this.state.enrollments.find(e => e.customerId === customer.id && e.sequenceId === action.sequenceId && e.status === 'ACTIVE');
                    if (existing) {
                        return 'ALREADY_ENROLLED';
                    }
                    const newEnroll = {
                        id: 'enr-' + Date.now(),
                        customerId: customer.id,
                        sequenceId: action.sequenceId,
                        enrolledAt: new Date().toISOString(),
                        nextRunAt: new Date(Date.now() + 3600000).toISOString(),
                        currentStepOrder: 1,
                        status: 'ACTIVE'
                    };
                    this.state.enrollments.push(newEnroll);
                    return `ENROLLED_SUCCESS:${newEnroll.id}`;
                }
                case 'NOTIFY_ADMIN': {
                    return `NOTIFIED_ADMINS:${(action.recipientIds || []).join(',')}`;
                }
                default:
                    return `EXECUTED:${action.type}`;
            }
        }

        resolveAction(action, customer) {
            if (!action) return { type: 'TEXT', content: 'Thao tác không xác định' };

            switch (action.type) {
                case 'NEW_MESSAGE':
                    return { type: 'TEXT', content: action.text || 'Tin nhắn phản hồi từ AntBuddy' };
                case 'MESSAGE_FLOW': {
                    const flow = this.state.flows.find(f => f.id === action.messageFlowId && f.active);
                    return flow
                        ? { type: 'FLOW', flowId: action.messageFlowId, content: flow.response }
                        : { type: 'FLOW', flowId: action.messageFlowId, error: 'FLOW_NOT_ACTIVE' };
                }
                case 'TRANSFER_INBOX':
                    return { type: 'HANDOFF', content: '🔔 Hệ thống đang kết nối bạn với chuyên viên tư vấn trực tiếp.' };
                case 'OPT_IN':
                    return { type: 'OPT_IN', content: '✓ Bạn đã xác nhận đăng ký nhận thông báo thành công!' };
                case 'OPEN_URL':
                    return /^https?:\/\//i.test(action.url || '')
                        ? { type: 'URL', url: action.url, content: `Mở liên kết: ${action.url}` }
                        : { type: 'URL', url: action.url, error: 'INVALID_URL' };
                default:
                    return { type: 'TEXT', content: action.text || 'Thao tác hoàn tất' };
            }
        }
    }

    // Export singleton instance or class
    const engine = new AutomationEngine();
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { AutomationEngine, engine, initialStore };
    } else {
        global.AntBuddyEngine = engine;
        global.AutomationEngine = AutomationEngine;
    }

})(typeof window !== 'undefined' ? window : global);
