export declare const ambientToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A low-attention tool trace that stays glanceable in the conversation and can reveal supporting detail.";
    readonly maturity: "stable";
    readonly name: "AmbientToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "header";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "requiresConfirmation";
        readonly type: "boolean";
    }, {
        readonly name: "expandedContent";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "inset";
        readonly name: "expandedContentLayout";
        readonly type: "'inset' | 'flush'";
    }, {
        readonly name: "onClick";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error", "confirmation"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.tertiary", "color.action.neutral.surface", "color.status.danger.content", "color.status.warning.emphasis", "control.height.md", "control.toolCard.ambientRowMinBlockSize", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "font.family.sans", "font.size.sm", "font.size.xl", "font.weight.medium", "font.weight.regular", "radius.md", "radius.sm", "shadow.xs"];
};
