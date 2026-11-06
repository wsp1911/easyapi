export declare const keyHintMeta: {
    readonly category: "primitive";
    readonly description: "A semantic keyboard hint with optional decorative icon content.";
    readonly maturity: "stable";
    readonly name: "KeyHint";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["color.keyHint.content", "color.keyHint.background", "type.micro.fontSize", "type.modifier.leading.none.lineHeight", "radius.xs"];
};
