import { type VoiceParticleAudio } from './voiceParticleDynamics';
/** Canvas-only renderer. It never captures audio, owns a call, or starts a timer. */
export declare function createVoiceParticleRenderer(canvas: HTMLCanvasElement, foreground: string, background: string): {
    setColors: (nextForeground: string, nextBackground: string) => void;
    resize(cssWidth: number, cssHeight: number, pixelRatio: number): void;
    draw(time: number, audio: VoiceParticleAudio, animate?: boolean, formation?: number): void;
} | null;
