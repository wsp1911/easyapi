export declare const mobileFileButtonMeta: {
    readonly category: "mobile";
    readonly description: "An accessible touch-sized file picker presented as a mobile action button.";
    readonly maturity: "stable";
    readonly name: "MobileFileButton";
    readonly props: readonly [{
        readonly name: "accept";
        readonly type: "string";
    }, {
        readonly defaultValue: "false";
        readonly name: "multiple";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "focus-visible", "disabled", "loading"];
    readonly tokens: readonly ["color.action.neutral.border", "color.surface.panel", "color.focus.ring", "radius.pill", "shadow.xs", "space.2"];
};
