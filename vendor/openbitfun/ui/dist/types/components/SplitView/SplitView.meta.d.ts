export declare const splitViewMeta: {
    readonly category: "primitive";
    readonly description: "A controlled two-pane layout with stable content containers, reversible placement, and accessible resizing.";
    readonly maturity: "stable";
    readonly name: "SplitView";
    readonly props: readonly [{
        readonly name: "primary";
        readonly type: "ReactNode";
    }, {
        readonly name: "secondary";
        readonly type: "ReactNode";
    }, {
        readonly name: "header";
        readonly type: "ReactNode | (geometry: SplitViewHeaderGeometry) => ReactNode";
    }, {
        readonly name: "surfaces";
        readonly type: "ReactNode";
    }, {
        readonly name: "mode";
        readonly type: "split | primary | secondary";
        readonly defaultValue: "split";
    }, {
        readonly name: "layout";
        readonly type: "split | overlay";
        readonly defaultValue: "split";
    }, {
        readonly name: "secondarySide";
        readonly type: "left | right";
        readonly defaultValue: "right";
    }, {
        readonly name: "rightSize";
        readonly type: "number";
    }, {
        readonly name: "onRightSizeChange";
        readonly type: "(size: number) => void";
    }, {
        readonly name: "dividerActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "dividerLabel";
        readonly type: "string";
    }];
    readonly states: readonly ["split", "primary", "secondary"];
    readonly tokens: readonly ["color.border.subtle", "color.surface.raised", "color.accent.default", "color.focus.ring", "space.1", "space.2", "space.3", "radius.lg", "shadow.overlay"];
};
