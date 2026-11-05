export declare const disclosureMeta: {
    readonly category: "primitive";
    readonly description: "Reveals supporting content with controlled or uncontrolled state, accessible relationships, and independent header actions.";
    readonly maturity: "stable";
    readonly name: "Disclosure";
    readonly props: readonly [{
        readonly name: "renderHeader";
        readonly type: "(triggerProps: DisclosureTriggerProps) => ReactNode";
    }, {
        readonly name: "contentClassName";
        readonly type: "string";
    }, {
        readonly name: "contentInnerClassName";
        readonly type: "string";
    }, {
        readonly name: "unmountOnClose";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "exitDurationMs";
        readonly type: "number";
        readonly defaultValue: "180";
    }, {
        readonly name: "presentation";
        readonly type: "custom | native";
        readonly defaultValue: "custom";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "actions";
        readonly type: "ReactNode";
    }, {
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "defaultOpen";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: boolean) => void";
    }, {
        readonly name: "onToggle";
        readonly type: "ToggleEventHandler<HTMLDetailsElement> (native only)";
    }];
    readonly states: readonly ["closed", "open", "hover", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfacePressed", "color.content.muted", "color.focus.ring", "type.label.md.fontSize", "type.body.sm.lineHeight", "type.support.fontSize", "layout.disclosure.triggerMinBlockSize", "layout.disclosure.triggerPaddingBlock", "layout.disclosure.triggerPaddingInline", "layout.disclosure.triggerGap", "layout.disclosure.triggerRadius", "layout.disclosure.indicatorSize", "layout.disclosure.actionsGap", "layout.disclosure.contentPaddingBlock", "layout.disclosure.contentPaddingInline", "space.1"];
};
