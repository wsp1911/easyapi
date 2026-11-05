export declare const voiceParticleLogoMeta: {
    readonly category: "brand";
    readonly name: "VoiceParticleLogo";
    readonly description: "A particle logo with separate microphone and audible assistant speech responses, preserving the supplied motion model.";
    readonly maturity: "stable";
    readonly props: readonly [{
        readonly name: "readAudio";
        readonly type: "VoiceParticleAudioReader";
    }, {
        readonly name: "active";
        readonly type: "boolean";
        readonly defaultValue: "true";
    }, {
        readonly name: "formation";
        readonly type: "number (0 = solid, 1 = particles)";
        readonly defaultValue: "1";
    }];
    readonly states: readonly ["idle", "paused", "reduced-motion"];
    readonly tokens: readonly ["color.content.onDark", "color.content.onLight"];
};
