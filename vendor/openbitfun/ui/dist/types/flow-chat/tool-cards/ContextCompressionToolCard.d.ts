import type { HTMLAttributes, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
export interface ContextCompressionToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    error?: ReactNode;
    isExpanded?: boolean;
    onToggle?: () => void;
    processingText?: ReactNode;
    status: FlowChatToolStatus;
    summary?: ReactNode;
    title: ReactNode;
}
export declare function ContextCompressionToolCard({ className, error, isExpanded, onToggle, processingText, status, summary, title, ...props }: ContextCompressionToolCardProps): import("react/jsx-runtime").JSX.Element;
