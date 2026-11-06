export declare const confirmDialogMeta: {
    readonly category: "feedback";
    readonly description: "Composes semantic confirmation content, optional preview material, async actions, and dismissal policy on the shared Dialog contract.";
    readonly maturity: "stable";
    readonly name: "ConfirmDialog";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "message";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "warning";
        readonly name: "type";
        readonly type: "info | warning | error | success";
    }, {
        readonly name: "confirmText";
        readonly type: "ReactNode";
    }, {
        readonly name: "secondaryText";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "inline";
        readonly name: "secondaryActionPlacement";
        readonly type: "inline | start";
    }, {
        readonly name: "cancelText";
        readonly type: "ReactNode";
    }, {
        readonly name: "preview";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "confirmDanger";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "true";
        readonly name: "showCancel";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "showCloseButton";
        readonly type: "boolean";
    }, {
        readonly name: "pendingAction";
        readonly type: "confirm | secondary | null";
    }, {
        readonly name: "onConfirm";
        readonly type: "() => void | Promise<void>";
    }, {
        readonly name: "onSecondary";
        readonly type: "() => void | Promise<void>";
    }, {
        readonly name: "onActionError";
        readonly type: "(error: unknown, action: confirm | secondary) => void";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: ConfirmDialogCloseReason) => void";
    }];
    readonly states: readonly ["info", "warning", "error", "success", "pending"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.surface.tertiary", "color.border.subtle", "color.status.info.emphasis", "color.status.success.emphasis", "color.status.warning.emphasis", "color.status.danger.emphasis", "layout.confirmDialog.contentGap", "layout.confirmDialog.messageGap", "layout.confirmDialog.iconGlyphSize", "layout.confirmDialog.previewMaxBlockSize", "layout.confirmDialog.previewPaddingBlock", "layout.confirmDialog.previewPaddingInline", "layout.confirmDialog.previewRadius", "type.body.md.fontSize", "type.code.sm.fontSize", "space.2", "space.3", "space.4"];
};
