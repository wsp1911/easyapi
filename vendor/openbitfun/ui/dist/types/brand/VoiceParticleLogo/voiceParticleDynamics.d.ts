/** Motion coefficients and FFT envelopes ported from the supplied Voice-Particles-Demo. */
export interface Point {
    x: number;
    y: number;
}
export interface ParticleMotion extends Point {
    motionSpeed: number;
    motionPhase: number;
    seed: number;
}
export interface VoiceParticleAudio {
    /** FFT byte bins (fftSize 256), sampled from capture before muting or from audible playback. */
    user: Uint8Array | null;
    assistant: Uint8Array | null;
    assistantSpeaking: boolean;
}
export type VoiceParticleAudioReader = () => VoiceParticleAudio;
export declare const SILENT_VOICE_AUDIO: VoiceParticleAudio;
export declare const effectProfiles: {
    readonly human: {
        readonly strength: 1.4;
        readonly motion: 1.2;
        readonly density: 1.4;
        readonly brightness: 1;
    };
    readonly ai: {
        readonly strength: 2.1;
        readonly motion: 1.6;
        readonly density: 1.5;
        readonly brightness: 1.2;
    };
};
export declare const clamp: (v: number, min: number, max: number) => number;
export declare const lerp: (a: number, b: number, t: number) => number;
export interface VoiceEnergy {
    base: number;
    ai: number;
    aiBreath: number;
    demo: number;
}
/** Renderer-local envelopes avoid React updates at audio/frame frequency. No simulated speech. */
export declare class VoiceParticleAudioState {
    mode: 'idle' | 'speech' | 'ai';
    private micLevel;
    private aiActivity;
    private aiAudioLevel;
    private previousAiAudioLevel;
    private aiBreathPulse;
    private aiPulse;
    update(audio: VoiceParticleAudio, time: number): VoiceEnergy;
}
export declare function particleForce(p: ParticleMotion, anchor: Point, time: number, energy: VoiceEnergy): {
    ax: number;
    ay: number;
};
