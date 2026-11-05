import { type MotionClip } from "./subagentMotion";
/** One player owns every size sample, all animation handles, and completion. */
export declare function createSubagentMotionPlayer(host: HTMLElement, onFinish: () => void, selector?: string): {
    play: (clip: MotionClip, { repeat, fromCurrent, notify }?: {
        repeat?: boolean | undefined;
        fromCurrent?: boolean | undefined;
        notify?: boolean | undefined;
    }) => void;
    setPaused(value: boolean): void;
    setSuspended(value: boolean): void;
    setRate(value: number): void;
    setReduced(value: boolean): void;
    dispose(): void;
};
export type SubagentMotionPlayer = ReturnType<typeof createSubagentMotionPlayer>;
