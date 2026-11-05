export declare const chatComposerMeta: {
    readonly category: "flow-chat";
    readonly description: "A slot-based FlowChat composer with context, pending-message queue, and compact or expanded input anatomy.";
    readonly maturity: "stable";
    readonly name: "ChatComposer";
    readonly props: readonly [{
        readonly defaultValue: "compact";
        readonly name: "layout";
        readonly type: "compact | expanded";
    }, {
        readonly name: "contextBar";
        readonly type: "ReactNode";
    }, {
        readonly name: "queue";
        readonly type: "ReactNode";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "startActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "endActions";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "busy";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "expanded", "queued", "focus-visible", "busy", "disabled"];
    readonly tokens: readonly ["border.width.default", "color.composer.border", "color.composer.contextBackground", "control.composer.contextBlur", "control.composer.surfaceRadius", "control.composer.surfacePadding", "control.composer.surfaceGap", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.action.primary.background", "color.action.primary.content", "color.action.primary.hover", "color.action.primary.pressed", "color.border.default", "color.content.muted", "color.content.primary", "color.content.secondary", "color.surface.panel", "color.surface.raised", "color.surface.subtle", "control.chatComposer.actionIconSize", "control.chatComposer.compactGap", "control.chatComposer.compactHeight", "control.chatComposer.compactPaddingBlock", "control.chatComposer.compactPaddingInline", "control.chatComposer.compactTrackHeight", "control.chatComposer.controlHeight", "control.height.md", "font.family.control", "font.size.base", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.lg", "radius.2xl", "radius.pill", "shadow.composer", "space.1", "space.2", "space.3", "space.4", "space.6", "space.8", "space.12"];
};
