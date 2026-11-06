import { type RefObject } from 'react';
export type SubagentHatchPhase = 'incubating' | 'ready' | 'stopped';
/** Reveal only a creation observed on screen; restored/late-hydrated avatars stay settled. */
export declare function useSubagentHatchMotion(ref: RefObject<HTMLElement>, phase: SubagentHatchPhase, active: boolean): void;
