const source = {
  dash: "//bitdash-a.akamaihd.net/content/sintel/sintel.mpd",
  hls: "//bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  progressive: [
    {
      url: "//bitdash-a.akamaihd.net/content/sintel/Sintel.mp4",
      type: "video/mp4"
    },
    {
      url: "//bitdash-a.akamaihd.net/content/sintel/Sintel.webm",
      type: "video/webm"
    }
  ],
  poster: "//bitdash-a.akamaihd.net/content/sintel/poster.png",
  tracks: [
    {
      file: "//bitdash-a.akamaihd.net/content/sintel/sprite/sprite.vtt",
      kind: "thumbnails"
    }
  ],
  title: "Sintel",
  description:
    "A woman, Sintel, is attacked while traveling through a wintry mountainside. After defeating her attacker and taking his spear, she finds refuge in a shaman's hut...",
  markers: [
    {
      time: 0,
      title: "Intro"
    },
    {
      time: 102,
      title: "Old Guy"
    },
    {
      time: 150,
      title: "City"
    },
    {
      time: 200,
      title: "Dragon"
    },
    {
      time: 370,
      title: "Desert"
    },
    {
      time: 385,
      title: "Bamboo Forest"
    },
    {
      time: 410,
      title: "Winter again"
    },
    {
      time: 755,
      title: "Credits"
    }
  ],
  recommendations: [
    {
      title: "Recommendation 1: The best video ever",
      url: "http://bitmovin.com",
      thumbnail: "http://placehold.it/300x300",
      duration: 10.4
    },
    {
      title: "Recommendation 2: The second best video",
      url: "http://bitmovin.com",
      thumbnail: "http://placehold.it/300x300",
      duration: 64
    },
    {
      title: "Recommendation 3: The third best video of all time",
      url: "http://bitmovin.com",
      thumbnail: "http://placehold.it/300x300",
      duration: 195
    }
  ]
}

const config = {
  key: "YOUR KEY HERE",
  source,
  style: {
    ux: false
  },
  cast: {
    enable: true
  }
}

const {
  UIContainer,
  UIManager,
  PlaybackToggleOverlay,
  Label,
  SettingsPanel,
  SettingsPanelItem,
  VideoQualitySelectBox,
  PlaybackSpeedSelectBox,
  AudioQualitySelectBox,
  SubtitleSelectBox,
  ControlBar,
  Container,
  PlaybackTimeLabel,
  PlaybackTimeLabelMode,
  SeekBar,
  SeekBarLabel,
  VolumeToggleButton,
  VolumeSlider,
  Spacer,
  PictureInPictureToggleButton,
  AirPlayToggleButton,
  CastToggleButton,
  VRToggleButton,
  SettingsToggleButton,
  FullscreenToggleButton,
  SubtitleOverlay,
  BufferingOverlay,
  CastStatusOverlay,
  TitleBar,
  RecommendationOverlay,
  Watermark,
  ErrorMessageOverlay,
  AudioTrackSelectBox,
  PlaybackToggleButton,
  NextButton
} = bitmovin.playerui

const settingsPanel = new SettingsPanel({
  components: [
    new SettingsPanelItem("Video Quality", new VideoQualitySelectBox()),
    new SettingsPanelItem("Speed", new PlaybackSpeedSelectBox()),
    new SettingsPanelItem("Audio Track", new AudioTrackSelectBox()),
    new SettingsPanelItem("Audio Quality", new AudioQualitySelectBox()),
    new SettingsPanelItem("Subtitles", new SubtitleSelectBox())
  ],
  hidden: true
})

const controlBar = new ControlBar({
  components: [
    settingsPanel,
    new Container({
      components: [
        new PlaybackTimeLabel({
          timeLabelMode: PlaybackTimeLabelMode.CurrentTime,
          hideInLivePlayback: true
        }),
        new SeekBar({
          label: new SeekBarLabel()
        }),
        new PlaybackTimeLabel({
          timeLabelMode: PlaybackTimeLabelMode.TotalTime,
          cssClasses: ["text-right"]
        })
      ],
      cssClasses: ["controlbar-top"]
    }),
    new Container({
      components: [
        new PlaybackToggleButton(),
        //This should only appear when on a playlist
        new NextButton(),
        new VolumeToggleButton(),
        new VolumeSlider(),
        new Spacer(),
        new PictureInPictureToggleButton(),
        new AirPlayToggleButton(),
        new CastToggleButton(),
        new VRToggleButton(),
        new SettingsToggleButton({
          settingsPanel
        }),
        new FullscreenToggleButton()
      ],
      cssClasses: ["controlbar-bottom"]
    })
  ]
})

const eggheadUI = new UIContainer({
  components: [
    new SubtitleOverlay(),
    new BufferingOverlay(),
    new PlaybackToggleOverlay(),
    new CastStatusOverlay(),
    controlBar,
    new TitleBar(),
    new RecommendationOverlay(),
    new Watermark(),
    new ErrorMessageOverlay()
  ],
  cssClasses: ["ui-skin-egghead"]
})

const player = bitmovin.player("player")
let uiManager

player.setup(config).then(function(player) {
  let uiManager = new UIManager(player, eggheadUI)
})
