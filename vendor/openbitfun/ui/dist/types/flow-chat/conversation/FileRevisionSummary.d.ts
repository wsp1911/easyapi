export interface FlowGroupFileRevision {
    path: string;
    label: string;
    /** Localized count prefix, including its separator before the filename. */
    countLabel: string;
    /** Localized expanded prefix, including its separator before the filename. */
    expandedLabel?: string;
    status?: 'running' | 'error' | 'stopped';
    statusLabel?: string;
    /** Cumulative additions and deletions displayed by the individual revisions. */
    changeSummary?: {
        additions: number | string;
        deletions: number | string;
        label: string;
    };
    openFile?: {
        label: string;
        onPress: () => void;
    };
}
export declare function FileRevisionSummary({ file, itemCount, expanded, onToggle, contentId, description, component, testId }: {
    file: FlowGroupFileRevision;
    itemCount: number;
    expanded: boolean;
    onToggle?: () => void;
    contentId?: string;
    description: string;
    component: string;
    testId: string;
}): import("react/jsx-runtime").JSX.Element;
