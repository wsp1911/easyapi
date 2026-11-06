export declare const selectMeta: {
    readonly category: "form";
    readonly description: "A select-only combobox whose expanded header and grouped options share one themed surface, with typed values, native form participation, and keyboard navigation.";
    readonly maturity: "stable";
    readonly name: "Select";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly SelectOption[] (supports tooltip, testId and data-* attributes)";
    }, {
        readonly name: "value";
        readonly type: "SelectValue";
    }, {
        readonly name: "defaultValue";
        readonly type: "SelectValue";
    }, {
        readonly name: "placeholder";
        readonly type: "string";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }, {
        readonly defaultValue: "bottom";
        readonly name: "placement";
        readonly type: "top | bottom";
    }, {
        readonly defaultValue: "full";
        readonly name: "width";
        readonly type: "full | content";
    }, {
        readonly defaultValue: "trigger";
        readonly name: "popupWidth";
        readonly type: "trigger | content";
    }, {
        readonly name: "open / defaultOpen";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: boolean) => void";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: SelectValue) => void";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "open", "invalid", "disabled"];
    readonly tokens: readonly ["color.field.background", "color.field.placeholder", "opacity.iconArtwork", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderFocus", "color.content.primary", "color.content.muted", "color.content.disabled", "color.control.highlight.background", "color.selection.surface", "color.surface.panel", "color.border.subtle", "color.action.neutral.content", "color.action.neutral.surface", "color.action.neutral.surfacePressed", "color.status.danger.border", "color.status.danger.surface", "color.focus.ring", "control.height.sm", "control.height.md", "control.height.lg", "control.select.paddingInline", "control.select.leadingInset", "control.select.trailingInset", "control.select.contentGap", "control.select.indicatorSize", "control.select.radius", "overlay.menu.inlineSize", "overlay.menu.maxBlockSize", "overlay.menu.surfacePadding", "overlay.menu.surfaceRadius", "overlay.menu.rowGap", "overlay.menu.sectionGap", "overlay.menu.headingHeight", "overlay.menu.headingPaddingInline", "overlay.menu.itemHeight", "overlay.menu.itemPaddingInline", "overlay.menu.itemGap", "overlay.menu.itemRadius", "overlay.menu.itemIconSize", "shadow.menu", "type.label.md.fontSize"];
};
