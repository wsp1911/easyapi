/** Time-based, reversible formation; changing direction never jumps to an endpoint. */
export declare class VoiceParticleFormation {
    private from;
    private target;
    private startedAt;
    private duration;
    moving: boolean;
    constructor(initial: number);
    sample(time: number, reducedMotion?: boolean): number;
    setTarget(target: number, time: number): void;
}
