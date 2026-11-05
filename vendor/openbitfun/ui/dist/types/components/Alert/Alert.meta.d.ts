export declare const alertMeta: {
    readonly category: "feedback";
    readonly description: "A semantic inline notice with optional title, description, icon, and dismissal.";
    readonly maturity: "stable";
    readonly name: "Alert";
    readonly props: readonly [{
        readonly name: "role";
        readonly type: "AriaRole";
        readonly defaultValue: "alert";
    }, {
        readonly name: "aria-live";
        readonly type: "off | polite | assertive";
    }, {
        readonly name: "message";
        readonly type: "ReactNode";
    }, {
        readonly name: "tone";
        readonly type: "info | success | warning | error";
        readonly defaultValue: "info";
    }, {
        readonly name: "closable";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }];
    readonly states: readonly ["info", "success", "warning", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.status.info.surface", "color.status.success.surface", "color.status.warning.surface", "color.status.danger.surface", "radius.base"];
};
