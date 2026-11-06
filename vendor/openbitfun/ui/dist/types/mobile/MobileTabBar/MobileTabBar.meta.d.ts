export declare const mobileTabBarMeta: {
    readonly category: "mobile";
    readonly description: "The bottom destination bar: equal-width items, a filled selection pill, and safe-area padding.";
    readonly maturity: "stable";
    readonly name: "MobileTabBar";
    readonly props: readonly [{
        readonly name: "items";
        readonly type: "readonly MobileTabBarItem[]";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly defaultValue: "surface";
        readonly name: "appearance";
        readonly type: "\"surface\" | \"plain\"";
    }, {
        readonly defaultValue: "true";
        readonly name: "safeArea";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "selected", "hover", "active", "focus-visible", "disabled", "safe-area"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.content.disabled", "color.content.primary", "color.content.secondary", "color.focus.ring", "color.selection.surface", "color.surface.panel", "radius.md", "radius.pill", "space.1", "space.2", "type.label.md.fontWeight", "type.label.sm.fontSize"];
};
