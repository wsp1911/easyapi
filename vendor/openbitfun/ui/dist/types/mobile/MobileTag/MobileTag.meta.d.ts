export declare const mobileTagMeta: {
    readonly category: "mobile";
    readonly description: "A touch-sized labelled pill for filters and tags, with leading and trailing slots and a filled selected state.";
    readonly maturity: "stable";
    readonly name: "MobileTag";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "selected";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "soft";
        readonly name: "appearance";
        readonly type: "\"soft\" | \"accent\"";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "\"sm\" | \"md\"";
    }];
    readonly states: readonly ["default", "selected", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.accent.default", "color.accent.surface", "color.action.neutral.surface", "color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.action.primary.content", "color.content.disabled", "color.content.primary", "color.content.secondary", "color.focus.ring", "color.selection.surface", "font.weight.semibold", "radius.pill", "space.2", "space.3", "space.4", "type.label.md.fontSize", "type.label.md.fontWeight", "type.label.sm.fontSize"];
};
