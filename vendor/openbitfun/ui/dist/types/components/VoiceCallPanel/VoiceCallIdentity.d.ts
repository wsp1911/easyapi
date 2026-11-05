import { type ReactNode } from "react";
import { type VoiceParticleAudioReader } from "../../brand/VoiceParticleLogo";
export interface VoiceCallIdentityProps {
    expanded: boolean;
    active: boolean;
    label: string;
    /** Optional secondary action in the compact identity row. */
    leading?: ReactNode;
    disabled?: boolean;
    readAudio?: VoiceParticleAudioReader;
    onClick: () => void;
}
/** A persistent identity above the transcript, expanding on the same axis. */
export declare function VoiceCallIdentity({ expanded, active, label, leading, disabled, readAudio, onClick }: VoiceCallIdentityProps): import("react/jsx-runtime").JSX.Element;
