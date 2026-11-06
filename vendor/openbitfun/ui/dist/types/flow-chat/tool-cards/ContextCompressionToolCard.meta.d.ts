export declare const contextCompressionToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A concrete prominent FlowChat card with a compact context-length and compression-ratio result.";
    readonly maturity: "stable";
    readonly name: "ContextCompressionToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "processingText";
        readonly type: "ReactNode";
    }, {
        readonly name: "error";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "loading", "error"];
    readonly tokens: readonly ["color.content.secondary", "color.content.muted", "color.status.danger.content", "font.family.sans", "font.size.sm"];
};
