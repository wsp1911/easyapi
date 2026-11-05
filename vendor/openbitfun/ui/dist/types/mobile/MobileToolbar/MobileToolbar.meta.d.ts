export declare const mobileToolbarMeta: {
    readonly category: "mobile";
    readonly description: "A bottom action bar with leading, middle, and trailing slots that keeps clear of the home indicator.";
    readonly maturity: "stable";
    readonly name: "MobileToolbar";
    readonly props: readonly [{
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
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
    }, {
        readonly defaultValue: "false";
        readonly name: "sticky";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "plain", "sticky", "safe-area"];
    readonly tokens: readonly ["color.surface.panel", "shadow.sm", "space.2", "space.3", "space.4"];
};
