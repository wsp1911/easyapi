import { type ButtonHTMLAttributes, type ReactNode } from 'react';
export interface FlowChatTurnMetricsProps {
    label: string;
    tokenValue: string | null;
    tokenDescription: string;
    tokenDetails?: ReactNode;
    cacheHitRate: number | null;
    rateValue: string | null;
    rateDescription: string;
    rateDetails?: ReactNode;
    ttftValue?: string | null;
    ttftDescription?: string;
    ttftDetails?: ReactNode;
    speedLevel: 1 | 2 | 3 | 4 | null;
    focusable?: boolean;
}
export interface FlowChatMetricProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'content' | 'children' | 'type'> {
    children: ReactNode;
    content: ReactNode;
    description: string;
    focusable?: boolean;
}
/** Shared capsule trigger and frosted details surface for both sides of the footer. */
export declare function FlowChatMetric({ children, content, description, focusable, disabled, className, ...props }: FlowChatMetricProps): import("react/jsx-runtime").JSX.Element;
export interface FlowChatMetricDetailsProps {
    rows: ReadonlyArray<{
        label: string;
        value: string;
    }>;
    note?: string;
}
export declare function FlowChatMetricDetails({ rows, note }: FlowChatMetricDetailsProps): import("react/jsx-runtime").JSX.Element;
/** Compact data glyphs; measurement, thresholds and localized copy belong to the host. */
export declare function FlowChatTurnMetrics({ label, tokenValue, tokenDescription, tokenDetails, cacheHitRate, rateValue, rateDescription, rateDetails, speedLevel, focusable, ttftValue, ttftDescription, ttftDetails, }: FlowChatTurnMetricsProps): import("react/jsx-runtime").JSX.Element | null;
