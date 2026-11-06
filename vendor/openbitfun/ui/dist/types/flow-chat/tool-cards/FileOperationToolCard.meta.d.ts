export declare const fileOperationToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A concrete FlowChat file-operation card with ambient delete and prominent write or edit presentation.";
    readonly maturity: "stable";
    readonly name: "FileOperationToolCard";
    readonly props: readonly [{
        readonly name: "operation";
        readonly type: "'write' | 'edit' | 'delete'";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "path";
        readonly type: "string";
    }, {
        readonly name: "pathLabel";
        readonly type: "ReactNode";
    }, {
        readonly name: "actionTestId";
        readonly type: "string";
    }, {
        readonly name: "pathTestId";
        readonly type: "string";
    }, {
        readonly name: "preview";
        readonly type: "ReactNode";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "changeSummary";
        readonly type: "FileOperationToolCardProps['changeSummary']";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error", "confirmation"];
    readonly tokens: readonly ["color.action.neutral.surface", "color.codeChange.added", "color.codeChange.removed", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "font.family.sans", "font.family.mono", "font.size.sm", "font.weight.regular", "font.weight.semibold", "radius.sm"];
};
