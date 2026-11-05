export declare const mobileSwitchMeta: {
    readonly category: "mobile";
    readonly description: "A touch-sized settings row that pairs a label and its explanation with the product switch.";
    readonly maturity: "stable";
    readonly name: "MobileSwitch";
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
        readonly name: "onCheckedChange";
        readonly type: "(checked: boolean) => void";
    }, {
        readonly defaultValue: "plain";
        readonly name: "appearance";
        readonly type: "\"plain\" | \"surface\"";
    }];
    readonly states: readonly ["off", "on", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.border.subtle", "color.content.disabled", "color.content.muted", "color.content.primary", "color.control.switch.thumb", "color.control.switch.track", "color.control.switch.track.checked", "color.focus.ring", "radius.md", "radius.pill", "shadow.xs", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
};
