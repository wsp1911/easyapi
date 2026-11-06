import { type HTMLAttributes, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
export type FlowChatToolStatus = "pending" | "queued" | "waiting" | "preparing" | "streaming" | "receiving" | "running" | "completed" | "error" | "cancelled" | "rejected" | "analyzing" | "pending_confirmation" | "confirmed";
export type ToolCardAffordanceKind = "expand" | "open-panel-right";
export interface ProminentToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick"> {
    allowExpandedWhenFailed?: boolean;
    className?: string;
    collapsibleErrorContent?: boolean;
    disableExpandAnimation?: boolean;
    errorContent?: ReactNode;
    expandedContent?: ReactNode;
    expandedContentLayout?: "inset" | "flush";
    isExpanded?: boolean;
    isFailed?: boolean;
    onToggle?: (event: ReactMouseEvent<HTMLElement>) => void;
    requiresConfirmation?: boolean;
    status: FlowChatToolStatus;
    summary: ReactNode;
    summaryAffordanceKind?: ToolCardAffordanceKind;
    summaryExpandAffordance?: boolean;
    toggleTestId?: string;
}
export declare function ProminentToolCard({ allowExpandedWhenFailed, className, collapsibleErrorContent, disableExpandAnimation, errorContent, expandedContent, expandedContentLayout, isExpanded, isFailed, onToggle, requiresConfirmation, status, summary, summaryAffordanceKind, summaryExpandAffordance, toggleTestId, ...props }: ProminentToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface AmbientToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick"> {
    className?: string;
    expandedContent?: ReactNode;
    expandedContentLayout?: "inset" | "flush";
    header: ReactNode;
    isExpanded?: boolean;
    requiresConfirmation?: boolean;
    onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
    status: FlowChatToolStatus;
    toggleTestId?: string;
}
export declare function AmbientToolCard({ className, expandedContent: nativeExpandedContent, expandedContentLayout, header, isExpanded: nativeExpanded, requiresConfirmation, onClick: nativeOnClick, onKeyDown: onRootKeyDown, role, status, tabIndex, toggleTestId, ...props }: AmbientToolCardProps): import("react/jsx-runtime").JSX.Element;
export interface ToolCardIconSlotProps {
    affordanceKind?: ToolCardAffordanceKind;
    className?: string;
    description?: string;
    expandable?: boolean;
    icon: ReactNode;
    isExpanded?: boolean;
    onAffordanceClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    showDivider?: boolean;
}
export declare function ToolCardIconSlot({ affordanceKind, className, description, expandable, icon, isExpanded, onAffordanceClick, showDivider, }: ToolCardIconSlotProps): import("react/jsx-runtime").JSX.Element;
export interface ToolCardStatusIconProps {
    className?: string;
    icon: ReactNode;
    withDivider?: boolean;
}
export declare function ToolCardStatusIcon({ className, icon, withDivider, }: ToolCardStatusIconProps): import("react/jsx-runtime").JSX.Element;
export interface ToolCardActionsProps {
    children: ReactNode;
    className?: string;
    /** Reveal on the owning region's hover/focus; the owner controls hidden layout. */
    revealOnHover?: boolean;
}
export declare function ToolCardActions({ children, className, revealOnHover }: ToolCardActionsProps): import("react/jsx-runtime").JSX.Element;
export interface ToolCardSubjectProps extends HTMLAttributes<HTMLSpanElement> {
    actions?: ReactNode;
}
/** An object and its auxiliary controls form one reading and interaction unit. */
export declare function ToolCardSubject({ children, actions, className, ...props }: ToolCardSubjectProps): import("react/jsx-runtime").JSX.Element;
export interface ToolCardChangeSummaryProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    additions?: number | string;
    deletions?: number | string;
    /** Roll changed digits while the host is generating the change. */
    animated?: boolean;
}
export declare function ToolCardChangeSummary({ additions, animated, className, deletions, ...props }: ToolCardChangeSummaryProps): import("react/jsx-runtime").JSX.Element | null;
export interface ProminentToolCardSummaryProps {
    action?: ReactNode;
    actionDataAttributes?: Record<`data-${string}`, boolean | number | string | undefined>;
    actionTestId?: string;
    actions?: ReactNode;
    affordanceKind?: ToolCardAffordanceKind;
    /** Visible primary decisions in the prominent card's right-hand control region. */
    primaryActions?: ReactNode;
    content?: ReactNode;
    /** Auxiliary subject controls share the prominent card's trailing region. */
    contentActions?: ReactNode;
    expandAffordance?: boolean;
    extra?: ReactNode;
    summaryExpanded?: boolean;
    icon?: ReactNode;
    onAffordanceClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    statusIcon?: ReactNode;
    /** Opt into one action/content shimmer scope; false retains its layout while inactive. */
    textShimmer?: boolean;
    trailingActions?: ReactNode;
}
export declare function ProminentToolCardSummary({ action, actionDataAttributes, actionTestId, actions, affordanceKind, content, contentActions, expandAffordance, extra, summaryExpanded, icon, onAffordanceClick, primaryActions, statusIcon, textShimmer, trailingActions, }: ProminentToolCardSummaryProps): import("react/jsx-runtime").JSX.Element;
export interface AmbientToolCardHeaderProps {
    action?: ReactNode;
    affordanceKind?: ToolCardAffordanceKind;
    content?: ReactNode;
    /** Auxiliary controls for the subject, separate from status and primary actions. */
    contentActions?: ReactNode;
    /** Operation targets are plain by default. Prefer result for returned evidence. */
    contentVariant?: "tinted" | "plain";
    /** A concise, recorded result; never a generic success or progress label. */
    result?: ReactNode;
    /** Quiet status detail attached to the leading icon, including keyboard access. */
    statusDescription?: string;
    expandable?: boolean;
    extra?: ReactNode;
    icon?: ReactNode;
    isExpanded?: boolean;
    onAffordanceClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    rightStatusIcon?: ReactNode;
    rightStatusIconWithDivider?: boolean;
    showDivider?: boolean;
}
export declare function AmbientToolCardHeader({ action, affordanceKind, content, contentActions, contentVariant, result, statusDescription, expandable, extra, icon, isExpanded, onAffordanceClick, rightStatusIcon, rightStatusIconWithDivider, showDivider, }: AmbientToolCardHeaderProps): import("react/jsx-runtime").JSX.Element;
