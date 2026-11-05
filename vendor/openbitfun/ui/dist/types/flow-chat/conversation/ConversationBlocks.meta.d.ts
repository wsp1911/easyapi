export declare const thinkingBlockMeta: {
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
};
export declare const exploreGroupMeta: {
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
};
export declare const flowChatRuntimeStatusMeta: {
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
};
export declare const flowGroupMeta: {
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
};
export declare const contextLoadGroupMeta: {
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
};
