export declare const mobileActionSheetMeta: {
    readonly category: "mobile";
    readonly description: "A dismissible mobile sheet for neutral and destructive action lists.";
    readonly maturity: "stable";
    readonly name: "MobileActionSheet";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "actions";
        readonly type: "readonly MobileActionSheetItem[]";
    }, {
        readonly name: "cancelLabel";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "true";
        readonly name: "closeOnAction";
        readonly type: "boolean";
    }, {
        readonly name: "onAction";
        readonly type: "(id: string) => void";
    }];
    readonly states: readonly ["closed", "open", "danger", "disabled", "narrow", "wide"];
    readonly tokens: readonly ["color.content.secondary", "space.1"];
};
