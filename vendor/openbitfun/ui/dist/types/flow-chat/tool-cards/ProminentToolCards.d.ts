import type { HTMLAttributes, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
interface ProminentCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick" | "title"> {
    isExpanded?: boolean;
    onToggle?: () => void;
    status: FlowChatToolStatus;
}
export interface GitToolCardFooterItem {
    grow?: boolean;
    label?: ReactNode;
    tone?: "danger" | "neutral" | "success";
    value: ReactNode;
}
export interface GitToolCardProps extends ProminentCardProps {
    action: ReactNode;
    command: ReactNode;
    error?: ReactNode;
    errorMeta?: ReactNode;
    footerItems?: readonly GitToolCardFooterItem[];
    actions?: ReactNode;
    loading?: boolean;
    statusSummary?: ReactNode;
    statusTone?: "danger" | "neutral" | "warning";
    stderr?: ReactNode;
    stderrLabel?: ReactNode;
    stderrTone?: "danger" | "warning";
    stdout?: ReactNode;
}
export declare function GitToolCard({ action, actions, command, error, errorMeta, footerItems, isExpanded, loading, onToggle, status, statusSummary, statusTone, stderr, stderrLabel, stderrTone, stdout, ...props }: GitToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface FileDiffToolCardProps extends ProminentCardProps {
    action: ReactNode;
    changeSummary?: {
        additions: number | string;
        deletions: number | string;
        label: string;
    };
    error?: ReactNode;
    loading?: boolean;
    message?: ReactNode;
    path: string;
    pathLabel: ReactNode;
    preview?: ReactNode;
    textPreview?: ReactNode;
}
export declare function FileDiffToolCard({ action, changeSummary, error, isExpanded, loading, message, onToggle, path, pathLabel, preview, status, textPreview, ...props }: FileDiffToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface ReviewSummaryToolCardProps extends ProminentCardProps {
    action?: ReactNode;
    changedFiles?: readonly string[];
    fileCountLabel?: ReactNode;
    filesLabel?: ReactNode;
    kind?: "deep-review" | "review";
    loading?: boolean;
    summary: ReactNode;
    title: ReactNode;
}
export declare function ReviewSummaryToolCard({ action, changedFiles, fileCountLabel, filesLabel, isExpanded, kind, loading, onToggle, status, summary, title, ...props }: ReviewSummaryToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface PageLifecycleToolCardField {
    label: ReactNode;
    value: ReactNode;
}
interface PageLifecycleToolCardBaseProps extends ProminentCardProps {
    action: ReactNode;
    actions?: ReactNode;
    error?: ReactNode;
    fields?: readonly PageLifecycleToolCardField[];
    loading?: boolean;
    subject: ReactNode;
    toolCard: "page-deploy" | "page-publish";
    preview?: boolean;
    statusLabel?: ReactNode;
    version?: ReactNode;
}
export type PageDeployToolCardProps = Omit<PageLifecycleToolCardBaseProps, "toolCard">;
export declare function PageDeployToolCard(props: PageDeployToolCardProps): import("react/jsx-runtime").JSX.Element;
export type PagePublishToolCardProps = Omit<PageLifecycleToolCardBaseProps, "toolCard">;
export declare function PagePublishToolCard(props: PagePublishToolCardProps): import("react/jsx-runtime").JSX.Element;
export { AgentControlToolCard, type AgentControlToolCardProps } from "./AgentControlToolCard";
