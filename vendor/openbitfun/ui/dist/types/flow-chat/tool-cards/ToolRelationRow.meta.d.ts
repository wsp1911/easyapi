export declare const toolRelationRowMeta: {
    readonly category: "flow-chat";
    readonly name: "ToolRelationRow";
    readonly description: "Plain actor and target identities navigate to their owning surfaces. Only the tinted outcome opens dialog details; the row never expands.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "interaction";
        readonly type: "ToolCardInteraction";
    }, {
        readonly name: "result";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "details";
        readonly type: "ReactNode";
    }, {
        readonly name: "detailsTitle";
        readonly type: "ReactNode";
    }, {
        readonly name: "detailsSize";
        readonly type: "DialogSize";
        readonly defaultValue: "sm";
    }, {
        readonly name: "resultLabel";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "focus", "loading", "error"];
    readonly tokens: readonly ["radius.sm", "control.height.sm", "color.action.neutral.surface", "color.action.quiet.hover", "color.content.primary", "color.content.secondary", "color.status.danger.content"];
};
