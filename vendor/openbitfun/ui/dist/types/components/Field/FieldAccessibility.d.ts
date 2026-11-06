import { type AriaAttributes, type ReactNode } from "react";
type FieldAccessibility = Pick<AriaAttributes, "aria-labelledby" | "aria-describedby">;
/** Associates a layout-owned label with controls, including controls inside wrappers.
 * Composite fields should give each child its own accessible name.
 */
export declare function FieldAccessibilityProvider({ children, ...value }: FieldAccessibility & {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useFieldAccessibility(props: AriaAttributes, hasOwnLabel?: boolean): FieldAccessibility;
export {};
