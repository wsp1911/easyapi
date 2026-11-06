export declare const scrollAreaMeta: {
    readonly category: "primitive";
    readonly description: "Provides native scrolling with consistent orientation, scrollbar visibility, and optional inner edge fades.";
    readonly maturity: "stable";
    readonly name: "ScrollArea";
    readonly props: readonly [{
        readonly defaultValue: "vertical";
        readonly name: "orientation";
        readonly type: "vertical | horizontal | both";
    }, {
        readonly defaultValue: "auto";
        readonly name: "scrollbarVisibility";
        readonly type: "auto | hover | always | hidden";
    }, {
        readonly defaultValue: "none";
        readonly name: "edgeFade";
        readonly type: "none | vertical";
    }, {
        readonly defaultValue: "contain";
        readonly name: "overscrollBehaviorY";
        readonly type: "auto | contain";
    }];
    readonly states: readonly ["auto", "hover", "always", "hidden"];
    readonly tokens: readonly ["color.content.onLight", "color.scrollbar.thumb", "color.scrollbar.thumbHover", "scrollbar.width", "scrollbar.radius", "layout.scrollArea.fadeExtent"];
};
