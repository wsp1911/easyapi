export declare const mobileSheetMeta: {
    readonly category: "mobile";
    readonly description: "A safe-area-aware mobile bottom sheet with shared dismissal, focus, and scroll-lock behavior.";
    readonly maturity: "stable";
    readonly name: "MobileSheet";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "footer";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "true";
        readonly name: "showHandle";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: MobileSheetCloseReason) => void";
    }, {
        readonly name: "headerAction";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["closed", "open", "exiting", "narrow", "wide"];
    readonly tokens: readonly ["color.border.strong", "color.border.subtle", "color.content.primary", "color.surface.panel", "radius.2xl", "radius.pill", "shadow.overlay", "space.2", "space.3", "space.4", "space.12"];
};
