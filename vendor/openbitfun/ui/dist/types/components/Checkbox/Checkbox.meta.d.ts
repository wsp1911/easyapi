export declare const checkboxMeta: {
    readonly category: "form";
    readonly description: "A native checkbox with indeterminate, invalid, label, and description states.";
    readonly maturity: "stable";
    readonly name: "Checkbox";
    readonly props: readonly [{
        readonly name: "appearance";
        readonly type: "custom | native";
        readonly defaultValue: "custom";
    }, {
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly name: "readOnly";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "indeterminate";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "invalid";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "size";
        readonly type: "sm | md | lg";
        readonly defaultValue: "md";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "checked", "indeterminate", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.field.background", "color.field.border", "color.control.highlight.background", "color.control.switch.thumb", "color.focus.ring"];
};
