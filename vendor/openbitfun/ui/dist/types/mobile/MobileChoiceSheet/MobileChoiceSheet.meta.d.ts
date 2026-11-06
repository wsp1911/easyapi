export declare const mobileChoiceSheetMeta: {
    readonly category: "mobile";
    readonly description: "A responsive bottom-sheet selector for short, mutually exclusive mobile choices.";
    readonly maturity: "stable";
    readonly name: "MobileChoiceSheet";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "options";
        readonly type: "readonly MobileChoiceSheetOption[]";
    }, {
        readonly name: "emptyContent";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "surface";
        readonly name: "optionAppearance";
        readonly type: "surface | plain";
    }, {
        readonly name: "selectedValue";
        readonly type: "string";
    }, {
        readonly name: "cancelLabel";
        readonly type: "ReactNode";
    }, {
        readonly name: "onSelect";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: MobileSheetCloseReason) => void";
    }];
    readonly states: readonly ["closed", "open", "selected", "disabled", "narrow", "wide"];
    readonly tokens: readonly ["color.content.secondary", "space.1", "space.2"];
};
