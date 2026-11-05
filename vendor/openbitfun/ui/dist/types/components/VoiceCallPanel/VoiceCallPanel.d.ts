import { type HTMLAttributes, type ReactNode } from "react";
import { type VoiceParticleAudioReader } from "../../brand/VoiceParticleLogo";
export type VoiceCallPhase = "connecting" | "live" | "ending" | "error";
export interface VoiceCallLabels {
    back: string;
    close: string;
    mute: string;
    unmute: string;
    settings: string;
    end: string;
}
export interface VoiceCallPanelProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    title: string;
    labels: VoiceCallLabels;
    phase?: VoiceCallPhase;
    muted?: boolean;
    userTranscript?: string;
    assistantTranscript?: string;
    /** Localized connection, error or task status supplied by the application. */
    status?: ReactNode;
    readAudio?: VoiceParticleAudioReader;
    /** Embedded content delegates surface paint and corner geometry to its host. */
    presentation?: 'card' | 'embedded';
    onBack: () => void;
    onClose: () => void;
    onToggleMute: () => void;
    onOpenSettings: () => void;
    onEnd: () => void;
}
/** Controlled call presentation. Contains no routes, stores, locale catalogs or media APIs. */
export declare function VoiceCallPanel({ title, labels, phase, muted, userTranscript, assistantTranscript, status, readAudio, presentation, onBack, onClose, onToggleMute, onOpenSettings, onEnd, className, ...props }: VoiceCallPanelProps): import("react/jsx-runtime").JSX.Element;
