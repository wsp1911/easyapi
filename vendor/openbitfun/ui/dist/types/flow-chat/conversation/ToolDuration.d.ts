import type { ReactNode } from 'react';
import './ToolDuration.css';
export declare function formatDurationLive(ms: number): string;
export declare function formatDurationPrecise(ms: number): string;
export interface ToolDurationProps {
    isRunning: boolean;
    /** Show the leading timer icon for a live duration. */
    showIcon?: boolean;
    elapsedMs?: number;
    remainingMs?: number | null;
    timeoutMs?: number;
    timeoutDisabled?: boolean;
    open?: boolean;
    completedDurationMs?: number;
    showCompletedDuration?: boolean;
    completedStatus?: 'success' | 'error' | 'cancelled';
    completionLabel?: string;
    /** Host-owned localization. Omit to retain the default compact format. */
    formatDuration?: (milliseconds: number, precision: 'live' | 'precise') => string;
    children?: ReactNode;
}
/** Controlled duration anatomy. Clock, timeout mutations and overlays belong to the host. */
export declare function ToolDuration({ isRunning, showIcon, elapsedMs, remainingMs, timeoutMs, timeoutDisabled, open, completedDurationMs, showCompletedDuration, completedStatus, completionLabel, children, formatDuration, }: ToolDurationProps): import("react/jsx-runtime").JSX.Element | null;
