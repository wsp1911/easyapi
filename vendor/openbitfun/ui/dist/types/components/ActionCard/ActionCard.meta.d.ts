export declare const actionCardMeta: {
    readonly category: "action";
    readonly description: "An actionable card with independent content and inline or floating glass sibling actions.";
    readonly maturity: "stable";
    readonly name: "ActionCard";
    readonly props: readonly [{
        readonly name: "body";
        readonly type: "ReactNode";
    }, {
        readonly name: "triggerClassName";
        readonly type: "string";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "[]";
        readonly name: "actions";
        readonly type: "readonly ActionCardAction[]";
    }, {
        readonly defaultValue: "inline";
        readonly name: "actionPlacement";
        readonly type: "inline | floating";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "sm | md";
    }, {
        readonly defaultValue: "false";
        readonly name: "selected";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "selected", "disabled"];
    readonly tokens: readonly ["color.actionCard.background", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.content.primary", "color.content.secondary", "color.border.default", "color.border.subtle", "color.surface.raised", "effect.blur.subtle", "color.focus.ring", "control.actionCard.smMinBlockSize", "control.actionCard.mdMinBlockSize", "control.actionCard.paddingBlock", "control.actionCard.paddingInline", "control.actionCard.gap", "control.actionCard.leadingSize", "control.actionCard.iconSize", "control.actionCard.contentGap", "control.actionCard.actionsGap", "control.actionCard.actionsPaddingInlineEnd", "control.actionCard.radius", "control.iconButton.standardSize", "control.iconButton.standardIconSize", "type.heading.section.fontSize", "type.body.sm.fontSize", "type.actionRow.lineHeight"];
};
