//https://github.com/eggheadio/egghead-rails/blob/master/client/app/components/ReactPlayer/players/Bitmovin.js#L41

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
  key: "56231f1a-2845-4d2e-a432-07436d3f4958",
  source,
  style: {
    ux: false
  },
  cast: {
    enable: true
  }
}

const player = bitmovin.player("player")

player.setup(config).then(function(player) {
  const uiManager = bitmovin.playerui.UIManager.Factory.buildEggheadUI(player, {isPro: false});

  uiManager.currentUi.onTheaterToggled.subscribe(()=>{
    console.log('what...')
  })
})