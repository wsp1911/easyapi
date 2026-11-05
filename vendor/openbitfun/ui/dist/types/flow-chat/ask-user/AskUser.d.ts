import { type HTMLAttributes, type ReactNode } from "react";
export type AskUserState = "asking" | "submitting" | "submitted" | "completed" | "loading" | "error" | "timeout";
export interface AskUserOption {
    description?: ReactNode;
    label: ReactNode;
    value: string;
}
export interface AskUserCustomOption extends AskUserOption {
    inputLabel?: string;
    placeholder?: string;
}
export interface AskUserQuestion {
    customOption?: AskUserCustomOption;
    description?: ReactNode;
    id: string;
    /** Short subject shown beside the question count in the header. */
    label?: ReactNode;
    options: readonly AskUserOption[];
    prompt: ReactNode;
    selectionMode?: "multiple" | "single";
}
export type AskUserAnswers = Readonly<Record<string, readonly string[] | undefined>>;
export interface AskUserCustomAnswerChangeMeta {
    isComposing: boolean;
}
export interface AskUserNavigation {
    backLabel: ReactNode;
    nextLabel: ReactNode;
    progressLabel: (current: number, total: number) => string;
    selectionLabel: (selected: number, total: number) => ReactNode;
}
/**
 * Header-right wait timing. A running host deadline renders a dismissible
 * countdown; an unbounded wait renders the settled label instead so the header
 * never loses its timing affordance.
 */
export interface AskUserWaitTiming {
    cancelLabel?: string;
    cancelDisabled?: boolean;
    hint?: ReactNode;
    onCancel?: () => void;
    remainingLabel?: ReactNode;
    settledLabel?: ReactNode;
}
export interface AskUserProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
    answers?: AskUserAnswers;
    customAnswers?: Readonly<Record<string, string | undefined>>;
    defaultExpanded?: boolean;
    disabled?: boolean;
    /** A collapsed entry that opens an editable questionnaire. */
    disclosure?: {
        label: ReactNode;
        collapseLabel: string;
        skipped?: boolean;
    };
    expanded?: boolean;
    header?: ReactNode;
    headerTrailing?: ReactNode;
    /** Show one question at a time; submitted answers display every question and answer. */
    navigation?: AskUserNavigation;
    onAnswersChange?: (questionId: string, values: readonly string[]) => void;
    onCustomAnswerChange?: (questionId: string, value: string, meta: AskUserCustomAnswerChangeMeta) => void;
    onExpandedChange?: (expanded: boolean) => void;
    onSubmit?: () => void;
    questions: readonly AskUserQuestion[];
    state?: AskUserState;
    statusLabel?: ReactNode;
    submitDisabled?: boolean;
    submitLabel?: ReactNode;
    submitTitle?: string;
    submittingLabel?: ReactNode;
    summaryDetail?: ReactNode;
    summaryLabel?: ReactNode;
    waitTiming?: AskUserWaitTiming;
}
export declare const AskUser: import("react").ForwardRefExoticComponent<AskUserProps & import("react").RefAttributes<HTMLDivElement>>;
