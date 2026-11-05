import { type HTMLAttributes, type ReactNode } from "react";
export interface SetupWizardStep {
    /** Stable identity; changing it resets the content viewport's scroll position. */
    id: string;
    label: ReactNode;
    /** Explain the effect of this choice instead of repeating the form labels. */
    title: ReactNode;
    description: ReactNode;
    /** Localized progress, for example "2 / 3". */
    progress: ReactNode;
}
export interface SetupWizardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title: ReactNode;
    /** Use the same id on the containing Dialog's aria-labelledby. */
    titleId?: string;
    headerActions?: ReactNode;
    guideLabel: string;
    step: SetupWizardStep;
    footer: ReactNode;
    /** Contained delegates scrolling to an editor or another bounded child. */
    contentMode?: "scroll" | "contained";
}
/** Controlled setup layout. The consumer owns drafts, navigation and validation. */
export declare const SetupWizard: import("react").ForwardRefExoticComponent<SetupWizardProps & import("react").RefAttributes<HTMLDivElement>>;
