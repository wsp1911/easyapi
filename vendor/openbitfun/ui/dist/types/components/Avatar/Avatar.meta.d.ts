export declare const avatarMeta: {
    readonly category: "primitive";
    readonly description: "A compact image, icon, or text identity with grouped overflow composition.";
    readonly maturity: "stable";
    readonly name: "Avatar";
    readonly props: readonly [{
        readonly name: "src";
        readonly type: "string";
    }, {
        readonly name: "size";
        readonly type: "sm | md | lg";
        readonly defaultValue: "md";
    }, {
        readonly name: "shape";
        readonly type: "circle | square";
        readonly defaultValue: "circle";
    }];
    readonly states: readonly ["image", "fallback", "grouped"];
    readonly tokens: readonly ["color.content.secondary", "color.surface.subtle", "color.field.border", "control.height.sm", "control.height.md", "control.height.lg", "radius.base", "radius.pill"];
};
