export declare const subagentHatchMeta: {
    readonly category: "brand";
    readonly name: "SubagentHatch";
    readonly description: "An antenna-topped egg that incubates during delegation and opens once into the supplied Subagent avatar.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "phase";
        readonly type: "'incubating' | 'ready' | 'stopped'";
    }, {
        readonly name: "size";
        readonly type: "number";
        readonly defaultValue: "space.8";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["incubating", "ready", "stopped", "reduced-motion"];
    readonly tokens: readonly ["space.8"];
};
export declare const openBitFunSolidMarkMeta: {
    readonly category: "brand";
    readonly name: "OpenBitFunSolidMark";
    readonly description: "The original silver OpenBitFun mark on a transparent canvas, preserving its material and shading.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "size";
        readonly type: "number";
        readonly defaultValue: "control.height.lg";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["control.height.lg"];
};
export declare const openBitFunAppIconMeta: {
    readonly category: "brand";
    readonly name: "OpenBitFunAppIcon";
    readonly description: "The installed application icon: the silver mark on its authored black rounded-square tile, with resolution-aware assets.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "size";
        readonly type: "number";
        readonly defaultValue: "control.height.lg";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["control.height.lg"];
};
export declare const openBitFunMarkMeta: {
    readonly category: "brand";
    readonly name: "OpenBitFunMark";
    readonly description: "The authored OpenBitFun mark with inherited color and an optional startup breathing motion.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "size";
        readonly type: "CSSProperties['width']";
        readonly defaultValue: "120px";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly name: "motion";
        readonly type: "'none' | 'breathe'";
        readonly defaultValue: "none";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }];
    readonly states: readonly ["static", "breathe", "paused"];
    readonly tokens: readonly ["color.content.primary"];
};
export declare const openBitFunBrandMotionMeta: {
    readonly category: "brand";
    readonly name: "OpenBitFunBrandMotion";
    readonly description: "OpenBitFun motion: circulating highlights, counter-rotating hexagons, or a compact engineering drawing that forms the original mark.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "size";
        readonly type: "number";
        readonly defaultValue: "192";
    }, {
        readonly name: "label";
        readonly type: "string";
    }, {
        readonly name: "variant";
        readonly type: "'flow' | 'counter-rotate' | 'construction'";
        readonly defaultValue: "flow";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }];
    readonly states: readonly ["construction", "playing", "counter-rotate", "paused", "reduced-motion"];
    readonly tokens: readonly ["color.content.primary"];
};
