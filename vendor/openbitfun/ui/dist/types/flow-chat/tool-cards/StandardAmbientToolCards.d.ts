import type { HTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
interface AmbientCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "content" | "onClick" | "title"> {
    isExpanded?: boolean;
    onToggle?: () => void;
    status: FlowChatToolStatus;
    statusDescription?: string;
    resultSummary?: ReactNode;
}
export interface RunCodeToolCardProps extends AmbientCardProps {
    action: ReactNode;
    error?: ReactNode;
    actions?: ReactNode;
    output?: ReactNode;
    outputLabel?: ReactNode;
    program?: ReactNode;
    programLabel?: ReactNode;
    summary: ReactNode;
}
export declare function RunCodeToolCard({ action, actions, error, isExpanded, onToggle, output, outputLabel, program, programLabel, status, statusDescription, resultSummary, summary, ...props }: RunCodeToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface WebFetchToolCardProps extends AmbientCardProps {
    action?: ReactNode;
    content?: ReactNode;
    copyAction?: ReactNode;
    contentLabel?: ReactNode;
    details?: readonly ReactNode[];
    emptyContent?: ReactNode;
    error?: ReactNode;
    onOpenUrl?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    openUrlLabel?: string;
    title: ReactNode;
    url?: string;
}
export declare function WebFetchToolCard({ action, content, copyAction, contentLabel, details, emptyContent, error, isExpanded, onOpenUrl, onToggle, openUrlLabel, status, statusDescription, resultSummary, title, url, ...props }: WebFetchToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface DefaultToolCardProps extends AmbientCardProps {
    description?: ReactNode;
    displayName: ReactNode;
    error?: ReactNode;
    hasDetails?: boolean;
    icon?: ReactNode;
    inputLabel?: ReactNode;
    inputPreview?: ReactNode;
    onInputOpenChange?: (open: boolean) => void;
    requiresConfirmation?: boolean;
    resultLabel?: ReactNode;
    resultPreview?: ReactNode;
    summary: ReactNode;
    toolName: ReactNode;
}
export declare function DefaultToolCard({ description, displayName, error, hasDetails, icon, inputLabel, inputPreview, onInputOpenChange, isExpanded, onToggle, requiresConfirmation, resultLabel, resultPreview, status, statusDescription, resultSummary, summary, toolName, ...props }: DefaultToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface ViewImageToolCardProps extends AmbientCardProps {
    action?: ReactNode;
    alt: string;
    errorText?: ReactNode;
    height?: number;
    imageFailed?: boolean;
    lightboxOpen?: boolean;
    lightboxTitle?: ReactNode;
    onImageError?: () => void;
    onLightboxClose?: () => void;
    onOpenPreview?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    previewLabel: string;
    source?: string;
    statusText: ReactNode;
    width?: number;
}
export declare function ViewImageToolCard({ action, alt, errorText, height, imageFailed, isExpanded, lightboxOpen, lightboxTitle, onImageError, onLightboxClose, onOpenPreview, onToggle, previewLabel, source, status, statusDescription, resultSummary, statusText, width, ...props }: ViewImageToolCardProps): import("react/jsx-runtime").JSX.Element;
export type TodoToolCardItemStatus = "cancelled" | "completed" | "in_progress" | "pending";
export interface TodoToolCardItem {
    content: ReactNode;
    key: string;
    status: TodoToolCardItemStatus;
}
export interface TodoToolCardProps extends AmbientCardProps {
    allCompleted?: boolean;
    compactCountLabel?: ReactNode;
    compactProgressLabel?: ReactNode;
    completedCount: number;
    items: readonly TodoToolCardItem[];
    loading?: boolean;
    mode?: "compact" | "standard";
    progressLabel?: ReactNode;
    summary?: ReactNode;
    title: ReactNode;
    totalCount: number;
}
export declare function TodoToolCard({ allCompleted, compactCountLabel, compactProgressLabel, completedCount, isExpanded, items, loading, mode, onToggle, progressLabel, status, summary, title, totalCount, ...props }: TodoToolCardProps): import("react/jsx-runtime").JSX.Element;
export {};
