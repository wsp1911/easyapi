import type { HTMLAttributes, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
export interface ReadFileToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "content" | "onClick"> {
    accessibleLabel?: string;
    action?: ReactNode;
    content?: ReactNode;
    interactive?: boolean;
    onOpen?: () => void;
    status: FlowChatToolStatus;
    statusDescription?: string;
}
export declare function ReadFileToolCard({ accessibleLabel, action, className, content, interactive, onOpen, status, statusDescription, ...props }: ReadFileToolCardProps): import("react/jsx-runtime").JSX.Element;
