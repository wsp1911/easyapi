export declare const statusPillMeta: {
    readonly category: "feedback";
    readonly description: "A compact semantic status label with an optional decorative leading indicator.";
    readonly maturity: "stable";
    readonly name: "StatusPill";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "emphasis";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "success";
        readonly name: "tone";
        readonly type: "neutral | accent | info | success | warning | danger";
    }, {
        readonly defaultValue: "pill";
        readonly name: "shape";
        readonly type: "pill | rounded";
    }];
    readonly states: readonly ["neutral", "accent", "info", "success", "warning", "danger"];
    readonly tokens: readonly ["color.action.neutral.surface", "color.status.info.emphasis", "color.status.success.emphasis", "color.status.warning.emphasis", "color.status.danger.emphasis", "type.statusPill.lineHeight", "color.content.secondary", "color.accent.default", "color.status.info.content", "color.status.info.surface", "color.status.success.content", "color.status.success.surface", "color.status.warning.content", "color.status.warning.surface", "color.status.danger.content", "color.status.danger.surface", "control.statusPill.gap", "control.statusPill.paddingBlock", "control.statusPill.paddingInline", "control.statusPill.radius", "radius.sm", "control.statusPill.iconSize", "type.meta.fontSize"];
};
