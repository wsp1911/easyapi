import { type HTMLAttributes } from 'react';
import { type SubagentHatchPhase } from './subagentHatchMotion';
export interface SubagentHatchProps extends HTMLAttributes<HTMLSpanElement> {
    phase: SubagentHatchPhase;
    size?: number;
    active?: boolean;
    label?: string;
}
/** Applications provide the real avatar as children and own creation/error state. */
export declare function SubagentHatch({ phase, size, active, label, children, className, style, ...props }: SubagentHatchProps): import("react/jsx-runtime").JSX.Element;
