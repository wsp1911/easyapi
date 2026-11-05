export declare const spinnerMeta: {
    readonly category: "feedback";
    readonly description: "A compact decorative or labeled activity indicator with canonical matrix and bar presentations.";
    readonly maturity: "stable";
    readonly name: "Spinner";
    readonly props: readonly [{
        readonly defaultValue: "matrix";
        readonly name: "variant";
        readonly type: "matrix | bars";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "xs | sm | md | lg";
    }, {
        readonly name: "aria-label";
        readonly type: "string";
    }];
    readonly states: readonly ["matrix", "bars", "reduced-motion"];
    readonly tokens: readonly ["color.content.secondary", "color.content.muted", "layout.spinner.matrixCellMd", "layout.spinner.matrixGapMd"];
};
export declare const loadingStateMeta: {
    readonly category: "feedback";
    readonly description: "A centered loading composition that pairs Spinner with optional support copy.";
    readonly maturity: "stable";
    readonly name: "LoadingState";
    readonly props: readonly [{
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "xs | sm | md | lg";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["indicator", "with-label"];
    readonly tokens: readonly ["color.content.secondary", "color.content.muted", "space.2", "type.support"];
};
