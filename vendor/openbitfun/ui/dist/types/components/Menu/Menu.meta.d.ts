export declare const menuMeta: {
    readonly category: "navigation";
    readonly description: "Grouped menu anatomy plus anchored MenuPopover with nested keyboard navigation, pointer corridors and focus return.";
    readonly maturity: "stable";
    readonly name: "Menu";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "MenuList.children";
        readonly type: "ReactNode (row stack inside custom scroll or animation wrappers)";
    }, {
        readonly defaultValue: "false";
        readonly name: "autoFocusFirstItem";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "auto";
        readonly name: "scrollbarVisibility";
        readonly type: "auto | always | hidden";
    }, {
        readonly defaultValue: "fixed";
        readonly name: "inlineSize";
        readonly type: "fixed | content";
    }, {
        readonly name: "MenuPopover.items";
        readonly type: "readonly MenuEntry[]";
    }, {
        readonly name: "MenuPopover.open / onClose";
        readonly type: "boolean / () => void";
    }, {
        readonly name: "MenuPopover.anchorRef / position";
        readonly type: "RefObject<HTMLElement> / { x: number; y: number }";
    }, {
        readonly name: "MenuPopover.placement";
        readonly type: "top | bottom | left | right";
        readonly defaultValue: "bottom";
    }, {
        readonly name: "MenuPopover.portalContainer";
        readonly type: "Element | DocumentFragment | (() => Element | null)";
    }];
    readonly states: readonly ["default", "scrolling", "focus-within", "disabled-item", "checked-item"];
    readonly tokens: readonly ["color.surface.panel", "color.border.subtle", "color.content.muted", "color.content.caption", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.selection.surface", "color.focus.ring", "overlay.menu.inlineSize", "overlay.menu.minInlineSize", "overlay.menu.maxBlockSize", "overlay.menu.surfacePadding", "overlay.menu.surfaceRadius", "overlay.menu.rowGap", "overlay.menu.sectionGap", "overlay.menu.headingHeight", "overlay.menu.headingPaddingInline", "overlay.menu.headingGap", "type.meta.fontSize", "overlay.menu.headingActionSize", "overlay.menu.itemHeight", "overlay.menu.itemPaddingInline", "overlay.menu.itemGap", "overlay.menu.itemRadius", "overlay.menu.itemIconSize", "overlay.menu.scrollbarGap", "scrollbar.width", "scrollbar.radius", "shadow.menu"];
};
