export declare const shimmerTextMeta: {
    readonly category: "primitive";
    readonly description: "A slow, softly feathered fade across activity text that keeps every glyph visible, with static fallbacks for reduced motion, high contrast and print.";
    readonly maturity: "stable";
    readonly name: "ShimmerText";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }];
    readonly states: readonly ["default", "static"];
    readonly tokens: readonly ["color.content.primary", "motion.duration.loop"];
};
