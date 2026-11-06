export declare const mobileConfirmSheetMeta: {
    readonly category: "mobile";
    readonly description: "A mobile confirmation sheet with neutral or destructive confirmation and pending state.";
    readonly maturity: "stable";
    readonly name: "MobileConfirmSheet";
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
        readonly name: "cancelLabel";
        readonly type: "ReactNode";
    }, {
        readonly name: "confirmLabel";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "primary";
        readonly name: "confirmTone";
        readonly type: "primary | danger";
    }, {
        readonly name: "pending";
        readonly type: "boolean";
    }, {
        readonly name: "onConfirm";
        readonly type: "() => void";
    }];
    readonly states: readonly ["closed", "open", "danger", "pending", "disabled", "narrow"];
    readonly tokens: readonly ["color.content.secondary", "space.2", "space.3"];
};
