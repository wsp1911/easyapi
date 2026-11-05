export declare const mobileLinkMeta: {
    readonly category: "mobile";
    readonly description: "A touch-aware mobile link with consistent inline and surfaced focus treatment.";
    readonly maturity: "stable";
    readonly name: "MobileLink";
    readonly props: readonly [{
        readonly defaultValue: "inline";
        readonly name: "appearance";
        readonly type: "\"inline\" | \"surface\"";
    }, {
        readonly name: "href";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible"];
    readonly tokens: readonly ["color.accent.default", "color.accent.hover", "color.focus.ring", "color.surface.panel", "radius.sm", "radius.pill", "shadow.xs"];
};
