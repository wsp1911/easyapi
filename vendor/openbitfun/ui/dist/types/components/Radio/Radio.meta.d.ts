export declare const radioMeta: {
    readonly category: "form";
    readonly description: "A native radio control with label, description, invalid, and disabled states.";
    readonly maturity: "stable";
    readonly name: "Radio";
    readonly props: readonly [{
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly name: "readOnly";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "invalid";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "size";
        readonly type: "sm | md | lg";
        readonly defaultValue: "md";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "checked", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.field.background", "color.field.border", "color.accent.default", "color.focus.ring"];
};
