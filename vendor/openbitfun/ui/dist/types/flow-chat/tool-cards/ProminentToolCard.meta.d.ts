export declare const prominentToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An attention-worthy tool result with a stable summary region, hover-revealed actions, and controlled detail disclosure.";
    readonly maturity: "stable";
    readonly name: "ProminentToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "expandedContent";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "inset";
        readonly name: "expandedContentLayout";
        readonly type: "'inset' | 'flush'";
    }, {
        readonly name: "errorContent";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "allowExpandedWhenFailed";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "requiresConfirmation";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error", "confirmation"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "color.action.neutral.surface", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.panel", "color.border.default", "color.border.strong", "color.border.subtle", "color.focus.ring", "color.status.danger.content", "color.status.success.content", "color.status.warning.border", "color.status.warning.surface", "control.height.sm", "font.family.sans", "font.size.base", "font.size.base", "font.size.lg", "font.size.sm", "font.size.xl", "font.weight.regular", "font.weight.semibold", "radius.md", "radius.sm", "shadow.xs", "shadow.sm"];
};
