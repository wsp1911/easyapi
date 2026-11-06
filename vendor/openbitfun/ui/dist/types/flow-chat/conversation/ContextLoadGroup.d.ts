import { type ToolGroupProps } from './ToolGroup';
export type ContextLoadGroupProps = Omit<ToolGroupProps, 'variant' | 'kind' | 'counts' | 'summaryItems'>;
/** The host owns membership, localized summaries and persistent disclosure state. */
export declare const ContextLoadGroup: import("react").ForwardRefExoticComponent<ContextLoadGroupProps & import("react").RefAttributes<HTMLDivElement>>;
