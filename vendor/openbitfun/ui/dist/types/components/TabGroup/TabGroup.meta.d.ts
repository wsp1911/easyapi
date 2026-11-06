export declare const tabGroupMeta: {
    readonly category: "navigation";
    readonly description: "A compact single-selection tab list with leading icons, a fixed internal slot for glass end actions, and automatic keyboard activation. Content is centered at rest and shifts aside when an action appears without resizing the tab.";
    readonly maturity: "stable";
    readonly name: "TabGroup";
    readonly props: readonly [{
        readonly name: "items";
        readonly type: "readonly TabGroupItem[]";
    }, {
        readonly name: "items[].labelTransitionKey";
        readonly type: "string | number";
    }, {
        readonly name: "items[].labelSuffix";
        readonly type: "ReactNode";
    }, {
        readonly name: "items[].tabProps";
        readonly type: "TabGroupItem['tabProps']";
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
        readonly name: "renderItem";
        readonly type: "(item: TabGroupItem, node: ReactNode, index: number) => ReactNode";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md";
    }];
    readonly states: readonly ["selected", "unselected", "hover", "active", "disabled"];
    readonly tokens: readonly ["opacity.iconArtwork", "component.button.outlineBorder", "component.button.outlineBorderInteractive", "component.button.fillBackground", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.content.primary", "color.focus.ring", "control.tabGroup.gap", "control.tabGroup.itemGap", "control.tabGroup.itemGapSm", "control.tabGroup.itemHeight", "control.tabGroup.itemHeightSm", "control.tabGroup.itemIconSize", "control.tabGroup.itemIconSizeSm", "control.tabGroup.itemPaddingInline", "control.tabGroup.itemPaddingBlockSm", "control.tabGroup.itemPaddingInlineSm", "control.tabGroup.itemActionSize", "color.surface.raised", "color.border.subtle", "effect.blur.subtle", "control.tabGroup.itemRadius", "type.label.md.fontSize", "type.label.md.lineHeight", "type.label.selected.fontWeight", "radius.pill"];
};
