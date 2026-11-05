import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
import type { ToolCardInteraction } from './ToolCardInteraction';
export interface SessionToolCardField {
    label: ReactNode;
    value: ReactNode;
}
export interface SessionToolCardRecord {
    key: string;
    title: ReactNode;
    fields: readonly SessionToolCardField[];
}
export interface SessionToolCardSession {
    agentType?: ReactNode;
    id: ReactNode;
    key: string;
    name?: ReactNode;
}
interface SessionToolCardBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick"> {
    action?: ReactNode;
    emptyState?: ReactNode;
    error?: ReactNode;
    fields?: readonly SessionToolCardField[];
    records?: readonly SessionToolCardRecord[];
    icon: ReactNode;
    interaction?: ToolCardInteraction;
    isExpanded?: boolean;
    message?: ReactNode;
    messageLabel?: ReactNode;
    onToggle?: () => void;
    openAction?: {
        label: string;
        onPress: (event: MouseEvent<HTMLButtonElement>) => void;
    };
    sessions?: readonly SessionToolCardSession[];
    status: FlowChatToolStatus;
    statusLabel?: ReactNode;
    statusDescription?: string;
    resultSummary?: ReactNode;
    resultLabel?: string;
    summary: ReactNode;
    toolCard: string;
}
export interface SessionControlToolCardProps extends Omit<SessionToolCardBaseProps, "icon" | "message" | "messageLabel" | "toolCard" | "records"> {
}
export declare function SessionControlToolCard(props: SessionControlToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface SessionMessageToolCardProps extends Omit<SessionToolCardBaseProps, "emptyState" | "icon" | "sessions" | "toolCard" | "records"> {
}
export declare function SessionMessageToolCard(props: SessionMessageToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface CronToolCardProps extends Omit<SessionToolCardBaseProps, "icon" | "sessions" | "toolCard"> {
    timeQuery?: boolean;
}
export declare function CronToolCard({ timeQuery, ...props }: CronToolCardProps): import("react/jsx-runtime").JSX.Element;
export {};
