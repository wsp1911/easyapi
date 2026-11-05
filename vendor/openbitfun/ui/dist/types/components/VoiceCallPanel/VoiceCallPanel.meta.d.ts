export declare const voiceCallPanelMeta: {
    readonly category: "feedback";
    readonly name: "VoiceCallPanel";
    readonly description: "A controlled live-call surface. VoiceCallIdentity, VoiceCallTranscript and VoiceCallControls also expose its shared anatomy for persistent text/voice hosts.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "title";
        readonly type: "string";
    }, {
        readonly name: "labels";
        readonly type: "VoiceCallLabels";
    }, {
        readonly name: "phase";
        readonly type: "connecting | live | ending | error";
        readonly defaultValue: "live";
    }, {
        readonly name: "muted";
        readonly type: "boolean";
        readonly defaultValue: "false";
    }, {
        readonly name: "userTranscript";
        readonly type: "string";
    }, {
        readonly name: "assistantTranscript";
        readonly type: "string";
    }, {
        readonly name: "status";
        readonly type: "ReactNode";
    }, {
        readonly name: "readAudio";
        readonly type: "VoiceParticleAudioReader";
    }, {
        readonly name: "presentation";
        readonly type: "card | embedded";
        readonly defaultValue: "card";
    }, {
        readonly name: "onBack / onClose / onToggleMute / onOpenSettings / onEnd";
        readonly type: "() => void";
    }];
    readonly states: readonly ["connecting", "live", "muted", "ending", "error"];
    readonly tokens: readonly ["color.content.onDark", "color.content.onLight", "type.heading.panel", "type.body.lg", "type.modifier.leading.tight", "type.flow.body", "type.flow.control", "type.flow.support", "color.content.primary", "color.content.secondary", "color.action.quiet.hover", "control.flowChat.cardRadius", "space.3", "space.6", "space.8", "radius.lg"];
};
