export declare const mobileTextareaMeta: {
    readonly category: "mobile";
    readonly description: "A touch-friendly multiline text field for expanded mobile composition and forms.";
    readonly maturity: "stable";
    readonly name: "MobileTextarea";
    readonly props: readonly [{
        readonly name: "placeholder";
        readonly type: "string";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "focus-visible", "invalid", "disabled"];
    readonly tokens: readonly ["color.field.background", "color.field.border", "color.field.border.focus", "color.status.danger.border", "radius.xl", "shadow.xs", "space.3"];
};
