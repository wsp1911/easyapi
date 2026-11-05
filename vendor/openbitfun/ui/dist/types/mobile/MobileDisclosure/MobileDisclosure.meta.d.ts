export declare const mobileDisclosureMeta: {
    readonly category: "mobile";
    readonly description: "A compact disclosure row for thinking, tool groups, and advanced options.";
    readonly maturity: "stable";
    readonly name: "MobileDisclosure";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "metadata";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["closed", "open", "hover", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.focus.ring", "space.2", "space.3"];
};
