import { type RefObject } from 'react';
type Position = 'block' | 'side';
/** Move the retained control only after it has faded out. CSS owns the fold and
 * its reversal; this hook waits for those actual transitions, never a timer. */
export declare function useThinkingHandoff(rootRef: RefObject<HTMLDivElement>, side: boolean, label: string, wantsDock: boolean, virtualized?: boolean): {
    phase: Position | "leaving";
    motionReady: boolean;
    origin: Position;
    top: string | undefined;
    label: string;
};
export {};
