export declare const mobileStatusMeta: {
    readonly category: "mobile";
    readonly description: "A consistent mobile loading, empty, or error state with optional recovery action.";
    readonly maturity: "stable";
    readonly name: "MobileStatus";
    readonly props: readonly [{
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "\"neutral\" | \"info\" | \"danger\"";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["empty", "loading", "info", "danger"];
    readonly tokens: readonly ["color.content.secondary", "color.content.muted", "color.status.info.content", "color.status.danger.content", "space.2", "space.6"];
};
