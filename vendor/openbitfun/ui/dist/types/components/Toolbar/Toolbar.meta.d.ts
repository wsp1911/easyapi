export declare const toolbarMeta: {
    readonly category: "navigation";
    readonly description: "A responsive top-level bar with independent leading, centered, and trailing composition regions.";
    readonly maturity: "stable";
    readonly name: "Toolbar";
    readonly props: readonly [{
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "center";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "sm | md";
    }, {
        readonly defaultValue: "true";
        readonly name: "bordered";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "visible";
        readonly name: "leadingOverflow";
        readonly type: "visible | scroll";
    }];
    readonly states: readonly ["default", "with-center", "overflow"];
    readonly tokens: readonly ["color.surface.raised", "color.content.primary", "color.content.secondary", "color.border.subtle", "color.action.neutral.surface", "layout.toolbar.smHeight", "layout.toolbar.mdHeight", "layout.toolbar.contentGap", "layout.toolbar.smPaddingBlock", "layout.toolbar.smPaddingInline", "layout.toolbar.mdPaddingBlockStart", "layout.toolbar.mdPaddingBlockEnd", "layout.toolbar.mdPaddingInlineStart", "layout.toolbar.mdPaddingInlineEnd", "layout.toolbar.groupGapSm", "layout.toolbar.groupGapMd", "layout.toolbar.badgeSize", "type.meta.fontSize", "layout.toolbar.separatorBlockSize", "layout.toolbar.overflowFadeExtent", "radius.pill"];
};
