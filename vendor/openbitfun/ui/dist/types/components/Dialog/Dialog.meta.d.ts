export declare const dialogMeta: {
    readonly category: "feedback";
    readonly description: "A compound dialog with attached or frosted floating footer anatomy on the shared overlay kernel.";
    readonly maturity: "stable";
    readonly name: "Dialog";
    readonly props: readonly [{
        readonly name: "restoreFocus";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }, {
        readonly name: "portalTarget";
        readonly type: "HTMLElement | null";
    }, {
        readonly name: "overlayProps";
        readonly type: "HTMLAttributes<HTMLDivElement>";
    }, {
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: DialogCloseReason) => void";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg | xl | 2xl";
    }, {
        readonly defaultValue: "false";
        readonly name: "DialogHeader.separator";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "DialogFooter.separator";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "true";
        readonly name: "closeOnEscape";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "true";
        readonly name: "closeOnPointerOutside";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "open", "alert", "scrolling", "floating-footer"];
    readonly tokens: readonly ["color.overlay.scrim", "color.surface.raised", "color.border.subtle", "color.content.primary", "color.content.secondary", "color.content.muted", "overlay.dialog.surfaceRadius", "overlay.dialog.viewportGutter", "overlay.dialog.headerPaddingBlockStart", "overlay.dialog.headerPaddingBlockEnd", "overlay.dialog.footerPaddingBlockStart", "overlay.dialog.footerPaddingBlockEnd", "overlay.dialog.footerActionMinWidth", "overlay.dialog.footerHeight", "overlay.dialog.footerFadeExtent", "overlay.dialog.footerContentInset", "overlay.dialog.footerBlur", "shadow.overlay", "motion.distance.sm", "type.support", "type.heading.dialog.fontFamily", "type.heading.dialog.fontSize", "type.heading.dialog.fontWeight", "type.heading.dialog.lineHeight", "type.heading.dialog.letterSpacing"];
};
export declare const sheetMeta: {
    readonly description: "A compound edge-aligned sheet using the same dismissal, focus, scroll-lock, and anatomy contracts as Dialog.";
    readonly name: "Sheet";
    readonly props: readonly [{
        readonly name: "restoreFocus";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }, {
        readonly name: "portalTarget";
        readonly type: "HTMLElement | null";
    }, {
        readonly name: "overlayProps";
        readonly type: "HTMLAttributes<HTMLDivElement>";
    }, {
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: DialogCloseReason) => void";
    }, {
        readonly defaultValue: "right";
        readonly name: "placement";
        readonly type: "left | right | bottom";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }];
    readonly states: readonly ["default", "open", "left", "right", "bottom"];
    readonly category: "feedback";
    readonly maturity: "stable";
    readonly tokens: readonly ["color.overlay.scrim", "color.surface.raised", "color.border.subtle", "color.content.primary", "color.content.secondary", "color.content.muted", "overlay.dialog.surfaceRadius", "overlay.dialog.viewportGutter", "overlay.dialog.headerPaddingBlockStart", "overlay.dialog.headerPaddingBlockEnd", "overlay.dialog.footerPaddingBlockStart", "overlay.dialog.footerPaddingBlockEnd", "overlay.dialog.footerActionMinWidth", "overlay.dialog.footerHeight", "overlay.dialog.footerFadeExtent", "overlay.dialog.footerContentInset", "overlay.dialog.footerBlur", "shadow.overlay", "motion.distance.sm", "type.support", "type.heading.dialog.fontFamily", "type.heading.dialog.fontSize", "type.heading.dialog.fontWeight", "type.heading.dialog.lineHeight", "type.heading.dialog.letterSpacing"];
};
