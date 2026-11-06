export declare const cardMeta: {
    readonly category: "primitive";
    readonly description: "A composable content surface with independent media, header, body, footer, spacing, clipping, and elevation contracts.";
    readonly maturity: "stable";
    readonly name: "Card";
    readonly props: readonly [{
        readonly defaultValue: "subtle";
        readonly name: "appearance";
        readonly type: "raised | subtle | neutral";
    }, {
        readonly defaultValue: "none";
        readonly name: "padding";
        readonly type: "none | sm | md";
    }, {
        readonly defaultValue: "none";
        readonly name: "gap";
        readonly type: "none | sm | md | lg";
    }, {
        readonly defaultValue: "md";
        readonly name: "radius";
        readonly type: "none | sm | md | lg";
    }, {
        readonly defaultValue: "false";
        readonly name: "clip";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "start";
        readonly name: "CardHeader.contentAlign";
        readonly type: "start | center | end";
    }, {
        readonly defaultValue: "stretch";
        readonly name: "CardBody.align";
        readonly type: "start | center | end | stretch";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["raised", "subtle", "media"];
    readonly tokens: readonly ["color.surface.raised", "color.surface.subtle", "color.surface.canvas", "color.action.neutral.surface", "color.content.primary", "color.content.secondary", "color.border.subtle", "shadow.overlay", "layout.card.paddingSm", "layout.card.paddingMd", "layout.card.gapSm", "layout.card.gapMd", "layout.card.gapLg", "layout.card.radiusSm", "layout.card.radiusMd", "layout.card.radiusLg", "layout.card.headerGap", "layout.card.titleDescriptionGap", "layout.card.footerGap", "layout.card.mediaMinBlockSize", "type.heading.card.fontSize", "type.body.sm.fontSize"];
};
