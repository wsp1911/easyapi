export declare const mobileRadioGroupMeta: {
    readonly category: "mobile";
    readonly description: "A touch-sized single-choice list whose options share one input name for native keyboard navigation.";
    readonly maturity: "stable";
    readonly name: "MobileRadioGroup";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly MobileRadioOption[]";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly defaultValue: "plain";
        readonly name: "appearance";
        readonly type: "\"plain\" | \"surface\"";
    }];
    readonly states: readonly ["default", "selected", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.border.subtle", "color.content.disabled", "color.content.inverse", "color.content.muted", "color.content.primary", "color.content.secondary", "color.control.highlight.background", "color.field.background", "color.field.border", "color.focus.ring", "radius.md", "shadow.xs", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
};
