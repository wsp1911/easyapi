export declare const iconButtonMeta: {
    readonly category: "action";
    readonly description: "A labeled icon-only action with annotation, quiet, glass, outlined, filled, and primary variants. Glass floats over intact content; capsule and tab action slots select it automatically.";
    readonly maturity: "stable";
    readonly name: "IconButton";
    readonly props: readonly [{
        readonly name: "aria-label";
        readonly type: "string";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "quiet";
        readonly name: "variant";
        readonly type: "annotation | quiet | glass | outline | fill | primary";
    }, {
        readonly defaultValue: "square";
        readonly name: "shape";
        readonly type: "square | circle";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "xs | standard | sm | md | lg";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "neutral | danger";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled", "loading"];
    readonly tokens: readonly ["color.surface.raised", "color.border.subtle", "effect.blur.subtle", "opacity.iconArtwork", "color.content.primary", "color.content.secondary", "color.content.muted", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.action.primary.background", "color.action.primary.content", "color.action.primary.hover", "color.action.primary.pressed", "color.surface.tertiary", "color.focus.ring", "color.status.danger.content", "color.status.danger.surface", "control.height.sm", "control.height.md", "control.height.lg", "control.iconButton.xsSize", "control.iconButton.xsIconSize", "control.icon.sizeXs", "control.iconButton.standardSize", "control.iconButton.standardIconSize", "radius.xs", "radius.sm", "radius.pill"];
};
