export declare const mobileScrimMeta: {
    readonly category: "mobile";
    readonly description: "A dismissible mobile overlay scrim with consistent focus and motion behavior.";
    readonly maturity: "stable";
    readonly name: "MobileScrim";
    readonly props: readonly [{
        readonly name: "aria-label";
        readonly type: "string";
    }, {
        readonly defaultValue: "true";
        readonly name: "visible";
        readonly type: "boolean";
    }];
    readonly states: readonly ["visible", "hidden", "focus-visible"];
    readonly tokens: readonly ["color.overlay.scrim", "color.focus.ring", "motion.duration.base"];
};
