export declare const flowChatTurnMetricsMeta: {
    readonly category: "flow-chat";
    readonly name: "FlowChatTurnMetrics";
    readonly maturity: "stable";
    readonly description: "Quiet turn usage with a cache-hit ring, separate time to first token and four output-speed levels.";
    readonly props: readonly [{
        readonly name: "cacheHitRate";
        readonly type: "number | null";
    }, {
        readonly name: "speedLevel";
        readonly type: "1 | 2 | 3 | 4 | null";
    }, {
        readonly name: "tokenValue";
        readonly type: "string | null";
    }, {
        readonly name: "rateValue";
        readonly type: "string | null";
    }, {
        readonly name: "ttftValue";
        readonly type: "string | null";
    }, {
        readonly name: "ttftDescription";
        readonly type: "string";
    }, {
        readonly name: "ttftDetails";
        readonly type: "ReactNode";
    }, {
        readonly name: "tokenDescription";
        readonly type: "string";
    }, {
        readonly name: "rateDescription";
        readonly type: "string";
    }, {
        readonly name: "tokenDetails";
        readonly type: "ReactNode";
    }, {
        readonly name: "rateDetails";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["reported", "unknown", "hover", "focus", "click"];
    readonly tokens: readonly ["type.flow.meta.fontFamily", "type.flow.meta.fontSize", "type.flow.meta.fontWeight", "type.flow.meta.lineHeight", "color.content.muted", "color.border.default", "color.focus.ring", "control.icon.size.sm", "control.icon.strokeWidth", "color.content.secondary", "color.border.subtle", "color.surface.raised", "shadow.sm", "effect.blur.base", "border.width.default", "space.1", "space.2", "space.3", "space.6", "radius.pill", "radius.lg"];
};
