type ReadMeasurement = () => (() => void) | undefined;
/** Batch geometry reads before React state publication. Overflow UI may update
 * on the next frame; this is a scheduling contract, not a scroll speed guarantee.
 */
export declare function scheduleOverflowMeasurement(view: Window, read: ReadMeasurement): void;
export declare function cancelOverflowMeasurement(view: Window, read: ReadMeasurement): void;
export {};
