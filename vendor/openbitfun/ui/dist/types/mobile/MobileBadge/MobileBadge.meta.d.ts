export declare const mobileBadgeMeta: {
    readonly category: "mobile";
    readonly description: "A compact mobile label for status, identity, and metadata.";
    readonly maturity: "stable";
    readonly name: "MobileBadge";
    readonly props: readonly [{
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "\"neutral\" | \"info\" | \"success\" | \"warning\" | \"danger\"";
    }, {
        readonly defaultValue: "false";
        readonly name: "dot";
        readonly type: "boolean";
    }];
    readonly states: readonly ["neutral", "info", "success", "warning", "danger"];
    readonly tokens: readonly ["color.content.secondary", "color.status.info.surface", "color.status.success.surface", "color.status.warning.surface", "color.status.danger.surface", "radius.pill"];
};
