import type { ComponentMeta, ComponentPlatform } from "./registry.types";
export type { ComponentMaturity, ComponentMeta, ComponentPlatform, ComponentPropMeta, } from "./registry.types";
export declare const componentRegistry: readonly [{
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
}, {
    readonly category: "action";
    readonly description: "An actionable card with independent content and inline or floating glass sibling actions.";
    readonly maturity: "stable";
    readonly name: "ActionCard";
    readonly props: readonly [{
        readonly name: "body";
        readonly type: "ReactNode";
    }, {
        readonly name: "triggerClassName";
        readonly type: "string";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "[]";
        readonly name: "actions";
        readonly type: "readonly ActionCardAction[]";
    }, {
        readonly defaultValue: "inline";
        readonly name: "actionPlacement";
        readonly type: "inline | floating";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "sm | md";
    }, {
        readonly defaultValue: "false";
        readonly name: "selected";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "selected", "disabled"];
    readonly tokens: readonly ["color.actionCard.background", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.content.primary", "color.content.secondary", "color.border.default", "color.border.subtle", "color.surface.raised", "effect.blur.subtle", "color.focus.ring", "control.actionCard.smMinBlockSize", "control.actionCard.mdMinBlockSize", "control.actionCard.paddingBlock", "control.actionCard.paddingInline", "control.actionCard.gap", "control.actionCard.leadingSize", "control.actionCard.iconSize", "control.actionCard.contentGap", "control.actionCard.actionsGap", "control.actionCard.actionsPaddingInlineEnd", "control.actionCard.radius", "control.iconButton.standardSize", "control.iconButton.standardIconSize", "type.heading.section.fontSize", "type.body.sm.fontSize", "type.actionRow.lineHeight"];
}, {
    readonly category: "action";
    readonly description: "A native button row with independent leading, shortcut, and sibling action areas.";
    readonly maturity: "stable";
    readonly name: "ActionItem";
    readonly props: readonly [{
        readonly name: "actionContent";
        readonly type: "ReactNode";
    }, {
        readonly name: "triggerClassName";
        readonly type: "string";
    }, {
        readonly defaultValue: "overflow";
        readonly name: "labelBehavior";
        readonly type: "overflow | static";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "reserveLeadingSpace";
        readonly type: "boolean";
    }, {
        readonly name: "metadata";
        readonly type: "ReactNode";
    }, {
        readonly name: "shortcut";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "[]";
        readonly name: "actions";
        readonly type: "readonly ActionItemAction[]";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "neutral | danger";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled", "danger"];
    readonly tokens: readonly ["opacity.iconArtwork", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfacePressed", "color.content.muted", "color.focus.ring", "color.status.danger.content", "color.status.danger.surface", "control.height.sm", "type.label.md.fontSize", "type.actionRow.lineHeight", "color.action.neutral.surfaceHover", "type.label.selected.fontWeight", "type.meta.fontSize", "radius.base"];
}, {
    readonly category: "feedback";
    readonly description: "A compact activity row with independent identity, description, metadata, and sibling action areas.";
    readonly maturity: "stable";
    readonly name: "ActivityItem";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "metadata";
        readonly type: "ReactNode";
    }, {
        readonly name: "detail";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "[]";
        readonly name: "actions";
        readonly type: "readonly ActivityItemAction[]";
    }, {
        readonly defaultValue: "inline";
        readonly name: "appearance";
        readonly type: "inline | surface";
    }, {
        readonly name: "onActivate";
        readonly type: "MouseEventHandler<HTMLButtonElement>";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.surface.raised", "color.surface.subtle", "color.content.primary", "color.content.muted", "color.content.disabled", "color.border.subtle", "color.border.default", "color.action.neutral.surfacePressed", "color.codeChange.added", "color.codeChange.removed", "color.focus.ring", "control.activityItem.inlineGap", "control.activityItem.inlineIconSize", "type.meta.fontSize", "type.label.md.fontSize", "type.label.sm.fontWeight", "control.activityItem.surfaceHeight", "control.activityItem.surfaceGap", "control.activityItem.surfacePaddingBlock", "control.activityItem.surfacePaddingInlineStart", "control.activityItem.surfacePaddingInlineEnd", "control.activityItem.surfaceRadius", "control.activityItem.surfaceIconSize", "control.activityItem.contentGap", "control.activityItem.dividerBlockSize", "control.changeCount.gap", "control.changeCount.paddingBlock", "control.changeCount.paddingInline", "control.changeCount.radius", "control.iconButton.xsSize", "control.iconButton.xsIconSize"];
}, {
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
}, {
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
}, {
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
}, {
    readonly category: "flow-chat";
    readonly description: "A low-attention tool trace that stays glanceable in the conversation and can reveal supporting detail.";
    readonly maturity: "stable";
    readonly name: "AmbientToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "header";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "requiresConfirmation";
        readonly type: "boolean";
    }, {
        readonly name: "expandedContent";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "inset";
        readonly name: "expandedContentLayout";
        readonly type: "'inset' | 'flush'";
    }, {
        readonly name: "onClick";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error", "confirmation"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.tertiary", "color.action.neutral.surface", "color.status.danger.content", "color.status.warning.emphasis", "control.height.md", "control.toolCard.ambientRowMinBlockSize", "control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "font.family.sans", "font.size.sm", "font.size.xl", "font.weight.medium", "font.weight.regular", "radius.md", "radius.sm", "shadow.xs"];
}, {
    readonly category: "flow-chat";
    readonly description: "A controlled question card with step navigation, shared selection controls, and custom answers that becomes a question-and-answer message after submission.";
    readonly maturity: "stable";
    readonly name: "AskUser";
    readonly props: readonly [{
        readonly name: "questions";
        readonly type: "readonly AskUserQuestion[]";
    }, {
        readonly defaultValue: "{}";
        readonly name: "answers";
        readonly type: "AskUserAnswers";
    }, {
        readonly defaultValue: "asking";
        readonly name: "state";
        readonly type: "AskUserState";
    }, {
        readonly name: "navigation";
        readonly type: "AskUserNavigation";
    }, {
        readonly name: "waitTiming";
        readonly type: "AskUserWaitTiming";
    }, {
        readonly name: "disclosure";
        readonly type: "{ label: ReactNode; collapseLabel: string; skipped?: boolean }";
    }, {
        readonly name: "summaryLabel";
        readonly type: "ReactNode";
    }, {
        readonly name: "summaryDetail";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "expanded";
        readonly type: "boolean";
    }, {
        readonly name: "onAnswersChange";
        readonly type: "(questionId, values) => void";
    }, {
        readonly name: "onSubmit";
        readonly type: "() => void";
    }];
    readonly states: readonly ["asking", "selected", "submitting", "submitted", "completed", "loading", "error", "disabled"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.surfaceHover", "color.action.quiet.hover", "color.border.default", "color.border.subtle", "color.content.disabled", "color.content.inverse", "color.content.muted", "color.content.primary", "color.content.secondary", "color.focus.ring", "color.status.danger.border", "color.status.danger.content", "color.status.danger.surface", "color.status.success.content", "color.status.warning.border", "color.status.warning.content", "color.status.warning.surface", "color.surface.panel", "color.surface.subtle", "control.askUser.bodyGap", "control.askUser.bodyPadding", "control.activityItem.surfaceHeight", "control.activityItem.surfacePaddingBlock", "control.flowChat.cardPaddingInline", "control.flowChat.userMessageMaxWidth", "control.flowChat.userMessagePaddingBlock", "control.flowChat.userMessageRadius", "type.flow.control.fontFamily", "type.flow.control.fontSize", "type.flow.control.fontWeight", "type.flow.body.lineHeight", "type.flow.meta.fontFamily", "type.flow.meta.fontSize", "type.flow.meta.fontWeight", "type.flow.meta.lineHeight", "type.body.sm.lineHeight", "control.icon.sizeMd", "control.askUser.optionContentGap", "control.askUser.optionGap", "control.askUser.optionPaddingBlock", "control.askUser.optionPaddingInline", "control.askUser.questionOptionsGap", "control.askUser.summaryActionSize", "control.askUser.summaryPaddingBlock", "control.askUser.summaryPaddingInlineEnd", "control.askUser.summaryPaddingInlineStart", "control.hitTarget", "type.code.sm.fontFamily", "font.family.control", "font.size.sm", "font.size.xs", "font.weight.medium", "font.weight.regular", "font.weight.semibold", "lineHeight.base", "lineHeight.tight", "radius.base", "radius.lg", "radius.xs"];
}, {
    readonly category: "primitive";
    readonly description: "A compact image, icon, or text identity with grouped overflow composition.";
    readonly maturity: "stable";
    readonly name: "Avatar";
    readonly props: readonly [{
        readonly name: "src";
        readonly type: "string";
    }, {
        readonly name: "size";
        readonly type: "sm | md | lg";
        readonly defaultValue: "md";
    }, {
        readonly name: "shape";
        readonly type: "circle | square";
        readonly defaultValue: "circle";
    }];
    readonly states: readonly ["image", "fallback", "grouped"];
    readonly tokens: readonly ["color.content.secondary", "color.surface.subtle", "color.field.border", "control.height.sm", "control.height.md", "control.height.lg", "radius.base", "radius.pill"];
}, {
    readonly category: "action";
    readonly description: "An action with outline, quiet neutral text, link text, floating glass, neutral fill, secondary, and primary presentation.";
    readonly maturity: "stable";
    readonly name: "Button";
    readonly props: readonly [{
        readonly defaultValue: "outline";
        readonly name: "variant";
        readonly type: "outline | glass | fill | secondary | primary | quiet | text";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "xs | sm | md | lg";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "neutral | danger";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "overflow";
        readonly name: "labelBehavior";
        readonly type: "overflow | static";
    }, {
        readonly name: "leadingIcon";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailingIcon";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "hover", "active", "disabled"];
    readonly tokens: readonly ["color.surface.raised", "color.border.subtle", "effect.blur.subtle", "opacity.iconArtwork", "component.button.content", "component.button.outlineBorder", "component.button.outlineBorderInteractive", "component.button.fillBackground", "component.button.fillBackgroundHover", "component.button.fillBackgroundPressed", "component.button.primaryBackground", "component.button.primaryBackgroundHover", "component.button.primaryBackgroundPressed", "component.button.primaryContentDisabled", "component.button.textContent", "component.button.textContentHover", "component.button.textContentDisabled", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.primary.content", "color.surface.tertiary", "color.border.default", "color.content.primary", "color.content.secondary", "color.border.strong", "color.focus.ring", "color.status.danger.border", "color.status.danger.content", "color.status.danger.surface", "control.height.sm", "control.height.md", "control.height.lg", "control.button.xsHeight", "control.button.xsPaddingInline", "control.button.xsLeadingIconSize", "control.button.xsTrailingIconSize", "type.meta.fontSize", "type.label.sm.fontSize", "type.label.md.fontSize", "type.label.lg.fontSize", "type.label.selected.fontWeight", "radius.pill", "radius.base", "space.3"];
}, {
    readonly category: "action";
    readonly description: "A capsule composition with a circular glass action that overlays the label or occupies reserved space inside its Button surface. Reserved content is centered at rest and shifts aside when the action appears, without changing layout; touch keeps the action available.";
    readonly maturity: "stable";
    readonly name: "Capsule";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "actionPlacement";
        readonly type: "overlay | reserved";
        readonly defaultValue: "overlay";
    }, {
        readonly name: "size";
        readonly type: "xs | sm | md | lg";
        readonly defaultValue: "sm";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "disabled"];
    readonly tokens: readonly ["control.button.xsHeight", "control.height.sm", "control.height.md", "control.height.lg", "control.iconButton.xsSize", "color.surface.raised", "color.border.subtle", "effect.blur.subtle", "radius.pill"];
}, {
    readonly category: "primitive";
    readonly description: "A composable content surface with independent media, header, body, footer, spacing, clipping, and elevation contracts.";
    readonly maturity: "stable";
    readonly name: "Card";
    readonly props: readonly [{
        readonly defaultValue: "subtle";
        readonly name: "appearance";
        readonly type: "raised | subtle | neutral";
    }, {
        readonly defaultValue: "none";
        readonly name: "padding";
        readonly type: "none | sm | md";
    }, {
        readonly defaultValue: "none";
        readonly name: "gap";
        readonly type: "none | sm | md | lg";
    }, {
        readonly defaultValue: "md";
        readonly name: "radius";
        readonly type: "none | sm | md | lg";
    }, {
        readonly defaultValue: "false";
        readonly name: "clip";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "start";
        readonly name: "CardHeader.contentAlign";
        readonly type: "start | center | end";
    }, {
        readonly defaultValue: "stretch";
        readonly name: "CardBody.align";
        readonly type: "start | center | end | stretch";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["raised", "subtle", "media"];
    readonly tokens: readonly ["color.surface.raised", "color.surface.subtle", "color.surface.canvas", "color.action.neutral.surface", "color.content.primary", "color.content.secondary", "color.border.subtle", "shadow.overlay", "layout.card.paddingSm", "layout.card.paddingMd", "layout.card.gapSm", "layout.card.gapMd", "layout.card.gapLg", "layout.card.radiusSm", "layout.card.radiusMd", "layout.card.radiusLg", "layout.card.headerGap", "layout.card.titleDescriptionGap", "layout.card.footerGap", "layout.card.mediaMinBlockSize", "type.heading.card.fontSize", "type.body.sm.fontSize"];
}, {
    readonly category: "form";
    readonly description: "A native checkbox with indeterminate, invalid, label, and description states.";
    readonly maturity: "stable";
    readonly name: "Checkbox";
    readonly props: readonly [{
        readonly name: "appearance";
        readonly type: "custom | native";
        readonly defaultValue: "custom";
    }, {
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly name: "readOnly";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "indeterminate";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "invalid";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "size";
        readonly type: "sm | md | lg";
        readonly defaultValue: "md";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "checked", "indeterminate", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.field.background", "color.field.border", "color.control.highlight.background", "color.control.switch.thumb", "color.focus.ring"];
}, {
    readonly category: "flow-chat";
    readonly description: "A slot-based FlowChat composer with context, pending-message queue, and compact or expanded input anatomy.";
    readonly maturity: "stable";
    readonly name: "ChatComposer";
    readonly props: readonly [{
        readonly defaultValue: "compact";
        readonly name: "layout";
        readonly type: "compact | expanded";
    }, {
        readonly name: "contextBar";
        readonly type: "ReactNode";
    }, {
        readonly name: "queue";
        readonly type: "ReactNode";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "startActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "endActions";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "busy";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "expanded", "queued", "focus-visible", "busy", "disabled"];
    readonly tokens: readonly ["border.width.default", "color.composer.border", "color.composer.contextBackground", "control.composer.contextBlur", "control.composer.surfaceRadius", "control.composer.surfacePadding", "control.composer.surfaceGap", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.action.primary.background", "color.action.primary.content", "color.action.primary.hover", "color.action.primary.pressed", "color.border.default", "color.content.muted", "color.content.primary", "color.content.secondary", "color.surface.panel", "color.surface.raised", "color.surface.subtle", "control.chatComposer.actionIconSize", "control.chatComposer.compactGap", "control.chatComposer.compactHeight", "control.chatComposer.compactPaddingBlock", "control.chatComposer.compactPaddingInline", "control.chatComposer.compactTrackHeight", "control.chatComposer.controlHeight", "control.height.md", "font.family.control", "font.size.base", "font.size.sm", "font.weight.medium", "font.weight.regular", "radius.lg", "radius.2xl", "radius.pill", "shadow.composer", "space.1", "space.2", "space.3", "space.4", "space.6", "space.8", "space.12"];
}, {
    readonly category: "flow-chat";
    readonly name: "ThinkingBlock";
    readonly maturity: "stable";
    readonly description: "Controlled reasoning and reasoning-summary anatomy shared with the production transcript.";
    readonly props: readonly [{
        readonly name: "expanded";
        readonly type: "boolean";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "onOpenDetails";
        readonly type: "() => void";
    }, {
        readonly name: "streamingExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onStreamingExpandedChange";
        readonly type: "(expanded: boolean) => void";
    }, {
        readonly name: "scrollOwner";
        readonly type: "'self' | 'parent'";
        readonly defaultValue: "self";
    }];
    readonly states: readonly ["collapsed", "expanded", "streaming", "summary"];
    readonly tokens: readonly ["control.flowChat.rowIconGap", "type.flow.control.fontSize", "color.content.secondary", "color.content.muted", "control.flowChat.streamViewportBlockSize"];
}, {
    readonly category: "flow-chat";
    readonly name: "FlowGroup";
    readonly maturity: "stable";
    readonly description: "A controlled collection with capsule or bound file-revision summaries, shared disclosure and natural-height content.";
    readonly props: readonly [{
        readonly name: "expanded";
        readonly type: "boolean";
    }, {
        readonly name: "summary";
        readonly type: "string";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "onExpandedChange";
        readonly type: "(expanded: boolean) => void";
    }, {
        readonly name: "itemCount";
        readonly type: "number";
    }, {
        readonly name: "receiveFeedback";
        readonly type: "FlowGroupReceiveFeedback";
    }, {
        readonly name: "contentProps";
        readonly type: "HTMLAttributes<HTMLDivElement>";
    }, {
        readonly name: "browser";
        readonly type: "FlowGroupBrowserProps";
    }, {
        readonly name: "fileRevision";
        readonly type: "FlowGroupFileRevision";
    }, {
        readonly name: "placement";
        readonly type: "'standalone' | 'inline'";
        readonly defaultValue: "standalone";
    }, {
        readonly name: "bounded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }];
    readonly states: readonly ["collapsed", "expanded", "streaming", "file-collapsed", "file-expanded", "file-error"];
    readonly tokens: readonly ["control.flowChat.rowIconGap", "type.flow.control.fontSize", "color.content.secondary", "color.content.muted", "type.flow.control.fontFamily", "type.flow.control.fontWeight", "type.flow.control.lineHeight", "type.flow.control.letterSpacing", "color.content.disabled", "color.action.quiet.hover", "color.action.quiet.pressed", "border.width.default", "control.statusPill.radius", "control.statusPill.paddingBlock", "control.statusPill.paddingInline", "control.height.sm", "control.height.lg", "control.toolCard.ambientRowMinBlockSize", "control.flowChat.streamViewportBlockSize", "space.1", "space.2", "space.6", "layout.scrollArea.fadeExtent", "motion.duration.fast", "motion.easing.standard", "color.surface.panel", "color.border.default", "color.border.strong", "color.status.danger.content", "control.activityItem.surfaceHeight", "control.activityItem.surfaceRadius", "type.body.xs.fontSize"];
}, {
    readonly category: "flow-chat";
    readonly name: "ExploreGroup";
    readonly maturity: "stable";
    readonly description: "A controlled exploration group with a quiet filled capsule, a separate disclosure hit target and natural-height content.";
    readonly props: readonly [{
        readonly name: "expanded";
        readonly type: "boolean";
    }, {
        readonly name: "summary";
        readonly type: "string";
    }, {
        readonly name: "placement";
        readonly type: "'standalone' | 'inline'";
        readonly defaultValue: "standalone";
    }, {
        readonly name: "summaryItems";
        readonly type: "readonly { label: string; count: string }[]";
    }, {
        readonly name: "summaryDescription";
        readonly type: "string";
    }, {
        readonly name: "bounded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }];
    readonly states: readonly ["collapsed", "expanded", "streaming"];
    readonly tokens: readonly ["control.flowChat.rowIconGap", "type.flow.control.fontSize", "color.content.secondary", "color.content.muted", "type.flow.control.fontFamily", "type.flow.control.fontWeight", "type.flow.control.lineHeight", "type.flow.control.letterSpacing", "color.content.disabled", "color.action.quiet.hover", "color.action.quiet.pressed", "border.width.default", "control.statusPill.radius", "control.statusPill.paddingBlock", "control.statusPill.paddingInline", "control.height.sm", "control.height.lg", "control.toolCard.ambientRowMinBlockSize", "control.flowChat.streamViewportBlockSize", "space.1", "space.2", "space.6"];
}, {
    readonly name: "ContextLoadGroup";
    readonly description: "A controlled context-loading group for skills, tool specifications and capability discovery.";
    readonly props: ({
        readonly name: "expanded";
        readonly type: "boolean";
    } | {
        readonly name: "summary";
        readonly type: "string";
    } | {
        readonly name: "placement";
        readonly type: "'standalone' | 'inline'";
        readonly defaultValue: "standalone";
    } | {
        readonly name: "summaryDescription";
        readonly type: "string";
    } | {
        readonly name: "bounded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    })[];
    readonly category: "flow-chat";
    readonly maturity: "stable";
    readonly states: readonly ["collapsed", "expanded", "streaming"];
    readonly tokens: readonly ["control.flowChat.rowIconGap", "type.flow.control.fontSize", "color.content.secondary", "color.content.muted", "type.flow.control.fontFamily", "type.flow.control.fontWeight", "type.flow.control.lineHeight", "type.flow.control.letterSpacing", "color.content.disabled", "color.action.quiet.hover", "color.action.quiet.pressed", "border.width.default", "control.statusPill.radius", "control.statusPill.paddingBlock", "control.statusPill.paddingInline", "control.height.sm", "control.height.lg", "control.toolCard.ambientRowMinBlockSize", "control.flowChat.streamViewportBlockSize", "space.1", "space.2", "space.6"];
}, {
    readonly category: "flow-chat";
    readonly name: "FlowChatRuntimeStatus";
    readonly maturity: "stable";
    readonly description: "A resident runtime-status view with host-controlled visibility and submission delay.";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly name: "visible";
        readonly type: "boolean";
    }, {
        readonly name: "revealDelayMs";
        readonly type: "number";
    }];
    readonly states: readonly ["visible", "hidden"];
    readonly tokens: readonly ["control.flowChat.rowIconGap", "type.flow.control.fontSize", "color.content.secondary", "color.content.muted"];
}, {
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
}, {
    readonly category: "flow-chat";
    readonly description: "A FlowChat command card with ambient or prominent presentation, a continuous expanded command/output surface, result status, metadata, and capability-driven actions.";
    readonly maturity: "stable";
    readonly name: "CommandToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "prominent";
        readonly name: "attention";
        readonly type: "ambient | prominent";
    }, {
        readonly name: "command";
        readonly type: "string | null";
    }, {
        readonly name: "interaction";
        readonly type: "ToolCardInteraction";
    }, {
        readonly name: "isExpanded";
        readonly type: "boolean";
    }, {
        readonly name: "output";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "fixed";
        readonly name: "outputSizing";
        readonly type: "content | fixed";
    }, {
        readonly defaultValue: "false";
        readonly name: "reserveOutput";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "reserveFooter";
        readonly type: "boolean";
    }, {
        readonly name: "footerItems";
        readonly type: "readonly CommandToolCardFooterItem[]";
    }, {
        readonly name: "copyAction";
        readonly type: "CommandToolCardCopyAction";
    }, {
        readonly name: "statusLabel";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "statusTone";
        readonly type: "danger | neutral | success | warning";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error", "confirmation"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "color.action.neutral.surface", "color.border.subtle", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "color.status.success.content", "color.status.success.emphasis", "color.status.warning.content", "color.surface.canvas", "color.surface.raised", "font.family.sans", "font.size.sm", "font.weight.regular", "radius.sm", "radius.lg", "type.flow.code.fontFamily", "type.flow.code.fontSize"];
}, {
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
}, {
    readonly category: "form";
    readonly description: "A composable message editor shell with independent context, editor, and action regions.";
    readonly maturity: "stable";
    readonly name: "Composer";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "contextBar";
        readonly type: "ReactNode";
    }, {
        readonly name: "toolbar";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "focus-within", "with-context", "invalid", "disabled"];
    readonly tokens: readonly ["color.surface.raised", "color.composer.contextBackground", "control.composer.contextBlur", "color.surface.panel", "color.border.subtle", "color.content.primary", "color.content.muted", "color.content.disabled", "color.composer.border", "color.field.borderFocus", "color.focus.ring", "color.status.danger.border", "color.status.danger.surface", "control.composer.minBlockSize", "control.composer.contextOffset", "control.composer.contextPaddingBlock", "control.composer.contextPaddingInline", "control.composer.contextGap", "control.composer.surfacePadding", "control.composer.surfaceGap", "control.composer.surfaceRadius", "control.composer.editorPadding", "control.composer.toolbarGap", "control.composer.dividerBlockSize", "type.body.sm.fontSize", "shadow.composer"];
}, {
    readonly category: "form";
    readonly description: "A searchable single-value selector with an embedded search header and grouped options on one anchored surface, plus clearing and explicit value creation.";
    readonly maturity: "stable";
    readonly name: "Combobox";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly ComboboxOption[]";
    }, {
        readonly name: "value";
        readonly type: "ComboboxValue";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: ComboboxValue) => void";
    }, {
        readonly name: "onCreateValue";
        readonly type: "(input: string) => ComboboxValue | void";
    }, {
        readonly defaultValue: "false";
        readonly name: "clearable";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }];
    readonly states: readonly ["default", "open", "searching", "custom", "invalid", "disabled", "loading", "empty"];
    readonly tokens: readonly ["color.field.background", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderFocus", "color.content.primary", "color.content.secondary", "color.content.muted", "color.content.disabled", "color.control.highlight.background", "color.action.neutral.content", "color.action.neutral.surface", "color.border.subtle", "color.border.default", "color.surface.panel", "color.focus.ring", "color.status.danger.border", "control.height.sm", "control.height.md", "control.height.lg", "control.select.paddingInline", "control.select.radius", "control.select.indicatorSize", "control.select.contentGap", "control.select.trailingInset", "control.iconButton.xsSize", "overlay.menu.inlineSize", "overlay.menu.surfacePadding", "overlay.menu.surfaceRadius", "overlay.menu.rowGap", "overlay.menu.itemIconSize", "shadow.menu", "type.label.selected.fontWeight"];
}, {
    readonly category: "feedback";
    readonly description: "Composes semantic confirmation content, optional preview material, async actions, and dismissal policy on the shared Dialog contract.";
    readonly maturity: "stable";
    readonly name: "ConfirmDialog";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "message";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "warning";
        readonly name: "type";
        readonly type: "info | warning | error | success";
    }, {
        readonly name: "confirmText";
        readonly type: "ReactNode";
    }, {
        readonly name: "secondaryText";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "inline";
        readonly name: "secondaryActionPlacement";
        readonly type: "inline | start";
    }, {
        readonly name: "cancelText";
        readonly type: "ReactNode";
    }, {
        readonly name: "preview";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "confirmDanger";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "true";
        readonly name: "showCancel";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "showCloseButton";
        readonly type: "boolean";
    }, {
        readonly name: "pendingAction";
        readonly type: "confirm | secondary | null";
    }, {
        readonly name: "onConfirm";
        readonly type: "() => void | Promise<void>";
    }, {
        readonly name: "onSecondary";
        readonly type: "() => void | Promise<void>";
    }, {
        readonly name: "onActionError";
        readonly type: "(error: unknown, action: confirm | secondary) => void";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: ConfirmDialogCloseReason) => void";
    }];
    readonly states: readonly ["info", "warning", "error", "success", "pending"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.surface.tertiary", "color.border.subtle", "color.status.info.emphasis", "color.status.success.emphasis", "color.status.warning.emphasis", "color.status.danger.emphasis", "layout.confirmDialog.contentGap", "layout.confirmDialog.messageGap", "layout.confirmDialog.iconGlyphSize", "layout.confirmDialog.previewMaxBlockSize", "layout.confirmDialog.previewPaddingBlock", "layout.confirmDialog.previewPaddingInline", "layout.confirmDialog.previewRadius", "type.body.md.fontSize", "type.code.sm.fontSize", "space.2", "space.3", "space.4"];
}, {
    readonly category: "flow-chat";
    readonly description: "A concrete prominent FlowChat card with a compact context-length and compression-ratio result.";
    readonly maturity: "stable";
    readonly name: "ContextCompressionToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "processingText";
        readonly type: "ReactNode";
    }, {
        readonly name: "error";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "loading", "error"];
    readonly tokens: readonly ["color.content.secondary", "color.content.muted", "color.status.danger.content", "font.family.sans", "font.size.sm"];
}, {
    readonly category: "flow-chat";
    readonly name: "ControlHubToolCard";
    readonly maturity: "stable";
    readonly description: "An action-aware browser, terminal and capability card with structured targets, results and recoverable failure details.";
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
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "error";
        readonly type: "ReactNode";
    }, {
        readonly name: "attention";
        readonly type: "\"ambient\" | \"prominent\"";
    }, {
        readonly name: "domain";
        readonly type: "\"browser\" | \"terminal\" | \"meta\" | \"unknown\"";
    }, {
        readonly name: "fields";
        readonly type: "readonly ToolCardField[]";
    }, {
        readonly name: "records";
        readonly type: "readonly ControlHubToolCardRecord[]";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "confirmation", "error"];
    readonly tokens: readonly ["control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "space.1", "space.2", "space.3", "space.4", "type.body.sm.fontSize", "type.flow.code.fontFamily"];
}, {
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
}, {
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
}, {
    readonly category: "primitive";
    readonly description: "Reveals supporting content with controlled or uncontrolled state, accessible relationships, and independent header actions.";
    readonly maturity: "stable";
    readonly name: "Disclosure";
    readonly props: readonly [{
        readonly name: "renderHeader";
        readonly type: "(triggerProps: DisclosureTriggerProps) => ReactNode";
    }, {
        readonly name: "contentClassName";
        readonly type: "string";
    }, {
        readonly name: "contentInnerClassName";
        readonly type: "string";
    }, {
        readonly name: "unmountOnClose";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "exitDurationMs";
        readonly type: "number";
        readonly defaultValue: "180";
    }, {
        readonly name: "presentation";
        readonly type: "custom | native";
        readonly defaultValue: "custom";
    }, {
        readonly name: "summary";
        readonly type: "ReactNode";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "actions";
        readonly type: "ReactNode";
    }, {
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "defaultOpen";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: boolean) => void";
    }, {
        readonly name: "onToggle";
        readonly type: "ToggleEventHandler<HTMLDetailsElement> (native only)";
    }];
    readonly states: readonly ["closed", "open", "hover", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfacePressed", "color.content.muted", "color.focus.ring", "type.label.md.fontSize", "type.body.sm.lineHeight", "type.support.fontSize", "layout.disclosure.triggerMinBlockSize", "layout.disclosure.triggerPaddingBlock", "layout.disclosure.triggerPaddingInline", "layout.disclosure.triggerGap", "layout.disclosure.triggerRadius", "layout.disclosure.indicatorSize", "layout.disclosure.actionsGap", "layout.disclosure.contentPaddingBlock", "layout.disclosure.contentPaddingInline", "space.1"];
}, {
    readonly category: "feedback";
    readonly description: "Explains an empty result or unavailable collection with optional identity and actions.";
    readonly maturity: "stable";
    readonly name: "Empty";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }, {
        readonly name: "actions";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "md";
        readonly name: "imageSize";
        readonly type: "sm | md | lg";
    }];
    readonly states: readonly ["default", "with-title", "with-actions"];
    readonly tokens: readonly ["component.empty.media", "color.content.muted", "layout.empty.gap", "layout.empty.paddingBlock", "layout.empty.paddingInline", "layout.empty.mediaSizeSm", "layout.empty.mediaSizeMd", "layout.empty.mediaSizeLg", "layout.empty.iconSizeSm", "layout.empty.iconSizeMd", "layout.empty.iconSizeLg", "type.label.md.fontSize", "type.body.sm.fontSize"];
}, {
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
}, {
    readonly category: "form";
    readonly description: "Associates label content, optional actions, description, and adjacent controls with one primary form control.";
    readonly maturity: "stable";
    readonly name: "Field";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "error";
        readonly type: "ReactNode";
    }, {
        readonly name: "labelAction";
        readonly type: "ReactNode";
    }, {
        readonly name: "controlLeading";
        readonly type: "ReactNode";
    }, {
        readonly name: "controlTrailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "auto";
        readonly name: "controlWidth";
        readonly type: "auto | fill";
    }, {
        readonly defaultValue: "auto";
        readonly name: "labelWidth";
        readonly type: "auto | sm | md | lg";
    }, {
        readonly defaultValue: "md";
        readonly name: "horizontalGap";
        readonly type: "md | lg";
    }, {
        readonly defaultValue: "false";
        readonly name: "required";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "vertical";
        readonly name: "orientation";
        readonly type: "horizontal | vertical";
    }, {
        readonly name: "children";
        readonly type: "ReactElement";
    }];
    readonly states: readonly ["default", "invalid"];
    readonly tokens: readonly ["color.content.requiredIndicator", "color.content.primary", "color.content.secondary", "color.status.danger.content", "layout.field.rootGap", "layout.field.horizontalGap", "layout.field.horizontalGapWide", "layout.field.labelWidthSm", "layout.field.labelWidthMd", "layout.field.labelWidthLg", "layout.field.contentGap", "layout.field.labelGap", "layout.field.labelActionGap", "layout.field.controlGap", "type.label.selected.fontSize", "type.meta.fontSize", "type.fieldHelper.lineHeight", "type.support.fontSize"];
}, {
    readonly category: "form";
    readonly description: "Composes titled form sections, grouped field surfaces, and independently padded rows without coupling product settings semantics into the library.";
    readonly maturity: "stable";
    readonly name: "FieldGroup";
    readonly props: readonly [{
        readonly name: "FormSection.title";
        readonly type: "ReactNode";
    }, {
        readonly name: "FormSection.description";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "stacked";
        readonly name: "FormSection.descriptionLayout";
        readonly type: "stacked | inline";
    }, {
        readonly name: "FormSection.leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "FormSection.actions";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "h2";
        readonly name: "FormSection.headingAs";
        readonly type: "h2 | h3 | h4";
    }, {
        readonly defaultValue: "subtle";
        readonly name: "appearance";
        readonly type: "subtle | plain";
    }, {
        readonly defaultValue: "default";
        readonly name: "fieldSurface";
        readonly type: "default | ambient";
    }, {
        readonly defaultValue: "true";
        readonly name: "dividers";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "center";
        readonly name: "FieldRow.align";
        readonly type: "center | start";
    }, {
        readonly defaultValue: "md";
        readonly name: "FieldRow.padding";
        readonly type: "none | md";
    }];
    readonly states: readonly ["subtle", "plain", "divided"];
    readonly tokens: readonly ["color.field.groupBackground", "color.content.primary", "color.border.subtle", "color.field.background", "color.field.backgroundHover", "layout.formSection.gap", "layout.formSection.headerGap", "layout.formSection.titleDescriptionGap", "type.heading.section.fontSize", "type.body.sm.fontSize", "type.formDescription.lineHeight", "layout.fieldGroup.radius", "layout.fieldGroup.rowPaddingBlock", "layout.fieldGroup.rowPaddingInline"];
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
    readonly category: "primitive";
    readonly description: "Lucide icons with shared size, tone and accessibility, plus reviewed brand-derived mode, reasoning, thinking and Git artwork.";
    readonly maturity: "stable";
    readonly name: "Icon";
    readonly props: readonly [{
        readonly name: "name";
        readonly type: "IconName";
    }, {
        readonly name: "glyph";
        readonly type: "LucideIcon";
    }, {
        readonly defaultValue: "lg";
        readonly name: "size";
        readonly type: "2xs | xs | sm | md | lg";
    }, {
        readonly defaultValue: "inherit";
        readonly name: "tone";
        readonly type: "inherit | primary | secondary | muted | disabled | info | success | warning | danger";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["opacity.iconArtwork", "color.content.primary", "color.content.secondary", "color.content.muted", "color.content.disabled", "color.status.info.content", "color.status.success.content", "color.status.warning.content", "color.status.danger.content", "control.icon.size2xs", "control.icon.sizeXs", "control.icon.sizeSm", "control.icon.sizeMd", "control.icon.sizeLg"];
}, {
    readonly category: "action";
    readonly description: "A labeled icon-only action with annotation, quiet, glass, outlined, filled, and primary variants. Glass floats over intact content; capsule and tab action slots select it automatically.";
    readonly maturity: "stable";
    readonly name: "IconButton";
    readonly props: readonly [{
        readonly name: "aria-label";
        readonly type: "string";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "quiet";
        readonly name: "variant";
        readonly type: "annotation | quiet | glass | outline | fill | primary";
    }, {
        readonly defaultValue: "square";
        readonly name: "shape";
        readonly type: "square | circle";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "xs | standard | sm | md | lg";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "neutral | danger";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled", "loading"];
    readonly tokens: readonly ["color.surface.raised", "color.border.subtle", "effect.blur.subtle", "opacity.iconArtwork", "color.content.primary", "color.content.secondary", "color.content.muted", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.action.primary.background", "color.action.primary.content", "color.action.primary.hover", "color.action.primary.pressed", "color.surface.tertiary", "color.focus.ring", "color.status.danger.content", "color.status.danger.surface", "control.height.sm", "control.height.md", "control.height.lg", "control.iconButton.xsSize", "control.iconButton.xsIconSize", "control.icon.sizeXs", "control.iconButton.standardSize", "control.iconButton.standardIconSize", "radius.xs", "radius.sm", "radius.pill"];
}, {
    readonly category: "feedback";
    readonly description: "The thinking mark forms node by node, holds its complete shape, then dissolves in reverse order.";
    readonly maturity: "stable";
    readonly name: "ThinkingIndicator";
    readonly props: readonly [{
        readonly defaultValue: "true";
        readonly name: "active";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "2xs | xs | sm | md | lg";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["active", "static"];
    readonly tokens: readonly ["control.icon.size2xs", "control.icon.sizeXs", "control.icon.sizeSm", "control.icon.sizeMd", "control.icon.sizeLg"];
}, {
    readonly category: "form";
    readonly description: "A native text field with independent leading and trailing content slots.";
    readonly maturity: "stable";
    readonly name: "Input";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "placeholder";
        readonly type: "string";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "hideNativePasswordReveal";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "rounded";
        readonly name: "shape";
        readonly type: "rounded | pill";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "xs | sm | md | lg";
    }, {
        readonly defaultValue: "false";
        readonly name: "readOnly";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }];
    readonly states: readonly ["default", "filled", "hover", "focus-visible", "read-only", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.field.background", "color.field.placeholder", "opacity.iconArtwork", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderActive", "color.accent.default", "color.status.danger.border", "control.height.sm", "control.height.md", "control.height.lg", "control.button.xsHeight", "control.button.xsPaddingInline", "control.button.xsLeadingIconSize", "type.meta.fontSize", "type.label.md.fontSize", "radius.base", "radius.pill"];
}, {
    readonly category: "primitive";
    readonly description: "A semantic keyboard hint with optional decorative icon content.";
    readonly maturity: "stable";
    readonly name: "KeyHint";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["color.keyHint.content", "color.keyHint.background", "type.micro.fontSize", "type.modifier.leading.none.lineHeight", "radius.xs"];
}, {
    readonly category: "action";
    readonly description: "A shell-edge launcher with a leading icon and distinct default, hover, and pressed emphasis states.";
    readonly maturity: "stable";
    readonly name: "LauncherButton";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leadingIcon";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.control.launcher.background", "color.control.launcher.backgroundHover", "color.control.launcher.backgroundPressed", "color.control.launcher.content", "color.control.launcher.contentHover", "color.control.launcher.contentPressed", "color.control.launcher.contentDisabled", "color.focus.ring", "control.launcherButton.minInlineSize", "control.launcherButton.blockSize", "control.launcherButton.paddingInline", "control.launcherButton.gap", "control.launcherButton.iconSize", "control.launcherButton.radius", "type.code.meta.fontSize"];
}, {
    readonly category: "form";
    readonly description: "A scrollable single- or multi-select option surface with grouped, descriptive rows.";
    readonly maturity: "stable";
    readonly name: "Listbox";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "roving";
        readonly name: "focusMode";
        readonly type: "roving | virtual";
    }, {
        readonly defaultValue: "false";
        readonly name: "autoFocusOption";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "multiple";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "auto";
        readonly name: "scrollbarVisibility";
        readonly type: "auto | always | hidden";
    }];
    readonly states: readonly ["default", "active-option", "selected-option", "disabled-option", "multiple"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfacePressed", "color.content.muted", "color.focus.ring", "overlay.menu.maxBlockSize", "overlay.menu.scrollbarGap", "overlay.menu.rowGap", "overlay.menu.sectionGap", "overlay.menu.headingHeight", "overlay.menu.headingPaddingInline", "overlay.menu.itemHeight", "overlay.menu.itemPaddingInline", "overlay.menu.itemGap", "overlay.menu.itemRadius", "overlay.menu.itemIconSize", "type.meta.fontSize"];
}, {
    readonly category: "flow-chat";
    readonly name: "ListModelsToolCard";
    readonly maturity: "stable";
    readonly description: "An ambient model discovery card with provider, model name, configuration ID, query and empty-result details.";
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
        readonly name: "isExpanded";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "error";
        readonly type: "ReactNode";
    }, {
        readonly name: "models";
        readonly type: "readonly ListModelsToolCardModel[]";
    }, {
        readonly name: "query";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error"];
    readonly tokens: readonly ["control.flowChat.rowIconSize", "control.flowChat.rowIconGap", "color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "space.1", "space.2", "space.3", "space.4", "type.body.sm.fontSize", "type.flow.code.fontFamily"];
}, {
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
}, {
    readonly category: "navigation";
    readonly description: "Grouped menu anatomy plus anchored MenuPopover with nested keyboard navigation, pointer corridors and focus return.";
    readonly maturity: "stable";
    readonly name: "Menu";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "MenuList.children";
        readonly type: "ReactNode (row stack inside custom scroll or animation wrappers)";
    }, {
        readonly defaultValue: "false";
        readonly name: "autoFocusFirstItem";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "auto";
        readonly name: "scrollbarVisibility";
        readonly type: "auto | always | hidden";
    }, {
        readonly defaultValue: "fixed";
        readonly name: "inlineSize";
        readonly type: "fixed | content";
    }, {
        readonly name: "MenuPopover.items";
        readonly type: "readonly MenuEntry[]";
    }, {
        readonly name: "MenuPopover.open / onClose";
        readonly type: "boolean / () => void";
    }, {
        readonly name: "MenuPopover.anchorRef / position";
        readonly type: "RefObject<HTMLElement> / { x: number; y: number }";
    }, {
        readonly name: "MenuPopover.placement";
        readonly type: "top | bottom | left | right";
        readonly defaultValue: "bottom";
    }, {
        readonly name: "MenuPopover.portalContainer";
        readonly type: "Element | DocumentFragment | (() => Element | null)";
    }];
    readonly states: readonly ["default", "scrolling", "focus-within", "disabled-item", "checked-item"];
    readonly tokens: readonly ["color.surface.panel", "color.border.subtle", "color.content.muted", "color.content.caption", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.selection.surface", "color.focus.ring", "overlay.menu.inlineSize", "overlay.menu.minInlineSize", "overlay.menu.maxBlockSize", "overlay.menu.surfacePadding", "overlay.menu.surfaceRadius", "overlay.menu.rowGap", "overlay.menu.sectionGap", "overlay.menu.headingHeight", "overlay.menu.headingPaddingInline", "overlay.menu.headingGap", "type.meta.fontSize", "overlay.menu.headingActionSize", "overlay.menu.itemHeight", "overlay.menu.itemPaddingInline", "overlay.menu.itemGap", "overlay.menu.itemRadius", "overlay.menu.itemIconSize", "overlay.menu.scrollbarGap", "scrollbar.width", "scrollbar.radius", "shadow.menu"];
}, {
    readonly category: "mobile";
    readonly description: "A dismissible mobile sheet for neutral and destructive action lists.";
    readonly maturity: "stable";
    readonly name: "MobileActionSheet";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "actions";
        readonly type: "readonly MobileActionSheetItem[]";
    }, {
        readonly name: "cancelLabel";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "true";
        readonly name: "closeOnAction";
        readonly type: "boolean";
    }, {
        readonly name: "onAction";
        readonly type: "(id: string) => void";
    }];
    readonly states: readonly ["closed", "open", "danger", "disabled", "narrow", "wide"];
    readonly tokens: readonly ["color.content.secondary", "space.1"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-scale identity mark that carries character artwork, an image, initials, or a status dot.";
    readonly maturity: "stable";
    readonly name: "MobileAvatar";
    readonly props: readonly [{
        readonly name: "src";
        readonly type: "string";
    }, {
        readonly name: "alt";
        readonly type: "string";
    }, {
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "\"xs\" | \"sm\" | \"md\" | \"lg\"";
    }, {
        readonly defaultValue: "circle";
        readonly name: "shape";
        readonly type: "\"circle\" | \"rounded\"";
    }, {
        readonly name: "status";
        readonly type: "\"online\" | \"away\" | \"busy\" | \"offline\"";
    }, {
        readonly name: "statusLabel";
        readonly type: "string";
    }];
    readonly states: readonly ["image", "artwork", "initials", "online", "away", "busy", "offline"];
    readonly tokens: readonly ["color.action.neutral.surface", "color.content.disabled", "color.content.muted", "color.content.secondary", "color.status.danger.emphasis", "color.status.success.emphasis", "color.status.warning.emphasis", "color.surface.canvas", "control.height.lg", "control.height.sm", "radius.base", "radius.pill", "space.6", "type.label.selected.fontSize", "type.label.selected.fontWeight"];
}, {
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
}, {
    readonly category: "mobile";
    readonly description: "An inline mobile status banner with semantic tone and optional action.";
    readonly maturity: "stable";
    readonly name: "MobileBanner";
    readonly props: readonly [{
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "\"neutral\" | \"info\" | \"warning\" | \"danger\"";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["neutral", "info", "warning", "danger"];
    readonly tokens: readonly ["color.surface.subtle", "color.status.info.surface", "color.status.warning.surface", "color.status.danger.surface", "radius.md", "space.3"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-sized mobile text button with semantic appearances, slots, and loading state.";
    readonly maturity: "stable";
    readonly name: "MobileButton";
    readonly props: readonly [{
        readonly defaultValue: "secondary";
        readonly name: "appearance";
        readonly type: "\"primary\" | \"secondary\" | \"plain\" | \"danger\"";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "\"sm\" | \"md\" | \"lg\"";
    }, {
        readonly defaultValue: "false";
        readonly name: "block";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "disabled", "loading"];
    readonly tokens: readonly ["color.action.primary.background", "color.action.neutral.surface", "color.status.danger.surface", "radius.pill", "shadow.xs", "space.2", "space.4"];
}, {
    readonly category: "mobile";
    readonly description: "A responsive mobile content surface with optional elevation and density.";
    readonly maturity: "stable";
    readonly name: "MobileCard";
    readonly props: readonly [{
        readonly defaultValue: "surface";
        readonly name: "appearance";
        readonly type: "\"plain\" | \"surface\" | \"elevated\"";
    }, {
        readonly defaultValue: "md";
        readonly name: "padding";
        readonly type: "\"none\" | \"sm\" | \"md\" | \"lg\"";
    }];
    readonly states: readonly ["plain", "surface", "elevated"];
    readonly tokens: readonly ["color.border.subtle", "color.surface.panel", "color.surface.raised", "radius.xl", "shadow.base", "space.4"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-sized check row with an indeterminate state for partial selections.";
    readonly maturity: "stable";
    readonly name: "MobileCheckbox";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "defaultChecked";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "indeterminate";
        readonly type: "boolean";
    }, {
        readonly name: "onCheckedChange";
        readonly type: "(checked: boolean) => void";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "plain";
        readonly name: "appearance";
        readonly type: "\"plain\" | \"surface\"";
    }];
    readonly states: readonly ["default", "checked", "indeterminate", "hover", "active", "focus-visible", "invalid", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.border.subtle", "color.content.disabled", "color.content.muted", "color.content.primary", "color.control.highlight.background", "color.control.switch.thumb", "color.field.background", "color.field.border", "color.focus.ring", "color.status.danger.border", "radius.md", "radius.sm", "shadow.xs", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
}, {
    readonly category: "mobile";
    readonly description: "A responsive bottom-sheet selector for short, mutually exclusive mobile choices.";
    readonly maturity: "stable";
    readonly name: "MobileChoiceSheet";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "options";
        readonly type: "readonly MobileChoiceSheetOption[]";
    }, {
        readonly name: "emptyContent";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "surface";
        readonly name: "optionAppearance";
        readonly type: "surface | plain";
    }, {
        readonly name: "selectedValue";
        readonly type: "string";
    }, {
        readonly name: "cancelLabel";
        readonly type: "ReactNode";
    }, {
        readonly name: "onSelect";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: MobileSheetCloseReason) => void";
    }];
    readonly states: readonly ["closed", "open", "selected", "disabled", "narrow", "wide"];
    readonly tokens: readonly ["color.content.secondary", "space.1", "space.2"];
}, {
    readonly category: "mobile";
    readonly description: "A mobile confirmation sheet with neutral or destructive confirmation and pending state.";
    readonly maturity: "stable";
    readonly name: "MobileConfirmSheet";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "cancelLabel";
        readonly type: "ReactNode";
    }, {
        readonly name: "confirmLabel";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "primary";
        readonly name: "confirmTone";
        readonly type: "primary | danger";
    }, {
        readonly name: "pending";
        readonly type: "boolean";
    }, {
        readonly name: "onConfirm";
        readonly type: "() => void";
    }];
    readonly states: readonly ["closed", "open", "danger", "pending", "disabled", "narrow"];
    readonly tokens: readonly ["color.content.secondary", "space.2", "space.3"];
}, {
    readonly category: "mobile";
    readonly description: "A compact-to-expanded mobile composer surface with semantic editor and action slots.";
    readonly maturity: "stable";
    readonly name: "MobileComposer";
    readonly props: readonly [{
        readonly defaultValue: "false";
        readonly name: "expanded";
        readonly type: "boolean";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "startActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "endActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "onActivate";
        readonly type: "() => void";
    }];
    readonly states: readonly ["collapsed", "expanded", "active", "focus-visible"];
    readonly tokens: readonly ["color.border.subtle", "color.content.primary", "color.focus.ring", "color.surface.panel", "radius.pill", "radius.xl", "shadow.base", "shadow.lg", "space.1", "space.2"];
}, {
    readonly category: "mobile";
    readonly description: "A compact disclosure row for thinking, tool groups, and advanced options.";
    readonly maturity: "stable";
    readonly name: "MobileDisclosure";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "onToggle";
        readonly type: "() => void";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "metadata";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["closed", "open", "hover", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.focus.ring", "space.2", "space.3"];
}, {
    readonly category: "mobile";
    readonly description: "An accessible touch-sized file picker presented as a mobile action button.";
    readonly maturity: "stable";
    readonly name: "MobileFileButton";
    readonly props: readonly [{
        readonly name: "accept";
        readonly type: "string";
    }, {
        readonly defaultValue: "false";
        readonly name: "multiple";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "focus-visible", "disabled", "loading"];
    readonly tokens: readonly ["color.action.neutral.border", "color.surface.panel", "color.focus.ring", "radius.pill", "shadow.xs", "space.2"];
}, {
    readonly category: "mobile";
    readonly description: "A transparent floating action row that keeps controls interactive without obscuring scroll content.";
    readonly maturity: "stable";
    readonly name: "MobileFloatingActions";
    readonly props: readonly [{
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "narrow", "safe-area"];
    readonly tokens: readonly ["space.2", "space.3"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-sized mobile icon action with plain, surfaced, and softly elevated appearances.";
    readonly maturity: "stable";
    readonly name: "MobileIconButton";
    readonly props: readonly [{
        readonly name: "aria-label";
        readonly type: "string";
    }, {
        readonly name: "icon";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "surface";
        readonly name: "appearance";
        readonly type: "plain | surface | floating";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md";
    }, {
        readonly defaultValue: "false";
        readonly name: "selected";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "selected", "disabled", "loading"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.border.subtle", "color.border.strong", "color.focus.ring", "color.surface.panel", "motion.duration.fast", "motion.duration.loop", "radius.pill", "shadow.base", "shadow.sm"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-aware mobile link with consistent inline and surfaced focus treatment.";
    readonly maturity: "stable";
    readonly name: "MobileLink";
    readonly props: readonly [{
        readonly defaultValue: "inline";
        readonly name: "appearance";
        readonly type: "\"inline\" | \"surface\"";
    }, {
        readonly name: "href";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible"];
    readonly tokens: readonly ["color.accent.default", "color.accent.hover", "color.focus.ring", "color.surface.panel", "radius.sm", "radius.pill", "shadow.xs"];
}, {
    readonly category: "mobile";
    readonly description: "A responsive touch row for mobile navigation and selection lists with semantic content slots.";
    readonly maturity: "stable";
    readonly name: "MobileListRow";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "supportingText";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "plain";
        readonly name: "appearance";
        readonly type: "plain | surface";
    }, {
        readonly defaultValue: "false";
        readonly name: "selected";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "neutral | danger";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "selected", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.border.strong", "color.border.subtle", "color.content.disabled", "color.content.muted", "color.content.primary", "color.content.secondary", "color.status.danger.content", "color.focus.ring", "color.surface.panel", "color.surface.tertiary", "radius.md", "shadow.xs", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
}, {
    readonly category: "mobile";
    readonly description: "A responsive chat message shell for user, assistant, and system content.";
    readonly maturity: "stable";
    readonly name: "MobileMessage";
    readonly props: readonly [{
        readonly name: "roleType";
        readonly type: "\"user\" | \"assistant\" | \"system\"";
    }, {
        readonly name: "actions";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["user", "assistant", "system"];
    readonly tokens: readonly ["color.action.neutral.surface", "color.content.primary", "color.content.muted", "radius.xl", "space.3", "space.4"];
}, {
    readonly category: "mobile";
    readonly description: "A safe, responsive mobile page header with balanced leading and trailing actions.";
    readonly maturity: "stable";
    readonly name: "MobilePageHeader";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "subtitle";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "actions";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "centered";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "centered", "with-subtitle"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.surface.canvas", "space.2", "space.4"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-sized single-choice list whose options share one input name for native keyboard navigation.";
    readonly maturity: "stable";
    readonly name: "MobileRadioGroup";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly MobileRadioOption[]";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly defaultValue: "plain";
        readonly name: "appearance";
        readonly type: "\"plain\" | \"surface\"";
    }];
    readonly states: readonly ["default", "selected", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.border.subtle", "color.content.disabled", "color.content.inverse", "color.content.muted", "color.content.primary", "color.content.secondary", "color.control.highlight.background", "color.field.background", "color.field.border", "color.focus.ring", "radius.md", "shadow.xs", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
}, {
    readonly category: "mobile";
    readonly description: "A dismissible mobile overlay scrim with consistent focus and motion behavior.";
    readonly maturity: "stable";
    readonly name: "MobileScrim";
    readonly props: readonly [{
        readonly name: "aria-label";
        readonly type: "string";
    }, {
        readonly defaultValue: "true";
        readonly name: "visible";
        readonly type: "boolean";
    }];
    readonly states: readonly ["visible", "hidden", "focus-visible"];
    readonly tokens: readonly ["color.overlay.scrim", "color.focus.ring", "motion.duration.base"];
}, {
    readonly category: "mobile";
    readonly description: "A mobile content section with optional heading, description, and action.";
    readonly maturity: "stable";
    readonly name: "MobileSection";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["content-only", "with-heading", "with-action"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "space.1", "space.2", "space.3"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-first segmented selector for compact mode and filter choices.";
    readonly maturity: "stable";
    readonly name: "MobileSegmentedControl";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "options";
        readonly type: "readonly MobileSegmentedControlOption[]";
    }, {
        readonly name: "onChange";
        readonly type: "(value: string) => void";
    }];
    readonly states: readonly ["selected", "unselected", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface", "color.content.primary", "color.surface.panel", "radius.pill", "shadow.xs", "space.1"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-sized choice field that opens the mobile choice sheet instead of a desktop popup list.";
    readonly maturity: "stable";
    readonly name: "MobileSelect";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly MobileSelectOption[]";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "defaultOpen";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: boolean) => void";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "sheetTitle";
        readonly type: "ReactNode";
    }, {
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "placeholder";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "soft";
        readonly name: "appearance";
        readonly type: "\"soft\" | \"surface\"";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-visible", "open", "invalid", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.content.disabled", "color.content.muted", "color.content.primary", "color.content.secondary", "color.field.background", "color.field.border", "color.focus.ring", "color.status.danger.border", "color.surface.tertiary", "radius.md", "shadow.xs", "space.1", "space.2", "space.4", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.md.fontSize", "type.label.md.fontWeight"];
}, {
    readonly category: "mobile";
    readonly description: "A safe-area-aware mobile bottom sheet with shared dismissal, focus, and scroll-lock behavior.";
    readonly maturity: "stable";
    readonly name: "MobileSheet";
    readonly props: readonly [{
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "footer";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "true";
        readonly name: "showHandle";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: MobileSheetCloseReason) => void";
    }, {
        readonly name: "headerAction";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["closed", "open", "exiting", "narrow", "wide"];
    readonly tokens: readonly ["color.border.strong", "color.border.subtle", "color.content.primary", "color.surface.panel", "radius.2xl", "radius.pill", "shadow.overlay", "space.2", "space.3", "space.4", "space.12"];
}, {
    readonly category: "mobile";
    readonly description: "A consistent mobile loading, empty, or error state with optional recovery action.";
    readonly maturity: "stable";
    readonly name: "MobileStatus";
    readonly props: readonly [{
        readonly defaultValue: "neutral";
        readonly name: "tone";
        readonly type: "\"neutral\" | \"info\" | \"danger\"";
    }, {
        readonly defaultValue: "false";
        readonly name: "loading";
        readonly type: "boolean";
    }, {
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["empty", "loading", "info", "danger"];
    readonly tokens: readonly ["color.content.secondary", "color.content.muted", "color.status.info.content", "color.status.danger.content", "space.2", "space.6"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-sized numeric row whose bounds disable the decrement and increment buttons.";
    readonly maturity: "stable";
    readonly name: "MobileStepper";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "value";
        readonly type: "number";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: number) => void";
    }, {
        readonly name: "min";
        readonly type: "number";
    }, {
        readonly name: "max";
        readonly type: "number";
    }, {
        readonly defaultValue: "1";
        readonly name: "step";
        readonly type: "number";
    }, {
        readonly name: "unit";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly name: "decrementLabel";
        readonly type: "string";
    }, {
        readonly name: "incrementLabel";
        readonly type: "string";
    }];
    readonly states: readonly ["default", "hover", "active", "focus-within", "invalid", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.content.disabled", "color.content.muted", "color.content.primary", "color.content.secondary", "color.field.background", "color.field.border", "color.field.borderFocus", "color.focus.ring", "color.status.danger.border", "color.status.danger.content", "radius.md", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.sm.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-sized settings row that pairs a label and its explanation with the product switch.";
    readonly maturity: "stable";
    readonly name: "MobileSwitch";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "defaultChecked";
        readonly type: "boolean";
    }, {
        readonly name: "onCheckedChange";
        readonly type: "(checked: boolean) => void";
    }, {
        readonly defaultValue: "plain";
        readonly name: "appearance";
        readonly type: "\"plain\" | \"surface\"";
    }];
    readonly states: readonly ["off", "on", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.border.subtle", "color.content.disabled", "color.content.muted", "color.content.primary", "color.control.switch.thumb", "color.control.switch.track", "color.control.switch.track.checked", "color.focus.ring", "radius.md", "radius.pill", "shadow.xs", "space.1", "space.2", "space.3", "type.body.md.fontSize", "type.body.xs.fontSize", "type.label.lg.fontWeight"];
}, {
    readonly category: "mobile";
    readonly description: "The bottom destination bar: equal-width items, a filled selection pill, and safe-area padding.";
    readonly maturity: "stable";
    readonly name: "MobileTabBar";
    readonly props: readonly [{
        readonly name: "items";
        readonly type: "readonly MobileTabBarItem[]";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly defaultValue: "surface";
        readonly name: "appearance";
        readonly type: "\"surface\" | \"plain\"";
    }, {
        readonly defaultValue: "true";
        readonly name: "safeArea";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "selected", "hover", "active", "focus-visible", "disabled", "safe-area"];
    readonly tokens: readonly ["color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.content.disabled", "color.content.primary", "color.content.secondary", "color.focus.ring", "color.selection.surface", "color.surface.panel", "radius.md", "radius.pill", "space.1", "space.2", "type.label.md.fontWeight", "type.label.sm.fontSize"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-sized labelled pill for filters and tags, with leading and trailing slots and a filled selected state.";
    readonly maturity: "stable";
    readonly name: "MobileTag";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "selected";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "soft";
        readonly name: "appearance";
        readonly type: "\"soft\" | \"accent\"";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "\"sm\" | \"md\"";
    }];
    readonly states: readonly ["default", "selected", "hover", "active", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.accent.default", "color.accent.surface", "color.action.neutral.surface", "color.action.neutral.surface.hover", "color.action.neutral.surface.pressed", "color.action.primary.content", "color.content.disabled", "color.content.primary", "color.content.secondary", "color.focus.ring", "color.selection.surface", "font.weight.semibold", "radius.pill", "space.2", "space.3", "space.4", "type.label.md.fontSize", "type.label.md.fontWeight", "type.label.sm.fontSize"];
}, {
    readonly category: "mobile";
    readonly description: "A mobile search and text-entry field with touch geometry and optional leading or trailing content.";
    readonly maturity: "stable";
    readonly name: "MobileTextField";
    readonly props: readonly [{
        readonly defaultValue: "soft";
        readonly name: "appearance";
        readonly type: "soft | surface";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "focus-within", "invalid", "disabled"];
    readonly tokens: readonly ["color.accent.default", "color.content.disabled", "color.content.muted", "color.content.primary", "color.content.secondary", "color.field.background", "color.field.border", "color.field.borderFocus", "color.focus.ring", "color.status.danger.border", "color.surface.tertiary", "radius.md", "shadow.xs", "space.2", "space.4", "type.body.md.fontSize"];
}, {
    readonly category: "mobile";
    readonly description: "A touch-friendly multiline text field for expanded mobile composition and forms.";
    readonly maturity: "stable";
    readonly name: "MobileTextarea";
    readonly props: readonly [{
        readonly name: "placeholder";
        readonly type: "string";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "focus-visible", "invalid", "disabled"];
    readonly tokens: readonly ["color.field.background", "color.field.border", "color.field.border.focus", "color.status.danger.border", "radius.xl", "shadow.xs", "space.3"];
}, {
    readonly category: "mobile";
    readonly description: "A bottom action bar with leading, middle, and trailing slots that keeps clear of the home indicator.";
    readonly maturity: "stable";
    readonly name: "MobileToolbar";
    readonly props: readonly [{
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly defaultValue: "surface";
        readonly name: "appearance";
        readonly type: "\"surface\" | \"plain\"";
    }, {
        readonly defaultValue: "true";
        readonly name: "safeArea";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "sticky";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "plain", "sticky", "safe-area"];
    readonly tokens: readonly ["color.surface.panel", "shadow.sm", "space.2", "space.3", "space.4"];
}, {
    readonly category: "feedback";
    readonly description: "A compound dialog with attached or frosted floating footer anatomy on the shared overlay kernel.";
    readonly maturity: "stable";
    readonly name: "Dialog";
    readonly props: readonly [{
        readonly name: "restoreFocus";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }, {
        readonly name: "portalTarget";
        readonly type: "HTMLElement | null";
    }, {
        readonly name: "overlayProps";
        readonly type: "HTMLAttributes<HTMLDivElement>";
    }, {
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: DialogCloseReason) => void";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg | xl | 2xl";
    }, {
        readonly defaultValue: "false";
        readonly name: "DialogHeader.separator";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "DialogFooter.separator";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "true";
        readonly name: "closeOnEscape";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "true";
        readonly name: "closeOnPointerOutside";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "open", "alert", "scrolling", "floating-footer"];
    readonly tokens: readonly ["color.overlay.scrim", "color.surface.raised", "color.border.subtle", "color.content.primary", "color.content.secondary", "color.content.muted", "overlay.dialog.surfaceRadius", "overlay.dialog.viewportGutter", "overlay.dialog.headerPaddingBlockStart", "overlay.dialog.headerPaddingBlockEnd", "overlay.dialog.footerPaddingBlockStart", "overlay.dialog.footerPaddingBlockEnd", "overlay.dialog.footerActionMinWidth", "overlay.dialog.footerHeight", "overlay.dialog.footerFadeExtent", "overlay.dialog.footerContentInset", "overlay.dialog.footerBlur", "shadow.overlay", "motion.distance.sm", "type.support", "type.heading.dialog.fontFamily", "type.heading.dialog.fontSize", "type.heading.dialog.fontWeight", "type.heading.dialog.lineHeight", "type.heading.dialog.letterSpacing"];
}, {
    readonly category: "form";
    readonly description: "A searchable multi-value selector with an embedded search header and structured options on one anchored surface, plus tags, select-all, and explicit value creation.";
    readonly maturity: "stable";
    readonly name: "MultiSelect";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly ComboboxOption[]";
    }, {
        readonly name: "value";
        readonly type: "readonly ComboboxValue[]";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: ComboboxValue[]) => void";
    }, {
        readonly name: "onCreateValue";
        readonly type: "(input: string) => ComboboxValue | void";
    }, {
        readonly defaultValue: "false";
        readonly name: "clearable";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "3";
        readonly name: "maxVisibleTags";
        readonly type: "number";
    }, {
        readonly name: "selectionSummary";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "showSelectAll";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }];
    readonly states: readonly ["default", "open", "searching", "custom", "invalid", "disabled", "loading", "empty"];
    readonly tokens: readonly ["color.field.background", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderFocus", "color.content.primary", "color.content.secondary", "color.content.muted", "color.content.disabled", "color.control.highlight.background", "color.action.neutral.content", "color.action.neutral.surface", "color.border.subtle", "color.surface.panel", "color.focus.ring", "color.status.danger.border", "control.height.sm", "control.height.md", "control.height.lg", "control.select.paddingInline", "control.select.radius", "control.select.indicatorSize", "control.select.contentGap", "control.select.trailingInset", "control.iconButton.xsSize", "overlay.menu.inlineSize", "overlay.menu.surfacePadding", "overlay.menu.surfaceRadius", "overlay.menu.itemIconSize", "shadow.menu", "type.label.selected.fontWeight"];
}, {
    readonly category: "navigation";
    readonly description: "A compound application navigation panel with independently addressable header, scroll body, content, grouped items, and footer anatomy.";
    readonly maturity: "stable";
    readonly name: "NavigationPanel";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["default", "selected-item", "disabled-item", "scrolling"];
    readonly tokens: readonly ["color.surface.subtle", "color.border.subtle", "color.content.primary", "color.content.muted", "color.content.caption", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.selection.surface", "color.focus.ring", "type.label.selected.fontWeight", "layout.navigationPanel.inlineSize", "layout.navigationPanel.surfacePadding", "layout.navigationPanel.contentGap", "layout.navigationPanel.sectionGap", "layout.navigationPanel.headingHeight", "layout.navigationPanel.headingPaddingInline", "layout.navigationPanel.headingGap", "type.label.xs.fontSize", "layout.navigationPanel.headingActionSize", "layout.navigationPanel.itemHeight", "layout.navigationPanel.itemPaddingInline", "layout.navigationPanel.itemGap", "layout.navigationPanel.itemRadius", "layout.navigationPanel.itemIconSize", "layout.navigationPanel.scrollbarGap", "layout.navigationPanel.footerHeight", "layout.navigationPanel.footerPadding", "scrollbar.width", "scrollbar.radius"];
}, {
    readonly category: "form";
    readonly description: "A numeric text field with clamping, keyboard stepping, optional units, and step controls.";
    readonly maturity: "stable";
    readonly name: "NumberInput";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "number";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: number) => void";
    }, {
        readonly name: "min";
        readonly type: "number";
    }, {
        readonly name: "max";
        readonly type: "number";
    }, {
        readonly name: "step";
        readonly type: "number";
        readonly defaultValue: "1";
    }, {
        readonly name: "unit";
        readonly type: "string";
    }, {
        readonly name: "variant";
        readonly type: "default | compact | stepper";
        readonly defaultValue: "default";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.field.background", "color.field.border", "color.field.borderFocus", "control.height.sm", "control.height.md", "control.height.lg"];
}, {
    readonly category: "primitive";
    readonly description: "A compact numeric marker with a 24px filled surface and caller-owned value. Long values grow without clipping.";
    readonly maturity: "stable";
    readonly name: "NumberBadge";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "ReactNode";
    }, {
        readonly name: "aria-label";
        readonly type: "string";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["space.1", "space.6", "type.meta.fontSize", "radius.pill", "color.action.neutral.content", "color.numberBadge.background"];
}, {
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
}, {
    readonly category: "primitive";
    readonly description: "A title composition with independent leading content, semantic level, visual size, description, action, and alignment.";
    readonly maturity: "stable";
    readonly name: "PageHeader";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "1";
        readonly name: "level";
        readonly type: "1 | 2 | 3 | 4 | 5 | 6";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg | display";
    }, {
        readonly defaultValue: "start";
        readonly name: "align";
        readonly type: "start | center";
    }, {
        readonly defaultValue: "false";
        readonly name: "required";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["color.content.requiredIndicator", "color.content.primary", "color.content.muted", "type.heading.page.fontSize", "type.heading.section.fontSize", "type.heading.display.fontSize", "type.heading.welcome.fontSize", "type.pageIntro.fontSize", "type.body.lg.fontSize", "type.body.sm.fontSize"];
}, {
    readonly name: "SetupWizard";
    readonly category: "form";
    readonly maturity: "stable";
    readonly description: "A controlled split-pane setup layout with effect-oriented guidance, one current-step indicator, form or editor content, and independent actions.";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "ReactNode";
    }, {
        readonly name: "titleId";
        readonly type: "string";
    }, {
        readonly name: "headerActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "guideLabel";
        readonly type: "string";
    }, {
        readonly name: "step";
        readonly type: "SetupWizardStep";
    }, {
        readonly name: "footer";
        readonly type: "ReactNode";
    }, {
        readonly name: "contentMode";
        readonly type: "scroll | contained";
        readonly defaultValue: "scroll";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }];
    readonly states: readonly ["form", "contained", "narrow"];
    readonly tokens: readonly ["color.surface.chrome", "color.surface.scene", "color.content.primary", "color.content.muted", "space.2", "space.3", "space.4", "space.5", "space.6", "space.8", "type.heading.dialog.fontSize", "type.heading.page.fontSize", "type.body.lg.fontSize", "type.label.sm.fontSize"];
}, {
    readonly category: "form";
    readonly description: "A native radio control with label, description, invalid, and disabled states.";
    readonly maturity: "stable";
    readonly name: "Radio";
    readonly props: readonly [{
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly name: "readOnly";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "invalid";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "size";
        readonly type: "sm | md | lg";
        readonly defaultValue: "md";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "checked", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.field.background", "color.field.border", "color.accent.default", "color.focus.ring"];
}, {
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
}, {
    readonly category: "flow-chat";
    readonly description: "An attention-worthy tool result with a stable summary region, hover-revealed actions, and controlled detail disclosure.";
    readonly maturity: "stable";
    readonly name: "ProminentToolCard";
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
        readonly name: "expandedContent";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "inset";
        readonly name: "expandedContentLayout";
        readonly type: "'inset' | 'flush'";
    }, {
        readonly name: "errorContent";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "allowExpandedWhenFailed";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "requiresConfirmation";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "hover", "loading", "expanded", "error", "confirmation"];
    readonly tokens: readonly ["control.flowChat.cardPaddingInline", "color.action.neutral.surface", "color.content.primary", "color.content.secondary", "color.content.muted", "color.surface.panel", "color.border.default", "color.border.strong", "color.border.subtle", "color.focus.ring", "color.status.danger.content", "color.status.success.content", "color.status.warning.border", "color.status.warning.surface", "control.height.sm", "font.family.sans", "font.size.base", "font.size.base", "font.size.lg", "font.size.sm", "font.size.xl", "font.weight.regular", "font.weight.semibold", "radius.md", "radius.sm", "shadow.xs", "shadow.sm"];
}, {
    readonly category: "flow-chat";
    readonly description: "A concrete ambient FlowChat card for read-file progress, permission, and completion summaries.";
    readonly maturity: "stable";
    readonly name: "ReadFileToolCard";
    readonly props: readonly [{
        readonly name: "status";
        readonly type: "FlowChatToolStatus";
    }, {
        readonly name: "action";
        readonly type: "ReactNode";
    }, {
        readonly name: "content";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "false";
        readonly name: "interactive";
        readonly type: "boolean";
    }, {
        readonly name: "onOpen";
        readonly type: "() => void";
    }];
    readonly states: readonly ["default", "hover", "loading", "error"];
    readonly tokens: readonly ["color.content.primary", "color.content.secondary", "color.content.muted", "color.status.danger.content", "color.status.success.content", "font.family.sans", "font.size.sm"];
}, {
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
}, {
    readonly category: "primitive";
    readonly description: "A single-line vertical text replacement with explicit identity, interruption handling, accessible text, and reduced-motion support.";
    readonly maturity: "stable";
    readonly name: "RollingText";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "string | number";
    }, {
        readonly defaultValue: "children";
        readonly name: "transitionKey";
        readonly type: "string | number";
    }, {
        readonly defaultValue: "marquee";
        readonly name: "behavior";
        readonly type: "fade | marquee";
    }, {
        readonly name: "marqueeActive";
        readonly type: "boolean";
    }];
    readonly states: readonly ["default", "replacing"];
    readonly tokens: readonly ["motion.duration.contentSwap", "motion.easing.smooth", "layout.overflowText.fadeExtent"];
}, {
    readonly category: "primitive";
    readonly description: "A slow, softly feathered fade across activity text that keeps every glyph visible, with static fallbacks for reduced motion, high contrast and print.";
    readonly maturity: "stable";
    readonly name: "ShimmerText";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }];
    readonly states: readonly ["default", "static"];
    readonly tokens: readonly ["color.content.primary", "motion.duration.loop"];
}, {
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
}, {
    readonly category: "primitive";
    readonly description: "Provides native scrolling with consistent orientation, scrollbar visibility, and optional inner edge fades.";
    readonly maturity: "stable";
    readonly name: "ScrollArea";
    readonly props: readonly [{
        readonly defaultValue: "vertical";
        readonly name: "orientation";
        readonly type: "vertical | horizontal | both";
    }, {
        readonly defaultValue: "auto";
        readonly name: "scrollbarVisibility";
        readonly type: "auto | hover | always | hidden";
    }, {
        readonly defaultValue: "none";
        readonly name: "edgeFade";
        readonly type: "none | vertical";
    }, {
        readonly defaultValue: "contain";
        readonly name: "overscrollBehaviorY";
        readonly type: "auto | contain";
    }];
    readonly states: readonly ["auto", "hover", "always", "hidden"];
    readonly tokens: readonly ["color.content.onLight", "color.scrollbar.thumb", "color.scrollbar.thumbHover", "scrollbar.width", "scrollbar.radius", "layout.scrollArea.fadeExtent"];
}, {
    readonly category: "primitive";
    readonly description: "A controlled two-pane layout with stable content containers, reversible placement, and accessible resizing.";
    readonly maturity: "stable";
    readonly name: "SplitView";
    readonly props: readonly [{
        readonly name: "primary";
        readonly type: "ReactNode";
    }, {
        readonly name: "secondary";
        readonly type: "ReactNode";
    }, {
        readonly name: "header";
        readonly type: "ReactNode | (geometry: SplitViewHeaderGeometry) => ReactNode";
    }, {
        readonly name: "surfaces";
        readonly type: "ReactNode";
    }, {
        readonly name: "mode";
        readonly type: "split | primary | secondary";
        readonly defaultValue: "split";
    }, {
        readonly name: "layout";
        readonly type: "split | overlay";
        readonly defaultValue: "split";
    }, {
        readonly name: "secondarySide";
        readonly type: "left | right";
        readonly defaultValue: "right";
    }, {
        readonly name: "rightSize";
        readonly type: "number";
    }, {
        readonly name: "onRightSizeChange";
        readonly type: "(size: number) => void";
    }, {
        readonly name: "dividerActions";
        readonly type: "ReactNode";
    }, {
        readonly name: "dividerLabel";
        readonly type: "string";
    }];
    readonly states: readonly ["split", "primary", "secondary"];
    readonly tokens: readonly ["color.border.subtle", "color.surface.raised", "color.accent.default", "color.focus.ring", "space.1", "space.2", "space.3", "radius.lg", "shadow.overlay"];
}, {
    readonly category: "form";
    readonly description: "A search input with optional leading icon, shortcut hint, clear action, Enter submission, and a frosted panel footer.";
    readonly maturity: "stable";
    readonly name: "SearchField";
    readonly props: readonly [{
        readonly defaultValue: "default";
        readonly name: "variant";
        readonly type: "default | embedded | panel";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "placeholder";
        readonly type: "string";
    }, {
        readonly name: "leadingIcon";
        readonly type: "ReactNode";
    }, {
        readonly name: "shortcut";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailingAction";
        readonly type: "ReactNode (xs IconButton actions)";
    }, {
        readonly name: "footer";
        readonly type: "ReactNode (panel only)";
    }, {
        readonly name: "clearLabel";
        readonly type: "string";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }, {
        readonly defaultValue: "false";
        readonly name: "readOnly";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "onClear";
        readonly type: "MouseEventHandler<HTMLButtonElement>";
    }, {
        readonly name: "onSearch";
        readonly type: "(value: string) => void";
    }];
    readonly states: readonly ["default", "filled", "hover", "focus-visible", "read-only", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.surface.raised", "color.border.subtle", "color.border.default", "color.field.background", "color.field.placeholder", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderActive", "color.field.borderFocus", "color.status.danger.border", "control.searchField.height.sm", "control.searchField.height.md", "control.searchField.height.lg", "control.iconButton.xsSize", "space.component.inline", "space.1", "border.width.default", "radius.xs", "type.label.md.fontSize", "type.meta.fontSize", "radius.pill", "radius.lg", "effect.blur.medium", "shadow.overlay"];
}, {
    readonly category: "form";
    readonly description: "A compact pill-shaped single-choice control that switches between a small set of exclusive modes.";
    readonly maturity: "stable";
    readonly name: "SegmentedControl";
    readonly props: readonly [{
        readonly name: "interaction";
        readonly type: "radio | buttons";
        readonly defaultValue: "radio";
    }, {
        readonly name: "labelBehavior";
        readonly type: "overflow | static";
        readonly defaultValue: "overflow";
    }, {
        readonly name: "options";
        readonly type: "readonly SegmentedControlOption[]";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "\"content\"";
        readonly name: "distribution";
        readonly type: "\"content\" | \"fill\"";
    }, {
        readonly defaultValue: "\"sm\"";
        readonly name: "size";
        readonly type: "\"sm\" | \"md\"";
    }, {
        readonly defaultValue: "\"accent\"";
        readonly name: "tone";
        readonly type: "\"accent\" | \"neutral\"";
    }, {
        readonly defaultValue: "\"bar\"";
        readonly name: "variant";
        readonly type: "\"bar\" | \"pills\"";
    }];
    readonly states: readonly ["selected", "unselected", "hover", "active", "disabled"];
    readonly tokens: readonly ["color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "space.3", "color.content.primary", "color.focus.ring", "color.surface.raised", "color.surface.subtle", "control.segmentedControl.gap", "control.segmentedControl.padding", "control.segmentedControl.paddingMd", "control.segmentedControl.radius", "control.segmentedControl.segmentHeight", "control.segmentedControl.segmentHeightMd", "control.segmentedControl.pillSegmentHeight", "control.segmentedControl.segmentPaddingInline", "control.segmentedControl.segmentPaddingInlineMd", "control.segmentedControl.segmentGap", "control.segmentedControl.segmentRadius", "control.segmentedControl.pillSegmentRadius", "control.segmentedControl.iconSize", "control.segmentedControl.iconSizeMd", "control.height.md", "radius.pill", "space.4", "type.label.md.fontSize", "type.label.selected.fontWeight"];
}, {
    readonly category: "form";
    readonly description: "A select-only combobox whose expanded header and grouped options share one themed surface, with typed values, native form participation, and keyboard navigation.";
    readonly maturity: "stable";
    readonly name: "Select";
    readonly props: readonly [{
        readonly name: "options";
        readonly type: "readonly SelectOption[] (supports tooltip, testId and data-* attributes)";
    }, {
        readonly name: "value";
        readonly type: "SelectValue";
    }, {
        readonly name: "defaultValue";
        readonly type: "SelectValue";
    }, {
        readonly name: "placeholder";
        readonly type: "string";
    }, {
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }, {
        readonly defaultValue: "bottom";
        readonly name: "placement";
        readonly type: "top | bottom";
    }, {
        readonly defaultValue: "full";
        readonly name: "width";
        readonly type: "full | content";
    }, {
        readonly defaultValue: "trigger";
        readonly name: "popupWidth";
        readonly type: "trigger | content";
    }, {
        readonly name: "open / defaultOpen";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: boolean) => void";
    }, {
        readonly defaultValue: "false";
        readonly name: "invalid";
        readonly type: "boolean";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: SelectValue) => void";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "open", "invalid", "disabled"];
    readonly tokens: readonly ["color.field.background", "color.field.placeholder", "opacity.iconArtwork", "color.field.backgroundHover", "color.field.border", "color.field.borderHover", "color.field.borderFocus", "color.content.primary", "color.content.muted", "color.content.disabled", "color.control.highlight.background", "color.selection.surface", "color.surface.panel", "color.border.subtle", "color.action.neutral.content", "color.action.neutral.surface", "color.action.neutral.surfacePressed", "color.status.danger.border", "color.status.danger.surface", "color.focus.ring", "control.height.sm", "control.height.md", "control.height.lg", "control.select.paddingInline", "control.select.leadingInset", "control.select.trailingInset", "control.select.contentGap", "control.select.indicatorSize", "control.select.radius", "overlay.menu.inlineSize", "overlay.menu.maxBlockSize", "overlay.menu.surfacePadding", "overlay.menu.surfaceRadius", "overlay.menu.rowGap", "overlay.menu.sectionGap", "overlay.menu.headingHeight", "overlay.menu.headingPaddingInline", "overlay.menu.itemHeight", "overlay.menu.itemPaddingInline", "overlay.menu.itemGap", "overlay.menu.itemRadius", "overlay.menu.itemIconSize", "shadow.menu", "type.label.md.fontSize"];
}, {
    readonly description: "A compound edge-aligned sheet using the same dismissal, focus, scroll-lock, and anatomy contracts as Dialog.";
    readonly name: "Sheet";
    readonly props: readonly [{
        readonly name: "restoreFocus";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }, {
        readonly name: "portalTarget";
        readonly type: "HTMLElement | null";
    }, {
        readonly name: "overlayProps";
        readonly type: "HTMLAttributes<HTMLDivElement>";
    }, {
        readonly name: "open";
        readonly type: "boolean";
    }, {
        readonly name: "onOpenChange";
        readonly type: "(open: false, reason: DialogCloseReason) => void";
    }, {
        readonly defaultValue: "right";
        readonly name: "placement";
        readonly type: "left | right | bottom";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md | lg";
    }];
    readonly states: readonly ["default", "open", "left", "right", "bottom"];
    readonly category: "feedback";
    readonly maturity: "stable";
    readonly tokens: readonly ["color.overlay.scrim", "color.surface.raised", "color.border.subtle", "color.content.primary", "color.content.secondary", "color.content.muted", "overlay.dialog.surfaceRadius", "overlay.dialog.viewportGutter", "overlay.dialog.headerPaddingBlockStart", "overlay.dialog.headerPaddingBlockEnd", "overlay.dialog.footerPaddingBlockStart", "overlay.dialog.footerPaddingBlockEnd", "overlay.dialog.footerActionMinWidth", "overlay.dialog.footerHeight", "overlay.dialog.footerFadeExtent", "overlay.dialog.footerContentInset", "overlay.dialog.footerBlur", "shadow.overlay", "motion.distance.sm", "type.support", "type.heading.dialog.fontFamily", "type.heading.dialog.fontSize", "type.heading.dialog.fontWeight", "type.heading.dialog.lineHeight", "type.heading.dialog.letterSpacing"];
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
    readonly category: "form";
    readonly description: "Toggles a single setting between on and off with native checkbox semantics.";
    readonly maturity: "stable";
    readonly name: "Switch";
    readonly props: readonly [{
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly name: "defaultChecked";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly name: "onChange";
        readonly type: "ChangeEventHandler<HTMLInputElement>";
    }, {
        readonly name: "onCheckedChange";
        readonly type: "(checked: boolean) => void";
    }];
    readonly states: readonly ["off", "on", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.control.switch.track", "color.control.switch.trackChecked", "color.control.switch.thumb", "color.focus.ring", "control.switch.trackWidth", "control.switch.trackHeight", "control.switch.thumbSize", "control.switch.thumbInset", "control.switch.thumbTravel", "control.switch.thumbTravelReverse", "radius.pill"];
}, {
    readonly category: "navigation";
    readonly description: "A compact single-selection tab list with leading icons, a fixed internal slot for glass end actions, and automatic keyboard activation. Content is centered at rest and shifts aside when an action appears without resizing the tab.";
    readonly maturity: "stable";
    readonly name: "TabGroup";
    readonly props: readonly [{
        readonly name: "items";
        readonly type: "readonly TabGroupItem[]";
    }, {
        readonly name: "items[].labelTransitionKey";
        readonly type: "string | number";
    }, {
        readonly name: "items[].labelSuffix";
        readonly type: "ReactNode";
    }, {
        readonly name: "items[].tabProps";
        readonly type: "TabGroupItem['tabProps']";
    }, {
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "defaultValue";
        readonly type: "string";
    }, {
        readonly name: "onValueChange";
        readonly type: "(value: string) => void";
    }, {
        readonly name: "renderItem";
        readonly type: "(item: TabGroupItem, node: ReactNode, index: number) => ReactNode";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "sm | md";
    }];
    readonly states: readonly ["selected", "unselected", "hover", "active", "disabled"];
    readonly tokens: readonly ["opacity.iconArtwork", "component.button.outlineBorder", "component.button.outlineBorderInteractive", "component.button.fillBackground", "color.action.neutral.content", "color.action.neutral.contentDisabled", "color.action.neutral.surface", "color.action.neutral.surfaceHover", "color.action.neutral.surfacePressed", "color.content.primary", "color.focus.ring", "control.tabGroup.gap", "control.tabGroup.itemGap", "control.tabGroup.itemGapSm", "control.tabGroup.itemHeight", "control.tabGroup.itemHeightSm", "control.tabGroup.itemIconSize", "control.tabGroup.itemIconSizeSm", "control.tabGroup.itemPaddingInline", "control.tabGroup.itemPaddingBlockSm", "control.tabGroup.itemPaddingInlineSm", "control.tabGroup.itemActionSize", "color.surface.raised", "color.border.subtle", "effect.blur.subtle", "control.tabGroup.itemRadius", "type.label.md.fontSize", "type.label.md.lineHeight", "type.label.selected.fontWeight", "radius.pill"];
}, {
    readonly category: "form";
    readonly description: "A multiline native text field with IME safety, support text, count, and auto-resize behavior.";
    readonly maturity: "stable";
    readonly name: "Textarea";
    readonly props: readonly [{
        readonly name: "value";
        readonly type: "string";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly name: "hint";
        readonly type: "string";
    }, {
        readonly name: "invalid";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "autoResize";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "showCount";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }];
    readonly states: readonly ["default", "hover", "focus-visible", "invalid", "disabled"];
    readonly tokens: readonly ["color.content.primary", "color.content.muted", "color.content.disabled", "color.content.requiredIndicator", "color.field.background", "color.field.border", "color.field.borderFocus", "color.status.danger.border", "color.status.danger.content", "type.label.md.fontSize", "type.body.sm.fontSize", "type.support.fontSize", "type.code.md.fontSize"];
}, {
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
}, {
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
}, {
    readonly category: "navigation";
    readonly description: "A responsive top-level bar with independent leading, centered, and trailing composition regions.";
    readonly maturity: "stable";
    readonly name: "Toolbar";
    readonly props: readonly [{
        readonly name: "leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "center";
        readonly type: "ReactNode";
    }, {
        readonly name: "trailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "sm";
        readonly name: "size";
        readonly type: "sm | md";
    }, {
        readonly defaultValue: "true";
        readonly name: "bordered";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "visible";
        readonly name: "leadingOverflow";
        readonly type: "visible | scroll";
    }];
    readonly states: readonly ["default", "with-center", "overflow"];
    readonly tokens: readonly ["color.surface.raised", "color.content.primary", "color.content.secondary", "color.border.subtle", "color.action.neutral.surface", "layout.toolbar.smHeight", "layout.toolbar.mdHeight", "layout.toolbar.contentGap", "layout.toolbar.smPaddingBlock", "layout.toolbar.smPaddingInline", "layout.toolbar.mdPaddingBlockStart", "layout.toolbar.mdPaddingBlockEnd", "layout.toolbar.mdPaddingInlineStart", "layout.toolbar.mdPaddingInlineEnd", "layout.toolbar.groupGapSm", "layout.toolbar.groupGapMd", "layout.toolbar.badgeSize", "type.meta.fontSize", "layout.toolbar.separatorBlockSize", "layout.toolbar.overflowFadeExtent", "radius.pill"];
}, {
    readonly category: "feedback";
    readonly description: "A portaled, delay-managed label with optional click persistence, cursor-following and interactive content; dismisses immediately on scrolling or when its trigger leaves the visible viewport.";
    readonly maturity: "stable";
    readonly name: "Tooltip";
    readonly props: readonly [{
        readonly name: "children";
        readonly type: "ReactElement";
    }, {
        readonly name: "content";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "top";
        readonly name: "placement";
        readonly type: "top | bottom | left | right";
    }, {
        readonly defaultValue: "hover";
        readonly name: "trigger";
        readonly type: "hover | click | focus | hover-focus";
    }, {
        readonly defaultValue: "450";
        readonly name: "delay";
        readonly type: "number";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "followCursor";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "interactive";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "openOnClick";
        readonly type: "boolean";
    }, {
        readonly name: "portalContainer";
        readonly type: "TooltipPortalTarget";
    }];
    readonly states: readonly ["default", "visible", "interactive", "instant"];
    readonly tokens: readonly ["color.surface.raised", "color.content.primary", "color.border.subtle", "color.border.default", "color.border.strong", "shadow.sm", "overlay.tooltip.maxInlineSize", "overlay.tooltip.maxBlockSize", "overlay.tooltip.paddingBlock", "overlay.tooltip.paddingInline", "overlay.tooltip.surfaceRadius", "overlay.tooltip.arrowSize", "overlay.tooltip.gap", "type.support.fontSize"];
}, {
    readonly category: "feedback";
    readonly name: "VoiceCallPanel";
    readonly description: "A controlled live-call surface. VoiceCallIdentity, VoiceCallTranscript and VoiceCallControls also expose its shared anatomy for persistent text/voice hosts.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "string";
    }, {
        readonly name: "labels";
        readonly type: "VoiceCallLabels";
    }, {
        readonly name: "phase";
        readonly type: "connecting | live | ending | error";
        readonly defaultValue: "live";
    }, {
        readonly name: "muted";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "userTranscript";
        readonly type: "string";
    }, {
        readonly name: "assistantTranscript";
        readonly type: "string";
    }, {
        readonly name: "status";
        readonly type: "ReactNode";
    }, {
        readonly name: "readAudio";
        readonly type: "VoiceParticleAudioReader";
    }, {
        readonly name: "presentation";
        readonly type: "card | embedded";
        readonly defaultValue: "card";
    }, {
        readonly name: "onBack / onClose / onToggleMute / onOpenSettings / onEnd";
        readonly type: "() => void";
    }];
    readonly states: readonly ["connecting", "live", "muted", "ending", "error"];
    readonly tokens: readonly ["color.content.onDark", "color.content.onLight", "type.heading.panel", "type.body.lg", "type.modifier.leading.tight", "type.flow.body", "type.flow.control", "type.flow.support", "color.content.primary", "color.content.secondary", "color.action.quiet.hover", "control.flowChat.cardRadius", "space.3", "space.6", "space.8", "radius.lg"];
}, {
    readonly category: "brand";
    readonly name: "OpenBitFunSolidMark";
    readonly description: "The original silver OpenBitFun mark on a transparent canvas, preserving its material and shading.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "size";
        readonly type: "number";
        readonly defaultValue: "control.height.lg";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["control.height.lg"];
}, {
    readonly category: "brand";
    readonly name: "OpenBitFunAppIcon";
    readonly description: "The installed application icon: the silver mark on its authored black rounded-square tile, with resolution-aware assets.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "size";
        readonly type: "number";
        readonly defaultValue: "control.height.lg";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["control.height.lg"];
}, {
    readonly category: "brand";
    readonly name: "OpenBitFunMark";
    readonly description: "The authored OpenBitFun mark with inherited color and an optional startup breathing motion.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "size";
        readonly type: "CSSProperties['width']";
        readonly defaultValue: "120px";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly name: "motion";
        readonly type: "'none' | 'breathe'";
        readonly defaultValue: "none";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }];
    readonly states: readonly ["static", "breathe", "paused"];
    readonly tokens: readonly ["color.content.primary"];
}, {
    readonly category: "brand";
    readonly name: "OpenBitFunBrandMotion";
    readonly description: "OpenBitFun motion: circulating highlights, counter-rotating hexagons, or a compact engineering drawing that forms the original mark.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "size";
        readonly type: "number";
        readonly defaultValue: "192";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly name: "variant";
        readonly type: "'flow' | 'counter-rotate' | 'construction'";
        readonly defaultValue: "flow";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }];
    readonly states: readonly ["construction", "playing", "counter-rotate", "paused", "reduced-motion"];
    readonly tokens: readonly ["color.content.primary"];
}, {
    readonly category: "brand";
    readonly name: "SubagentHatch";
    readonly description: "An antenna-topped egg that incubates during delegation and opens once into the supplied Subagent avatar.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "phase";
        readonly type: "'incubating' | 'ready' | 'stopped'";
    }, {
        readonly name: "size";
        readonly type: "number";
        readonly defaultValue: "space.8";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["incubating", "ready", "stopped", "reduced-motion"];
    readonly tokens: readonly ["space.8"];
}, {
    readonly category: "brand";
    readonly name: "VoiceParticleLogo";
    readonly description: "A particle logo with separate microphone and audible assistant speech responses, preserving the supplied motion model.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "readAudio";
        readonly type: "VoiceParticleAudioReader";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }, {
        readonly name: "formation";
        readonly type: "number (0 = solid, 1 = particles)";
        readonly defaultValue: "1";
    }];
    readonly states: readonly ["idle", "paused", "reduced-motion"];
    readonly tokens: readonly ["color.content.onDark", "color.content.onLight"];
}, {
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
}, {
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
}, {
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
}];
export declare function componentPlatforms(component: Pick<ComponentMeta, "category" | "platforms">): readonly ComponentPlatform[];
export declare function isComponentForPlatform(component: Pick<ComponentMeta, "category" | "platforms">, platform: ComponentPlatform): boolean;
