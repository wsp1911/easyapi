export declare const askUserMeta: {
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
};
