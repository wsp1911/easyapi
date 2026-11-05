export declare const mobileListRowMeta: {
    readonly category: "mobile";
    readonly description: "A responsive touch row for mobile navigation and selection lists with semantic content slots.";
    readonly maturity: "stable";
    readonly name: "MobileListRow";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "supportingText";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "plain";
        readonly name: "appearance";
        readonly type: "plain | surface";
    }, {
        readonly defaultValue: "false";
        readonly name: "selected";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "neutral | danger";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "selected", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.border.strong", "color.border.subtle", "color.content.disabled", "color.content.muted", "color.content.primary", "color.content.secondary", "color.status.danger.content", "color.focus.ring", "color.surface.panel", "color.surface.tertiary", "radius.md", "shadow.xs", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
};
