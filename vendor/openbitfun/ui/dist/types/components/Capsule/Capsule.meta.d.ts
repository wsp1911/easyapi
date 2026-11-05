export declare const capsuleMeta: {
    readonly category: "action";
    readonly description: "A capsule composition with a circular glass action that overlays the label or occupies reserved space inside its Button surface. Reserved content is centered at rest and shifts aside when the action appears, without changing layout; touch keeps the action available.";
    readonly maturity: "stable";
    readonly name: "Capsule";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "actionPlacement";
        readonly type: "overlay | reserved";
        readonly defaultValue: "overlay";
    }, {
        readonly name: "size";
        readonly type: "xs | sm | md | lg";
        readonly defaultValue: "sm";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "disabled"];
    readonly tokens: readonly ["control.button.xsHeight", "control.height.sm", "control.height.md", "control.height.lg", "control.iconButton.xsSize", "color.surface.raised", "color.border.subtle", "effect.blur.subtle", "radius.pill"];
};
