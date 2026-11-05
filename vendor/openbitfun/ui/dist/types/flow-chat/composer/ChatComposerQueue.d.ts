import { type HTMLAttributes, type LiHTMLAttributes, type ReactNode } from "react";
export type ChatComposerQueueItemState = "default" | "sending" | "failed";
export interface ChatComposerQueueProps extends HTMLAttributes<HTMLElement> {
}
export interface ChatComposerQueueHeaderProps extends HTMLAttributes<HTMLDivElement> {
}
export interface ChatComposerQueueTitleProps extends HTMLAttributes<HTMLSpanElement> {
    count?: ReactNode;
}
export interface ChatComposerQueueListProps extends HTMLAttributes<HTMLUListElement> {
}
export interface ChatComposerQueueItemProps extends LiHTMLAttributes<HTMLLIElement> {
    state?: ChatComposerQueueItemState;
}
export interface ChatComposerQueueItemContentProps extends HTMLAttributes<HTMLDivElement> {
}
export interface ChatComposerQueueAttachmentBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    count: number;
    label: string;
}
export interface ChatComposerQueueItemActionsProps extends HTMLAttributes<HTMLDivElement> {
}
/** Neutral queue surface rendered inside a ChatComposer body. */
export declare const ChatComposerQueue: import("react").ForwardRefExoticComponent<ChatComposerQueueProps & import("react").RefAttributes<HTMLElement>>;
/** Queue heading row. Supply a real icon from the consumer's icon library. */
export declare const ChatComposerQueueHeader: import("react").ForwardRefExoticComponent<ChatComposerQueueHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
/** Queue label and its separate total-count fact. */
export declare const ChatComposerQueueTitle: import("react").ForwardRefExoticComponent<ChatComposerQueueTitleProps & import("react").RefAttributes<HTMLSpanElement>>;
export declare const ChatComposerQueueList: import("react").ForwardRefExoticComponent<ChatComposerQueueListProps & import("react").RefAttributes<HTMLUListElement>>;
export declare const ChatComposerQueueItem: import("react").ForwardRefExoticComponent<ChatComposerQueueItemProps & import("react").RefAttributes<HTMLLIElement>>;
export declare const ChatComposerQueueItemContent: import("react").ForwardRefExoticComponent<ChatComposerQueueItemContentProps & import("react").RefAttributes<HTMLDivElement>>;
/** Per-message attachment count; this is intentionally distinct from queue position. */
export declare const ChatComposerQueueAttachmentBadge: import("react").ForwardRefExoticComponent<ChatComposerQueueAttachmentBadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
export declare const ChatComposerQueueItemActions: import("react").ForwardRefExoticComponent<ChatComposerQueueItemActionsProps & import("react").RefAttributes<HTMLDivElement>>;
