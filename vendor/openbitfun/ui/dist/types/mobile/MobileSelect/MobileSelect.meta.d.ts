export declare const mobileSelectMeta: {
    readonly category: "mobile";
    readonly description: "A touch-sized choice field that opens the mobile choice sheet instead of a desktop popup list.";
    readonly maturity: "stable";
    readonly name: "MobileSelect";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly MobileSelectOption[]";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "defaultOpen";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: boolean) => void";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "sheetTitle";
        readonly type: "ReactNode";
    }, {
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "placeholder";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "soft";
        readonly name: "appearance";
        readonly type: "\"soft\" | \"surface\"";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "open", "invalid", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.content.disabled", "color.content.muted", "color.content.primary", "color.content.secondary", "color.field.background", "color.field.border", "color.focus.ring", "color.status.danger.border", "color.surface.tertiary", "radius.md", "shadow.xs", "space.1", "space.2", "space.4", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.md.fontSize", "type.label.md.fontWeight"];
};
