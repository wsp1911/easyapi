export declare const listboxMeta: {
    readonly category: "form";
    readonly description: "A scrollable single- or multi-select option surface with grouped, descriptive rows.";
    readonly maturity: "stable";
    readonly name: "Listbox";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "roving";
        readonly name: "focusMode";
        readonly type: "roving | virtual";
    }, {
        readonly defaultValue: "false";
        readonly name: "autoFocusOption";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "multiple";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "auto";
        readonly name: "scrollbarVisibility";
        readonly type: "auto | always | hidden";
    }];
    readonly states: readonly ["default", "active-option", "selected-option", "disabled-option", "multiple"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfacePressed", "color.content.muted", "color.focus.ring", "overlay.menu.maxBlockSize", "overlay.menu.scrollbarGap", "overlay.menu.rowGap", "overlay.menu.sectionGap", "overlay.menu.headingHeight", "overlay.menu.headingPaddingInline", "overlay.menu.itemHeight", "overlay.menu.itemPaddingInline", "overlay.menu.itemGap", "overlay.menu.itemRadius", "overlay.menu.itemIconSize", "type.meta.fontSize"];
};
