export declare const inputMeta: {
    readonly category: "form";
    readonly description: "A native text field with independent leading and trailing content slots.";
    readonly maturity: "stable";
    readonly name: "Input";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "placeholder";
        readonly type: "string";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "hideNativePasswordReveal";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "rounded";
        readonly name: "shape";
        readonly type: "rounded | pill";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "xs | sm | md | lg";
    }, {
        readonly defaultValue: "false";
        readonly name: "readOnly";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }];
    readonly states: readonly ["default", "filled", "hover", "focus-visible", "read-only", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.field.background", "color.field.placeholder", "opacity.iconArtwork", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderActive", "color.accent.default", "color.status.danger.border", "control.height.sm", "control.height.md", "control.height.lg", "control.button.xsHeight", "control.button.xsPaddingInline", "control.button.xsLeadingIconSize", "type.meta.fontSize", "type.label.md.fontSize", "radius.base", "radius.pill"];
};
