import { type FlowGroupProps } from './FlowGroup';
/** Compatibility props for the existing semantic presets. */
export interface ToolGroupProps extends Omit<FlowGroupProps, 'leading' | 'onExpandedChange'> {
    variant: 'explore' | 'context';
    kind?: 'read' | 'search' | 'command' | 'mixed' | 'other';
    counts?: {
        read: number;
        search: number;
        command: number;
    };
    onToggle?: () => void;
    /** @deprecated ScrollArea now owns edge measurement. */
    scrollState?: {
        hasScroll: boolean;
        atTop: boolean;
        atBottom: boolean;
    };
}
export declare const ToolGroup: import("react").ForwardRefExoticComponent<ToolGroupProps & import("react").RefAttributes<HTMLDivElement>>;
