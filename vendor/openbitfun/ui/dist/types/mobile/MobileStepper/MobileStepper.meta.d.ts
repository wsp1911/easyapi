export declare const mobileStepperMeta: {
    readonly category: "mobile";
    readonly description: "A touch-sized numeric row whose bounds disable the decrement and increment buttons.";
    readonly maturity: "stable";
    readonly name: "MobileStepper";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
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
        readonly defaultValue: "1";
        readonly name: "step";
        readonly type: "number";
    }, {
        readonly name: "unit";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly name: "decrementLabel";
        readonly type: "string";
    }, {
        readonly name: "incrementLabel";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-within", "invalid", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.content.disabled", "color.content.muted", "color.content.primary", "color.content.secondary", "color.field.background", "color.field.border", "color.field.borderFocus", "color.focus.ring", "color.status.danger.border", "color.status.danger.content", "radius.md", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.sm.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
};
