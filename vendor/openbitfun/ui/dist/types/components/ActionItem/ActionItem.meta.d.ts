export declare const actionItemMeta: {
    readonly category: "action";
    readonly description: "A native button row with independent leading, shortcut, and sibling action areas.";
    readonly maturity: "stable";
    readonly name: "ActionItem";
    readonly props: readonly [{
        readonly name: "actionContent";
        readonly type: "ReactNode";
    }, {
        readonly name: "triggerClassName";
        readonly type: "string";
    }, {
        readonly defaultValue: "overflow";
        readonly name: "labelBehavior";
        readonly type: "overflow | static";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "reserveLeadingSpace";
        readonly type: "boolean";
    }, {
        readonly name: "metadata";
        readonly type: "ReactNode";
    }, {
        readonly name: "shortcut";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "[]";
        readonly name: "actions";
        readonly type: "readonly ActionItemAction[]";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "neutral | danger";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled", "danger"];
    readonly tokens: readonly ["opacity.iconArtwork", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfacePressed", "color.content.muted", "color.focus.ring", "color.status.danger.content", "color.status.danger.surface", "control.height.sm", "type.label.md.fontSize", "type.actionRow.lineHeight", "color.action.neutral.surfaceHover", "type.label.selected.fontWeight", "type.meta.fontSize", "radius.base"];
};
