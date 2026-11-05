export declare const mobileBannerMeta: {
    readonly category: "mobile";
    readonly description: "An inline mobile status banner with semantic tone and optional action.";
    readonly maturity: "stable";
    readonly name: "MobileBanner";
    readonly props: readonly [{
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "\"neutral\" | \"info\" | \"warning\" | \"danger\"";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["neutral", "info", "warning", "danger"];
    readonly tokens: readonly ["color.surface.subtle", "color.status.info.surface", "color.status.warning.surface", "color.status.danger.surface", "radius.md", "space.3"];
};
