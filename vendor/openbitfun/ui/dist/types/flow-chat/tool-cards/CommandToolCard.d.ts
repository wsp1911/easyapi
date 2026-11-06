import { type HTMLAttributes, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
import type { ToolCardInteraction } from './ToolCardInteraction';
export interface CommandToolCardAction {
    disabled?: boolean;
    label: string;
    onPress: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    testId?: string;
}
export interface CommandToolCardCopyAction extends CommandToolCardAction {
    copied?: boolean;
    copiedLabel?: string;
}
export interface CommandToolCardFooterItem {
    grow?: boolean;
    label?: ReactNode;
    pushToEnd?: boolean;
    tone?: "danger" | "neutral" | "success" | "warning";
    value: ReactNode;
}
export interface CommandToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick"> {
    action: ReactNode;
    attention?: "ambient" | "prominent";
    command?: string | null;
    commandTestId?: string;
    copyAction?: CommandToolCardCopyAction;
    emptyCommand: ReactNode;
    error?: ReactNode;
    footerItems?: readonly CommandToolCardFooterItem[];
    interruptAction?: CommandToolCardAction;
    interaction?: ToolCardInteraction;
    isExpanded: boolean;
    onToggle?: () => void;
    openAction?: CommandToolCardAction;
    output?: ReactNode;
    outputAction?: ReactNode;
    outputLabel?: ReactNode;
    outputDensity?: "compact" | "expanded";
    outputSizing?: "content" | "fixed";
    reserveFooter?: boolean;
    reserveOutput?: boolean;
    requiresConfirmation?: boolean;
    status: FlowChatToolStatus;
    statusLabel?: ReactNode;
    statusSummary?: ReactNode;
    statusTone?: "danger" | "neutral" | "success" | "warning";
    toggleTestId?: string;
    waitingContent?: ReactNode;
}
export declare function CommandToolCard({ action, attention, className, command, commandTestId, copyAction, emptyCommand, error, footerItems, interruptAction, interaction, isExpanded, onToggle, openAction, output, outputAction, outputLabel, outputDensity, outputSizing, reserveFooter, reserveOutput, requiresConfirmation, status, statusLabel, statusSummary, statusTone, toggleTestId, waitingContent, ...props }: CommandToolCardProps): import("react/jsx-runtime").JSX.Element;
