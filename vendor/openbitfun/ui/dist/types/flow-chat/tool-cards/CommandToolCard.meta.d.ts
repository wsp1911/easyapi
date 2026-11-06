export declare const commandToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A FlowChat command card with ambient or prominent presentation, a continuous expanded command/output surface, result status, metadata, and capability-driven actions.";
    readonly maturity: "stable";
    readonly name: "CommandToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "prominent";
        readonly name: "attention";
        readonly type: "ambient | prominent";
    }, {
        readonly name: "command";
        readonly type: "string | null";
    }, {
        readonly name: "interaction";
        readonly type: "ToolCardInteraction";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "output";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "fixed";
        readonly name: "outputSizing";
        readonly type: "content | fixed";
    }, {
        readonly defaultValue: "false";
        readonly name: "reserveOutput";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "reserveFooter";
        readonly type: "boolean";
    }, {
        readonly name: "footerItems";
        readonly type: "readonly CommandToolCardFooterItem[]";
    }, {
        readonly name: "copyAction";
        readonly type: "CommandToolCardCopyAction";
    }, {
        readonly name: "statusLabel";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "statusTone";
        readonly type: "danger | neutral | success | warning";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error", "confirmation"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "color.action.neutral.surface", "color.border.subtle", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "color.status.success.content", "color.status.success.emphasis", "color.status.warning.content", "color.surface.canvas", "color.surface.raised", "font.family.sans", "font.size.sm", "font.weight.regular", "radius.sm", "radius.lg", "type.flow.code.fontFamily", "type.flow.code.fontSize"];
};
