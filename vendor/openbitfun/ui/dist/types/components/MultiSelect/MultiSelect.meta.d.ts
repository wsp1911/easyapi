export declare const multiSelectMeta: {
    readonly category: "form";
    readonly description: "A searchable multi-value selector with an embedded search header and structured options on one anchored surface, plus tags, select-all, and explicit value creation.";
    readonly maturity: "stable";
    readonly name: "MultiSelect";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly ComboboxOption[]";
    }, {
        readonly name: "value";
        readonly type: "readonly ComboboxValue[]";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: ComboboxValue[]) => void";
    }, {
        readonly name: "onCreateValue";
        readonly type: "(input: string) => ComboboxValue | void";
    }, {
        readonly defaultValue: "false";
        readonly name: "clearable";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "3";
        readonly name: "maxVisibleTags";
        readonly type: "number";
    }, {
        readonly name: "selectionSummary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "showSelectAll";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }];
    readonly states: readonly ["default", "open", "searching", "custom", "invalid", "disabled", "loading", "empty"];
    readonly tokens: readonly ["color.field.background", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderFocus", "color.content.primary", "color.content.secondary", "color.content.muted", "color.content.disabled", "color.control.highlight.background", "color.action.neutral.content", "color.action.neutral.surface", "color.border.subtle", "color.surface.panel", "color.focus.ring", "color.status.danger.border", "control.height.sm", "control.height.md", "control.height.lg", "control.select.paddingInline", "control.select.radius", "control.select.indicatorSize", "control.select.contentGap", "control.select.trailingInset", "control.iconButton.xsSize", "overlay.menu.inlineSize", "overlay.menu.surfacePadding", "overlay.menu.surfaceRadius", "overlay.menu.itemIconSize", "shadow.menu", "type.label.selected.fontWeight"];
};
