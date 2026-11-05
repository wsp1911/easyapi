export declare const segmentedControlMeta: {
    readonly category: "form";
    readonly description: "A compact pill-shaped single-choice control that switches between a small set of exclusive modes.";
    readonly maturity: "stable";
    readonly name: "SegmentedControl";
    readonly props: readonly [{
        readonly name: "interaction";
        readonly type: "radio | buttons";
        readonly defaultValue: "radio";
    }, {
        readonly name: "labelBehavior";
        readonly type: "overflow | static";
        readonly defaultValue: "overflow";
    }, {
        readonly name: "options";
        readonly type: "readonly SegmentedControlOption[]";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "\"content\"";
        readonly name: "distribution";
        readonly type: "\"content\" | \"fill\"";
    }, {
        readonly defaultValue: "\"sm\"";
        readonly name: "size";
        readonly type: "\"sm\" | \"md\"";
    }, {
        readonly defaultValue: "\"accent\"";
        readonly name: "tone";
        readonly type: "\"accent\" | \"neutral\"";
    }, {
        readonly defaultValue: "\"bar\"";
        readonly name: "variant";
        readonly type: "\"bar\" | \"pills\"";
    }];
    readonly states: readonly ["selected", "unselected", "hover", "active", "disabled"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "space.3", "color.content.primary", "color.focus.ring", "color.surface.raised", "color.surface.subtle", "control.segmentedControl.gap", "control.segmentedControl.padding", "control.segmentedControl.paddingMd", "control.segmentedControl.radius", "control.segmentedControl.segmentHeight", "control.segmentedControl.segmentHeightMd", "control.segmentedControl.pillSegmentHeight", "control.segmentedControl.segmentPaddingInline", "control.segmentedControl.segmentPaddingInlineMd", "control.segmentedControl.segmentGap", "control.segmentedControl.segmentRadius", "control.segmentedControl.pillSegmentRadius", "control.segmentedControl.iconSize", "control.segmentedControl.iconSizeMd", "control.height.md", "radius.pill", "space.4", "type.label.md.fontSize", "type.label.selected.fontWeight"];
};
