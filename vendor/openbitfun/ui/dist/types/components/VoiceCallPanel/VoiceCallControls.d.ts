import type { VoiceCallLabels, VoiceCallPhase } from "./VoiceCallPanel";
export interface VoiceCallControlsProps {
    labels: VoiceCallLabels;
    phase: VoiceCallPhase;
    muted: boolean;
    compact?: boolean;
    onToggleMute: () => void;
    onOpenSettings: () => void;
    onEnd: () => void;
}
export declare function VoiceCallControls({ labels, phase, muted, compact, onToggleMute, onOpenSettings, onEnd }: VoiceCallControlsProps): import("react/jsx-runtime").JSX.Element;
