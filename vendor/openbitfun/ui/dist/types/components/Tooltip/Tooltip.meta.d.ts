export declare const tooltipMeta: {
    readonly category: "feedback";
    readonly description: "A portaled, delay-managed label with optional click persistence, cursor-following and interactive content; dismisses immediately on scrolling or when its trigger leaves the visible viewport.";
    readonly maturity: "stable";
    readonly name: "Tooltip";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactElement";
    }, {
        readonly name: "content";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "top";
        readonly name: "placement";
        readonly type: "top | bottom | left | right";
    }, {
        readonly defaultValue: "hover";
        readonly name: "trigger";
        readonly type: "hover | click | focus | hover-focus";
    }, {
        readonly defaultValue: "450";
        readonly name: "delay";
        readonly type: "number";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "followCursor";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "interactive";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "openOnClick";
        readonly type: "boolean";
    }, {
        readonly name: "portalContainer";
        readonly type: "TooltipPortalTarget";
    }];
    readonly states: readonly ["default", "visible", "interactive", "instant"];
    readonly tokens: readonly ["color.surface.raised", "color.content.primary", "color.border.subtle", "color.border.default", "color.border.strong", "shadow.sm", "overlay.tooltip.maxInlineSize", "overlay.tooltip.maxBlockSize", "overlay.tooltip.paddingBlock", "overlay.tooltip.paddingInline", "overlay.tooltip.surfaceRadius", "overlay.tooltip.arrowSize", "overlay.tooltip.gap", "type.support.fontSize"];
};
