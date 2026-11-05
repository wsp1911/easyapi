export declare const switchMeta: {
    readonly category: "form";
    readonly description: "Toggles a single setting between on and off with native checkbox semantics.";
    readonly maturity: "stable";
    readonly name: "Switch";
    readonly props: readonly [{
        readonly name: "checked";
        readonly type: "boolean";
    }, {
        readonly name: "defaultChecked";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "false";
        readonly name: "disabled";
        readonly type: "boolean";
    }, {
        readonly name: "onChange";
        readonly type: "ChangeEventHandler<HTMLInputElement>";
    }, {
        readonly name: "onCheckedChange";
        readonly type: "(checked: boolean) => void";
    }];
    readonly states: readonly ["off", "on", "focus-visible", "disabled"];
    readonly tokens: readonly ["color.control.switch.track", "color.control.switch.trackChecked", "color.control.switch.thumb", "color.focus.ring", "control.switch.trackWidth", "control.switch.trackHeight", "control.switch.thumbSize", "control.switch.thumbInset", "control.switch.thumbTravel", "control.switch.thumbTravelReverse", "radius.pill"];
};
