export declare const mobileTextFieldMeta: {
    readonly category: "mobile";
    readonly description: "A mobile search and text-entry field with touch geometry and optional leading or trailing content.";
    readonly maturity: "stable";
    readonly name: "MobileTextField";
    readonly props: readonly [{
        readonly defaultValue: "soft";
        readonly name: "appearance";
        readonly type: "soft | surface";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "focus-within", "invalid", "disabled"];
    readonly tokens: readonly ["color.accent.default", "color.content.disabled", "color.content.muted", "color.content.primary", "color.content.secondary", "color.field.background", "color.field.border", "color.field.borderFocus", "color.focus.ring", "color.status.danger.border", "color.surface.tertiary", "radius.md", "shadow.xs", "space.2", "space.4", "type.body.md.fontSize"];
};
