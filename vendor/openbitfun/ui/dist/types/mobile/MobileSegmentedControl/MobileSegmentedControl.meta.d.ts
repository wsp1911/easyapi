export declare const mobileSegmentedControlMeta: {
    readonly category: "mobile";
    readonly description: "A touch-first segmented selector for compact mode and filter choices.";
    readonly maturity: "stable";
    readonly name: "MobileSegmentedControl";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "options";
        readonly type: "readonly MobileSegmentedControlOption[]";
    }, {
        readonly name: "onChange";
        readonly type: "(value: string) => void";
    }];
    readonly states: readonly ["selected", "unselected", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface", "color.content.primary", "color.surface.panel", "radius.pill", "shadow.xs", "space.1"];
};
