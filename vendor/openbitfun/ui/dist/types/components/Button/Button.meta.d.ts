export declare const buttonMeta: {
    readonly category: "action";
    readonly description: "An action with outline, quiet neutral text, link text, floating glass, neutral fill, secondary, and primary presentation.";
    readonly maturity: "stable";
    readonly name: "Button";
    readonly props: readonly [{
        readonly defaultValue: "outline";
        readonly name: "variant";
        readonly type: "outline | glass | fill | secondary | primary | quiet | text";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "xs | sm | md | lg";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "neutral | danger";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "overflow";
        readonly name: "labelBehavior";
        readonly type: "overflow | static";
    }, {
        readonly name: "leadingIcon";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailingIcon";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "hover", "active", "disabled"];
    readonly tokens: readonly ["color.surface.raised", "color.border.subtle", "effect.blur.subtle", "opacity.iconArtwork", "component.button.content", "component.button.outlineBorder", "component.button.outlineBorderInteractive", "component.button.fillBackground", "component.button.fillBackgroundHover", "component.button.fillBackgroundPressed", "component.button.primaryBackground", "component.button.primaryBackgroundHover", "component.button.primaryBackgroundPressed", "component.button.primaryContentDisabled", "component.button.textContent", "component.button.textContentHover", "component.button.textContentDisabled", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.primary.content", "color.surface.tertiary", "color.border.default", "color.content.primary", "color.content.secondary", "color.border.strong", "color.focus.ring", "color.status.danger.border", "color.status.danger.content", "color.status.danger.surface", "control.height.sm", "control.height.md", "control.height.lg", "control.button.xsHeight", "control.button.xsPaddingInline", "control.button.xsLeadingIconSize", "control.button.xsTrailingIconSize", "type.meta.fontSize", "type.label.sm.fontSize", "type.label.md.fontSize", "type.label.lg.fontSize", "type.label.selected.fontWeight", "radius.pill", "radius.base", "space.3"];
};
