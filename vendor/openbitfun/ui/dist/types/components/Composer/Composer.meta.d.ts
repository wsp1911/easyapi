export declare const composerMeta: {
    readonly category: "form";
    readonly description: "A composable message editor shell with independent context, editor, and action regions.";
    readonly maturity: "stable";
    readonly name: "Composer";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "contextBar";
        readonly type: "ReactNode";
    }, {
        readonly name: "toolbar";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "focus-within", "with-context", "invalid", "disabled"];
    readonly tokens: readonly ["color.surface.raised", "color.composer.contextBackground", "control.composer.contextBlur", "color.surface.panel", "color.border.subtle", "color.content.primary", "color.content.muted", "color.content.disabled", "color.composer.border", "color.field.borderFocus", "color.focus.ring", "color.status.danger.border", "color.status.danger.surface", "control.composer.minBlockSize", "control.composer.contextOffset", "control.composer.contextPaddingBlock", "control.composer.contextPaddingInline", "control.composer.contextGap", "control.composer.surfacePadding", "control.composer.surfaceGap", "control.composer.surfaceRadius", "control.composer.editorPadding", "control.composer.toolbarGap", "control.composer.dividerBlockSize", "type.body.sm.fontSize", "shadow.composer"];
};
