export declare const mobileButtonMeta: {
    readonly category: "mobile";
    readonly description: "A touch-sized mobile text button with semantic appearances, slots, and loading state.";
    readonly maturity: "stable";
    readonly name: "MobileButton";
    readonly props: readonly [{
        readonly defaultValue: "secondary";
        readonly name: "appearance";
        readonly type: "\"primary\" | \"secondary\" | \"plain\" | \"danger\"";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "\"sm\" | \"md\" | \"lg\"";
    }, {
        readonly defaultValue: "false";
        readonly name: "block";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled", "loading"];
    readonly tokens: readonly ["color.action.primary.background", "color.action.neutral.surface", "color.status.danger.surface", "radius.pill", "shadow.xs", "space.2", "space.4"];
};
