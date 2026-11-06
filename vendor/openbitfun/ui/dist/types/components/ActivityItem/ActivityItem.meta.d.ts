export declare const activityItemMeta: {
    readonly category: "feedback";
    readonly description: "A compact activity row with independent identity, description, metadata, and sibling action areas.";
    readonly maturity: "stable";
    readonly name: "ActivityItem";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "metadata";
        readonly type: "ReactNode";
    }, {
        readonly name: "detail";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "[]";
        readonly name: "actions";
        readonly type: "readonly ActivityItemAction[]";
    }, {
        readonly defaultValue: "inline";
        readonly name: "appearance";
        readonly type: "inline | surface";
    }, {
        readonly name: "onActivate";
        readonly type: "MouseEventHandler<HTMLButtonElement>";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.surface.raised", "color.surface.subtle", "color.content.primary", "color.content.muted", "color.content.disabled", "color.border.subtle", "color.border.default", "color.action.neutral.surfacePressed", "color.codeChange.added", "color.codeChange.removed", "color.focus.ring", "control.activityItem.inlineGap", "control.activityItem.inlineIconSize", "type.meta.fontSize", "type.label.md.fontSize", "type.label.sm.fontWeight", "control.activityItem.surfaceHeight", "control.activityItem.surfaceGap", "control.activityItem.surfacePaddingBlock", "control.activityItem.surfacePaddingInlineStart", "control.activityItem.surfacePaddingInlineEnd", "control.activityItem.surfaceRadius", "control.activityItem.surfaceIconSize", "control.activityItem.contentGap", "control.activityItem.dividerBlockSize", "control.changeCount.gap", "control.changeCount.paddingBlock", "control.changeCount.paddingInline", "control.changeCount.radius", "control.iconButton.xsSize", "control.iconButton.xsIconSize"];
};
