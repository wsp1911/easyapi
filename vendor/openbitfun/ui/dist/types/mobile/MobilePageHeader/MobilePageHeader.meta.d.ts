export declare const mobilePageHeaderMeta: {
    readonly category: "mobile";
    readonly description: "A safe, responsive mobile page header with balanced leading and trailing actions.";
    readonly maturity: "stable";
    readonly name: "MobilePageHeader";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "subtitle";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "actions";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "centered";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "centered", "with-subtitle"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.surface.canvas", "space.2", "space.4"];
};
