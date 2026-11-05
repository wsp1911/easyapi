import { type CanvasHTMLAttributes } from "react";
import { type VoiceParticleAudioReader } from "./voiceParticleDynamics";
export interface VoiceParticleLogoProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
    /** Read the current microphone/output FFT without publishing audio frames through React. */
    readAudio?: VoiceParticleAudioReader;
    active?: boolean;
    /** 0 is the authored solid mark; 1 is the full audio-reactive particle form. */
    formation?: number;
}
/** Decorative, audio-reactive logo. The host alone owns media and permission lifetimes. */
export declare function VoiceParticleLogo({ readAudio, active, formation, className, ...props }: VoiceParticleLogoProps): import("react/jsx-runtime").JSX.Element;
