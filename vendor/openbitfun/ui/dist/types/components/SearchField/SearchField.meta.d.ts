export declare const searchFieldMeta: {
    readonly category: "form";
    readonly description: "A search input with optional leading icon, shortcut hint, clear action, Enter submission, and a frosted panel footer.";
    readonly maturity: "stable";
    readonly name: "SearchField";
    readonly props: readonly [{
        readonly defaultValue: "default";
        readonly name: "variant";
        readonly type: "default | embedded | panel";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "placeholder";
        readonly type: "string";
    }, {
        readonly name: "leadingIcon";
        readonly type: "ReactNode";
    }, {
        readonly name: "shortcut";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailingAction";
        readonly type: "ReactNode (xs IconButton actions)";
    }, {
        readonly name: "footer";
        readonly type: "ReactNode (panel only)";
    }, {
        readonly name: "clearLabel";
        readonly type: "string";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }, {
        readonly defaultValue: "false";
        readonly name: "readOnly";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "onClear";
        readonly type: "MouseEventHandler<HTMLButtonElement>";
    }, {
        readonly name: "onSearch";
        readonly type: "(value: string) => void";
    }];
    readonly states: readonly ["default", "filled", "hover", "focus-visible", "read-only", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.surface.raised", "color.border.subtle", "color.border.default", "color.field.background", "color.field.placeholder", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderActive", "color.field.borderFocus", "color.status.danger.border", "control.searchField.height.sm", "control.searchField.height.md", "control.searchField.height.lg", "control.iconButton.xsSize", "space.component.inline", "space.1", "border.width.default", "radius.xs", "type.label.md.fontSize", "type.meta.fontSize", "radius.pill", "radius.lg", "effect.blur.medium", "shadow.overlay"];
};
