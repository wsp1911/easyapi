import { type ToolGroupProps } from './ToolGroup';
export type ExploreGroupProps = Omit<ToolGroupProps, 'variant'>;
/** Controlled exploration using the shared tool-group disclosure anatomy. */
export declare const ExploreGroup: import("react").ForwardRefExoticComponent<ExploreGroupProps & import("react").RefAttributes<HTMLDivElement>>;
