export declare const mobileIconButtonMeta: {
    readonly category: "mobile";
    readonly description: "A touch-sized mobile icon action with plain, surfaced, and softly elevated appearances.";
    readonly maturity: "stable";
    readonly name: "MobileIconButton";
    readonly props: readonly [{
        readonly name: "aria-label";
        readonly type: "string";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "surface";
        readonly name: "appearance";
        readonly type: "plain | surface | floating";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md";
    }, {
        readonly defaultValue: "false";
        readonly name: "selected";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "selected", "disabled", "loading"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.border.subtle", "color.border.strong", "color.focus.ring", "color.surface.panel", "motion.duration.fast", "motion.duration.loop", "radius.pill", "shadow.base", "shadow.sm"];
};
