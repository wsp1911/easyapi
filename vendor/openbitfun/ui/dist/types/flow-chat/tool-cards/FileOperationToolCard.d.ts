import type { HTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
export type FileOperationKind = "delete" | "edit" | "write";
export interface FileOperationToolCardAction {
    label: string;
    onPress: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    testId?: string;
}
export interface FileOperationToolCardError {
    guidance?: boolean;
    message: ReactNode;
    title?: ReactNode;
}
export interface FileOperationToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick"> {
    actionLabel: ReactNode;
    actionTestId?: string;
    changeSummary?: {
        additions: number | string;
        deletions: number | string;
        label: string;
    };
    error?: FileOperationToolCardError;
    inlineMessage?: ReactNode;
    isExpanded?: boolean;
    onOpenFile?: FileOperationToolCardAction;
    onToggle?: () => void;
    operation: FileOperationKind;
    path: string;
    pathLabel: ReactNode;
    pathTestId?: string;
    preview?: ReactNode;
    requiresConfirmation?: boolean;
    status: FlowChatToolStatus;
    statusDetail?: ReactNode;
}
export declare function FileOperationToolCard({ actionLabel, actionTestId, changeSummary, className, error, inlineMessage, isExpanded, onOpenFile, onToggle, operation, path, pathLabel, pathTestId, preview, requiresConfirmation, status, statusDetail, ...props }: FileOperationToolCardProps): import("react/jsx-runtime").JSX.Element;
