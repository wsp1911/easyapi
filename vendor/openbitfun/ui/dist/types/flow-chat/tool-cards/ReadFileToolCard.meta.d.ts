export declare const readFileToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A concrete ambient FlowChat card for read-file progress, permission, and completion summaries.";
    readonly maturity: "stable";
    readonly name: "ReadFileToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "content";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "interactive";
        readonly type: "boolean";
    }, {
        readonly name: "onOpen";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm"];
};
