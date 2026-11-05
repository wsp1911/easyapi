export declare const mobileComposerMeta: {
    readonly category: "mobile";
    readonly description: "A compact-to-expanded mobile composer surface with semantic editor and action slots.";
    readonly maturity: "stable";
    readonly name: "MobileComposer";
    readonly props: readonly [{
        readonly defaultValue: "false";
        readonly name: "expanded";
        readonly type: "boolean";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "startActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "endActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "onActivate";
        readonly type: "() => void";
    }];
    readonly states: readonly ["collapsed", "expanded", "active", "focus-visible"];
    readonly tokens: readonly ["color.border.subtle", "color.content.primary", "color.focus.ring", "color.surface.panel", "radius.pill", "radius.xl", "shadow.base", "shadow.lg", "space.1", "space.2"];
};
