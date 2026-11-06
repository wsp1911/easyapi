export declare const subagentBasicMotionIds: readonly ["idle", "look", "hoverBlink", "press", "nod", "working", "waiting", "success", "blocked"];
export declare const subagentTransitionIds: readonly ["enter", "exit", "settle"];
declare const subagentMotionIds: readonly ["idle", "look", "hoverBlink", "press", "nod", "working", "waiting", "success", "blocked", "enter", "exit", "settle"];
export type SubagentMotionId = typeof subagentMotionIds[number];
export type MotionPart = "body" | "lever" | "face" | "eyes";
export type MotionTracks = Partial<Record<MotionPart, Keyframe[]>>;
export interface MotionClip {
    duration: number;
    loop?: boolean;
    tracks: MotionTracks;
}
export declare const subagentMotionClips: Record<SubagentMotionId, MotionClip>;
export declare const subagentMotionSequence: readonly SubagentMotionId[];
export declare const neutralMotionFrames: () => Keyframe[];
export declare function lookMotionClip(x: number, y: number): MotionClip;
export declare const pressHoldClip: MotionClip;
export declare const pressReleaseClip: MotionClip;
export {};
