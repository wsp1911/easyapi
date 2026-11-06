export declare const launcherButtonMeta: {
    readonly category: "action";
    readonly description: "A shell-edge launcher with a leading icon and distinct default, hover, and pressed emphasis states.";
    readonly maturity: "stable";
    readonly name: "LauncherButton";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leadingIcon";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.control.launcher.background", "color.control.launcher.backgroundHover", "color.control.launcher.backgroundPressed", "color.control.launcher.content", "color.control.launcher.contentHover", "color.control.launcher.contentPressed", "color.control.launcher.contentDisabled", "color.focus.ring", "control.launcherButton.minInlineSize", "control.launcherButton.blockSize", "control.launcherButton.paddingInline", "control.launcherButton.gap", "control.launcherButton.iconSize", "control.launcherButton.radius", "type.code.meta.fontSize"];
};
