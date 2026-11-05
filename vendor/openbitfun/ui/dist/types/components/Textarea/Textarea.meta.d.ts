export declare const textareaMeta: {
    readonly category: "form";
    readonly description: "A multiline native text field with IME safety, support text, count, and auto-resize behavior.";
    readonly maturity: "stable";
    readonly name: "Textarea";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly name: "hint";
        readonly type: "string";
    }, {
        readonly name: "invalid";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "autoResize";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "showCount";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.content.requiredIndicator", "color.field.background", "color.field.border", "color.field.borderFocus", "color.status.danger.border", "color.status.danger.content", "type.label.md.fontSize", "type.body.sm.fontSize", "type.support.fontSize", "type.code.md.fontSize"];
};
