import { type ReactNode } from "react";
export interface VoiceTranscriptEntry {
    id: string;
    role: "user" | "assistant" | "status";
    content: ReactNode;
    /** Host-owned transient feedback beneath the message, outside its bubble. */
    activity?: ReactNode;
}
export interface VoiceCallTranscriptProps {
    entries: readonly VoiceTranscriptEntry[];
    status?: ReactNode;
    header?: ReactNode;
    className?: string;
    compact?: boolean;
    /** Chat uses FlowChat message tokens; voice retains the inverse call surface. */
    presentation?: "voice" | "chat";
    /** Requests older records when the reader scrolls toward the start. The host owns paging and retries. */
    onLoadEarlier?: () => void;
}
/** One reading viewport for both text and voice. The host owns the records. */
export declare function VoiceCallTranscript({ entries, status, header, className, compact, presentation, onLoadEarlier }: VoiceCallTranscriptProps): import("react/jsx-runtime").JSX.Element;
