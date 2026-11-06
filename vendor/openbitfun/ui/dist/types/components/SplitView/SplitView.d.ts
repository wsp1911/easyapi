import { type HTMLAttributes, type ReactNode } from 'react';
export type SplitViewMode = 'split' | 'primary' | 'secondary';
/** Stable sibling hosts can change panes without reparenting their React tree. */
export declare function SplitViewSurface({ pane, active, className, children, ...props }: HTMLAttributes<HTMLDivElement> & {
    pane: 'primary' | 'secondary';
    active?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/** Absolutely positioned primary content that stays clear of the secondary overlay. */
export declare function SplitViewPrimaryDock({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export interface SplitViewHeaderGeometry {
    /** Shares the pane's live CSS size, including pointer resizing and clamping. */
    columnClassName: string;
}
export interface SplitViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    primary?: ReactNode;
    secondary?: ReactNode;
    /** A flat deck of SplitViewSurface children; keys belong to content, not panes. */
    surfaces?: ReactNode;
    /** Shared geometry for chrome that must align with the pane divider. */
    header?: ReactNode | ((geometry: SplitViewHeaderGeometry) => ReactNode);
    mode?: SplitViewMode;
    layout?: 'split' | 'overlay';
    secondarySide?: 'left' | 'right';
    /** Physical right slot width in split layout; secondary width in overlay layout. */
    rightSize: number;
    minLeftSize?: number;
    minRightSize?: number;
    maxRightSize?: number;
    defaultRightSize?: number;
    onRightSizeChange: (size: number) => void;
    onResizeStateChange?: (resizing: boolean) => void;
    dividerLabel: string;
    dividerActions?: ReactNode;
    primaryPaneProps?: HTMLAttributes<HTMLDivElement>;
    secondaryPaneProps?: HTMLAttributes<HTMLDivElement>;
}
export declare function SplitView({ primary, secondary, surfaces, header, mode, layout, secondarySide, rightSize, minLeftSize, minRightSize, maxRightSize, defaultRightSize, onRightSizeChange, onResizeStateChange, dividerLabel, dividerActions, primaryPaneProps, secondaryPaneProps, className, style, onKeyDown, ...rest }: SplitViewProps): import("react/jsx-runtime").JSX.Element;
