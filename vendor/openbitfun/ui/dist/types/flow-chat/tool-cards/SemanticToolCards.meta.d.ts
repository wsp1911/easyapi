export declare const semanticToolCardMetas: readonly [{
    readonly category: "flow-chat";
    readonly name: "GoalToolCard";
    readonly maturity: "stable";
    readonly description: "Thread goals with recorded status, objective and explicit budget usage.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "AgentRosterToolCard";
    readonly maturity: "stable";
    readonly description: "Child-agent identities, recorded states and permanent subtree deletion results.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "SessionHistoryToolCard";
    readonly maturity: "stable";
    readonly description: "Exported session history, turn selection, transcript and index locations.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "ImageAnalysisToolCard";
    readonly maturity: "stable";
    readonly description: "Vision analysis with source image, question and readable findings.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "TimeToolCard";
    readonly maturity: "stable";
    readonly description: "The recorded local and UTC time, offset and timestamps.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "McpResourceToolCard";
    readonly maturity: "stable";
    readonly description: "MCP resource and prompt discovery, content and source identities.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "WorktreeToolCard";
    readonly maturity: "stable";
    readonly description: "Worktree inspection, isolated sessions, branch creation and safe removal.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "PortForwardToolCard";
    readonly maturity: "stable";
    readonly description: "SSH forwarding endpoints, actual bound ports and access scope.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "ReviewPlatformToolCard";
    readonly maturity: "stable";
    readonly description: "Hosted pull-request reads, review mutations and credential-safe details.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "FrontendWorkbenchToolCard";
    readonly maturity: "stable";
    readonly description: "Frontend customization drafts, activation outcomes and rollback evidence.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "MiniAppFinalizeToolCard";
    readonly maturity: "stable";
    readonly description: "MiniApp compilation, version and content-change results.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "MarketplacePublishToolCard";
    readonly maturity: "stable";
    readonly description: "Marketplace authorization, submission and review outcomes.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "PlaybookToolCard";
    readonly maturity: "stable";
    readonly description: "Resolved operation guides and ordered steps, independent of execution.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}, {
    readonly category: "flow-chat";
    readonly name: "DesktopCardToolCard";
    readonly maturity: "stable";
    readonly description: "Desktop card creation, visibility, refresh and preset results.";
    readonly props: readonly [{
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly SemanticToolCardRecord[]";
    }, {
        readonly name: "sections";
        readonly type: "readonly SemanticToolCardSection[]";
    }, {
        readonly name: "outcome";
        readonly type: "{ label: ReactNode; tone: StatusPillTone }";
    }, {
        readonly name: "actions";
        readonly type: "readonly SemanticToolCardAction[]";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["space.1", "space.2", "space.3", "space.5", "radius.sm", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "type.body.sm.fontFamily", "type.body.sm.fontSize", "type.body.sm.fontWeight", "type.body.sm.lineHeight", "type.label.lg.fontWeight"];
}];
