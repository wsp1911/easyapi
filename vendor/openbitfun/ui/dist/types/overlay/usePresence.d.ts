export type PresenceState = "entering" | "entered" | "exiting";
export interface PresenceSnapshot {
    present: boolean;
    state: PresenceState;
}
export declare function usePresence(open: boolean, exitDurationMs: number): PresenceSnapshot;
