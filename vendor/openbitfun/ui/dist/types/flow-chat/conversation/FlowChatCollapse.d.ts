import { type HTMLAttributes, type ReactNode } from 'react';
import './ConversationBlocks.css';
export declare const FLOWCHAT_COLLAPSE_DURATION_MS = 300;
export declare const FLOWCHAT_COLLAPSE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
export interface FlowChatCollapseProps extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    children?: ReactNode;
    className?: string;
    innerClassName?: string;
    durationMs?: number;
    disableAnimation?: boolean;
}
export declare const FlowChatCollapse: ({ isOpen, children, className, innerClassName, durationMs, disableAnimation, ...props }: FlowChatCollapseProps) => import("react/jsx-runtime").JSX.Element;
