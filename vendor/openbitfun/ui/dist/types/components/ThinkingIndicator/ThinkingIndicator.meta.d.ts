export declare const thinkingIndicatorMeta: {
    readonly category: "feedback";
    readonly description: "The thinking mark forms node by node, holds its complete shape, then dissolves in reverse order.";
    readonly maturity: "stable";
    readonly name: "ThinkingIndicator";
    readonly props: readonly [{
        readonly defaultValue: "true";
        readonly name: "active";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "2xs | xs | sm | md | lg";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["active", "static"];
    readonly tokens: readonly ["control.icon.size2xs", "control.icon.sizeXs", "control.icon.sizeSm", "control.icon.sizeMd", "control.icon.sizeLg"];
};
