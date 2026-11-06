export declare const agentWaitToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A concrete ambient card for background-agent wait progress and completion summaries.";
    readonly maturity: "stable";
    readonly name: "AgentWaitToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "extra";
        readonly type: "ReactNode";
    }, {
        readonly name: "interaction";
        readonly type: "ToolCardInteraction";
    }, {
        readonly name: "agents";
        readonly type: "AgentWaitTargets";
    }];
    readonly states: readonly ["default", "loading", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const cronToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient scheduled-job card with schedule, next-run, and payload details.";
    readonly maturity: "stable";
    readonly name: "CronToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const defaultToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "The fallback ambient card for a tool summary, sanitized input, result, and confirmation state.";
    readonly maturity: "stable";
    readonly name: "DefaultToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const directoryListToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient directory-list card with structured metadata and file results.";
    readonly maturity: "stable";
    readonly name: "DirectoryListToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const getToolSpecToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A concrete ambient card for loading a tool specification into runtime context.";
    readonly maturity: "stable";
    readonly name: "GetToolSpecToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "extra";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "loading", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const globSearchToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient file-pattern search card with reusable result-list anatomy.";
    readonly maturity: "stable";
    readonly name: "GlobSearchToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const grepSearchToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient text-search card with query metadata, file-grouped excerpts and aligned line numbers.";
    readonly maturity: "stable";
    readonly name: "GrepSearchToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "resultBlocks";
        readonly type: "readonly GrepSearchResultBlock[]";
    }, {
        readonly name: "resultText";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const runCodeToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient code-execution card with host-rendered program and output slots.";
    readonly maturity: "stable";
    readonly name: "RunCodeToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const sessionControlToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient session-lifecycle card with semantic detail fields and session rows.";
    readonly maturity: "stable";
    readonly name: "SessionControlToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "interaction";
        readonly type: "ToolCardInteraction";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const sessionMessageToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient cross-session message card with target details and message content.";
    readonly maturity: "stable";
    readonly name: "SessionMessageToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "interaction";
        readonly type: "ToolCardInteraction";
    }, {
        readonly name: "openAction";
        readonly type: "{ label: string; onPress: (event: MouseEvent<HTMLButtonElement>) => void }";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const skillToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A concrete ambient card for skill loading progress and outcomes.";
    readonly maturity: "stable";
    readonly name: "SkillToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "extra";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "loading", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const terminalControlToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A concrete ambient card for interrupting or terminating a terminal session.";
    readonly maturity: "stable";
    readonly name: "TerminalControlToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "extra";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "loading", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const todoToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A prominent task-progress card with a current-task summary and an expandable list.";
    readonly maturity: "stable";
    readonly name: "TodoToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const viewImageToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient image-result card with an expandable preview and accessible lightbox.";
    readonly maturity: "stable";
    readonly name: "ViewImageToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const webFetchToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient web-fetch card with source metadata, result actions, and content preview.";
    readonly maturity: "stable";
    readonly name: "WebFetchToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
export declare const webSearchToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An ambient web-search card with link, snippet, URL, and summary result presentations.";
    readonly maturity: "stable";
    readonly name: "WebSearchToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "control.toolCard.fieldLabelWidth", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm"];
};
