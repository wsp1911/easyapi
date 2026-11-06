export declare const mobileSectionMeta: {
    readonly category: "mobile";
    readonly description: "A mobile content section with optional heading, description, and action.";
    readonly maturity: "stable";
    readonly name: "MobileSection";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["content-only", "with-heading", "with-action"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "space.1", "space.2", "space.3"];
};
