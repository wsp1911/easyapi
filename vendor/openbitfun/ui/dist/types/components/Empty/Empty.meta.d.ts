export declare const emptyMeta: {
    readonly category: "feedback";
    readonly description: "Explains an empty result or unavailable collection with optional identity and actions.";
    readonly maturity: "stable";
    readonly name: "Empty";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }, {
        readonly name: "actions";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "md";
        readonly name: "imageSize";
        readonly type: "sm | md | lg";
    }];
    readonly states: readonly ["default", "with-title", "with-actions"];
    readonly tokens: readonly ["component.empty.media", "color.content.muted", "layout.empty.gap", "layout.empty.paddingBlock", "layout.empty.paddingInline", "layout.empty.mediaSizeSm", "layout.empty.mediaSizeMd", "layout.empty.mediaSizeLg", "layout.empty.iconSizeSm", "layout.empty.iconSizeMd", "layout.empty.iconSizeLg", "type.label.md.fontSize", "type.body.sm.fontSize"];
};
