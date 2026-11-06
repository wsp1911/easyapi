export declare const numberInputMeta: {
    readonly category: "form";
    readonly description: "A numeric text field with clamping, keyboard stepping, optional units, and step controls.";
    readonly maturity: "stable";
    readonly name: "NumberInput";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "number";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: number) => void";
    }, {
        readonly name: "min";
        readonly type: "number";
    }, {
        readonly name: "max";
        readonly type: "number";
    }, {
        readonly name: "step";
        readonly type: "number";
        readonly defaultValue: "1";
    }, {
        readonly name: "unit";
        readonly type: "string";
    }, {
        readonly name: "variant";
        readonly type: "default | compact | stepper";
        readonly defaultValue: "default";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.field.background", "color.field.border", "color.field.borderFocus", "control.height.sm", "control.height.md", "control.height.lg"];
};
