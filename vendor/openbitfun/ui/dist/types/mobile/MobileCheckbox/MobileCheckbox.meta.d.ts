export declare const mobileCheckboxMeta: {
    readonly category: "mobile";
    readonly description: "A touch-sized check row with an indeterminate state for partial selections.";
    readonly maturity: "stable";
    readonly name: "MobileCheckbox";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "defaultChecked";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "indeterminate";
        readonly type: "boolean";
    }, {
        readonly name: "onCheckedChange";
        readonly type: "(checked: boolean) => void";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "plain";
        readonly name: "appearance";
        readonly type: "\"plain\" | \"surface\"";
    }];
    readonly states: readonly ["default", "checked", "indeterminate", "hover", "active", "focus-visible", "invalid", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.border.subtle", "color.content.disabled", "color.content.muted", "color.content.primary", "color.control.highlight.background", "color.control.switch.thumb", "color.field.background", "color.field.border", "color.focus.ring", "color.status.danger.border", "radius.md", "radius.sm", "shadow.xs", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
};
