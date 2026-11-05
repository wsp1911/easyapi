export declare const agentControlToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "An avatar-led agent card with visible type, model and lifecycle status that opens the agent in the host detail pane.";
    readonly maturity: "stable";
    readonly name: "AgentControlToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "agentName";
        readonly type: "ReactNode";
    }, {
        readonly name: "avatar";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "preview";
        readonly type: "AgentControlToolCardProps['preview']";
    }, {
        readonly name: "statusLabel";
        readonly type: "ReactNode";
    }, {
        readonly name: "onOpenAgent";
        readonly type: "(event: MouseEvent<HTMLButtonElement>) => void";
    }, {
        readonly name: "openAgentLabel";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "loading", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.codeChange.added", "color.codeChange.removed", "color.status.danger.content", "color.status.success.content", "color.status.warning.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm", "shadow.xs", "color.surface.panel", "control.activityItem.surfaceHeight", "control.activityItem.surfaceRadius", "control.flowChat.cardGap", "control.flowChat.transcriptMaxWidth", "layout.card.paddingMd", "layout.card.gapMd", "layout.card.gapSm"];
};
export declare const fileDiffToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A prominent file-diff card with a compact file path, change summary, message, and renderer slot.";
    readonly maturity: "stable";
    readonly name: "FileDiffToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "path";
        readonly type: "string";
    }, {
        readonly name: "pathLabel";
        readonly type: "ReactNode";
    }, {
        readonly name: "changeSummary";
        readonly type: "FileDiffToolCardProps['changeSummary']";
    }, {
        readonly name: "preview";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.codeChange.added", "color.codeChange.removed", "color.status.danger.content", "color.status.success.content", "color.status.warning.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm", "shadow.xs", "font.family.mono"];
};
export declare const gitToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A prominent Git command card with output, warning, failure, and execution metadata.";
    readonly maturity: "stable";
    readonly name: "GitToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.codeChange.added", "color.codeChange.removed", "color.status.danger.content", "color.status.success.content", "color.status.warning.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm", "shadow.xs"];
};
export declare const pageDeployToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A prominent page-deploy card with version metadata and host-provided actions.";
    readonly maturity: "stable";
    readonly name: "PageDeployToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.codeChange.added", "color.codeChange.removed", "color.status.danger.content", "color.status.success.content", "color.status.warning.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm", "shadow.xs"];
};
export declare const pagePublishToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A prominent page-publish card with production and preview metadata and actions.";
    readonly maturity: "stable";
    readonly name: "PagePublishToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.codeChange.added", "color.codeChange.removed", "color.status.danger.content", "color.status.success.content", "color.status.warning.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm", "shadow.xs"];
};
export declare const reviewSummaryToolCardMeta: {
    readonly category: "flow-chat";
    readonly description: "A prominent review summary with changed files, status, and a host navigation action.";
    readonly maturity: "stable";
    readonly name: "ReviewSummaryToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.canvas", "color.surface.raised", "color.border.default", "color.codeChange.added", "color.codeChange.removed", "color.status.danger.content", "color.status.success.content", "color.status.warning.content", "font.family.sans", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.sm", "shadow.xs"];
};
