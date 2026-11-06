import { type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { type FlowGroupFileRevision } from './FileRevisionSummary';
import './ConversationBlocks.css';
export type { FlowGroupFileRevision } from './FileRevisionSummary';
/** A host-owned, single-use receipt. Counts, hydration and mounting are not arrivals. */
export interface FlowGroupReceiveFeedback {
    claim: () => boolean;
}
export interface FlowGroupFilter {
    label: string;
    value: string;
    options: readonly {
        value: string;
        label: string;
        count?: string;
    }[];
    onValueChange: (value: string) => void;
}
/** Host-controlled browsing; the public component never inspects tool payloads. */
export interface FlowGroupBrowserProps {
    query: string;
    onQueryChange: (query: string) => void;
    searchLabel: string;
    clearSearchLabel: string;
    filterLabel?: string;
    tools: FlowGroupFilter;
    status: FlowGroupFilter;
    resultLabel: string;
    notice?: string;
    filtering: boolean;
    pending?: boolean;
    empty: boolean;
    emptyLabel: string;
    resetLabel: string;
    onReset: () => void;
    onInteract?: () => void;
}
export interface FlowGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: ReactNode;
    expanded: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    leading?: ReactNode;
    summary: string;
    summaryItems?: readonly {
        label: string;
        count: string;
    }[];
    /** Full localized description for the tooltip and accessible control name. */
    summaryDescription?: string;
    itemCount?: number;
    placement?: 'standalone' | 'inline';
    streaming?: boolean;
    /** Opt into an internal scroll area for embedded hosts; transcripts use natural height. */
    bounded?: boolean;
    /** The host renders members as siblings in its single virtual timeline. */
    externalContent?: boolean;
    receiveFeedback?: FlowGroupReceiveFeedback;
    contentRef?: Ref<HTMLDivElement>;
    onContentScroll?: HTMLAttributes<HTMLDivElement>['onScroll'];
    contentProps?: HTMLAttributes<HTMLDivElement>;
    browser?: FlowGroupBrowserProps;
    /** A shared file identity with bound revision pages instead of a capsule. */
    fileRevision?: FlowGroupFileRevision;
    /** Stable anatomy identity for semantic presets and installed Appearance packages. */
    'data-openbitfun-component'?: string;
    'data-testid'?: string;
    'data-group-kind'?: string;
}
/** Controlled collection anatomy. Membership, summaries and disclosure persistence belong to the host. */
export declare const FlowGroup: import("react").ForwardRefExoticComponent<FlowGroupProps & import("react").RefAttributes<HTMLDivElement>>;
