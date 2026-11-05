export declare const rollingTextMeta: {
    readonly category: "primitive";
    readonly description: "A single-line vertical text replacement with explicit identity, interruption handling, accessible text, and reduced-motion support.";
    readonly maturity: "stable";
    readonly name: "RollingText";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "string | number";
    }, {
        readonly defaultValue: "children";
        readonly name: "transitionKey";
        readonly type: "string | number";
    }, {
        readonly defaultValue: "marquee";
        readonly name: "behavior";
        readonly type: "fade | marquee";
    }, {
        readonly name: "marqueeActive";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "replacing"];
    readonly tokens: readonly ["motion.duration.contentSwap", "motion.easing.smooth", "layout.overflowText.fadeExtent"];
};
