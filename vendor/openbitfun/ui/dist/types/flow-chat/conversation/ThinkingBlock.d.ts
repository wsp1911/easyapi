import { type HTMLAttributes, type ReactNode, type Ref } from 'react';
import type { ThinkingContinuationResolver } from './useThinkingAnnotation';
import './ConversationBlocks.css';
export interface ThinkingBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: ReactNode;
    expanded: boolean;
    streaming?: boolean;
    visuallyStreaming?: boolean;
    /** The reader's seven-line viewport during streaming and visual reveal. */
    streamingExpanded?: boolean;
    onStreamingExpandedChange?: (expanded: boolean) => void;
    /** A closing parent owns the fold; preserve the last live viewport until unmount. */
    retainStreamingViewport?: boolean;
    reasoningKind?: 'reasoning' | 'summary';
    status?: string;
    context?: 'default' | 'subagent-projection';
    label: string;
    /** Accessible name and tooltip for the completed reasoning side icon. */
    capsuleLabel?: string;
    /** Dock a settled disclosure beside a continuation marked data-thinking-continuation. */
    collapseIntoNext?: boolean;
    /** Recycled rows settle initial placement and measure resting side controls on interaction. */
    virtualized?: boolean;
    /** Resolve a continuation in a peer container when it is not a direct sibling. */
    resolveContinuation?: ThinkingContinuationResolver;
    /** Coordinate the first live successor with the outgoing row, without remounting it. */
    coordinateContinuation?: boolean;
    /** Scope a handoff to the host's session/item/attempt identity. */
    handoffIdentity?: string;
    /** Availability, attention bypass, and whether the local handoff is still pending. */
    onContinuationReadyChange?: (ready: boolean, immediate: boolean, pending: boolean) => void;
    /** A containing FlowGroup can own scrolling for the entire execution stream. */
    scrollOwner?: 'self' | 'parent';
    onToggle?: () => void;
    /** Open host-owned details without changing the inline streaming disclosure. */
    onOpenDetails?: () => void;
    contentRef?: Ref<HTMLDivElement>;
    expandContainerRef?: Ref<HTMLDivElement>;
    /** Keep the disclosure shell while omitting an inactive Markdown tree. */
    mountContent?: boolean;
    contentProps?: HTMLAttributes<HTMLDivElement>;
    scrollState?: {
        hasScroll: boolean;
        atTop: boolean;
        atBottom: boolean;
    };
}
/** Controlled view. Reveal, stream and scrolling ownership remain with the consumer. */
export declare const ThinkingBlock: import("react").ForwardRefExoticComponent<ThinkingBlockProps & import("react").RefAttributes<HTMLDivElement>>;
