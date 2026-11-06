export declare const numberBadgeMeta: {
    readonly category: "primitive";
    readonly description: "A compact numeric marker with a 24px filled surface and caller-owned value. Long values grow without clipping.";
    readonly maturity: "stable";
    readonly name: "NumberBadge";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "ReactNode";
    }, {
        readonly name: "aria-label";
        readonly type: "string";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["space.1", "space.6", "type.meta.fontSize", "radius.pill", "color.action.neutral.content", "color.numberBadge.background"];
};
