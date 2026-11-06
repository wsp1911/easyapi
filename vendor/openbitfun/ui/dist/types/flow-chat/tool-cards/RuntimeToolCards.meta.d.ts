export declare const listModelsToolCardMeta: {
    readonly category: "flow-chat";
    readonly name: "ListModelsToolCard";
    readonly maturity: "stable";
    readonly description: "An ambient model discovery card with provider, model name, configuration ID, query and empty-result details.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "error";
        readonly type: "ReactNode";
    }, {
        readonly name: "models";
        readonly type: "readonly ListModelsToolCardModel[]";
    }, {
        readonly name: "query";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "space.1", "space.2", "space.3", "space.4", "type.body.sm.fontSize", "type.flow.code.fontFamily"];
};
export declare const controlHubToolCardMeta: {
    readonly category: "flow-chat";
    readonly name: "ControlHubToolCard";
    readonly maturity: "stable";
    readonly description: "An action-aware browser, terminal and capability card with structured targets, results and recoverable failure details.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "error";
        readonly type: "ReactNode";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "domain";
        readonly type: "\"browser\" | \"terminal\" | \"meta\" | \"unknown\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly ControlHubToolCardRecord[]";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "space.1", "space.2", "space.3", "space.4", "type.body.sm.fontSize", "type.flow.code.fontFamily"];
};
