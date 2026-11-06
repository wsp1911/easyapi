import type { HTMLAttributes } from 'react';
import './ConversationBlocks.css';
export interface FlowChatRuntimeStatusProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    visible: boolean;
    placement?: 'footer' | 'inline';
    revealDelayMs?: number;
}
/** A resident status slot; submission receipts and the selected hint belong to the host. */
export declare function FlowChatRuntimeStatus({ label, visible, placement, revealDelayMs, className, ...props }: FlowChatRuntimeStatusProps): import("react/jsx-runtime").JSX.Element;
