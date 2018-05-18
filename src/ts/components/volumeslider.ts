import {SeekBar, SeekBarConfig} from './seekbar';
import {UIInstanceManager} from '../uimanager';

/**
 * Configuration interface for the {@link VolumeSlider} component.
 */
export interface VolumeSliderConfig extends SeekBarConfig {
  /**
   * Specifies if the volume slider should be automatically hidden when volume control is prohibited by the
   * browser or platform. This currently only applies to iOS.
   * Default: true
   */
  hideIfVolumeControlProhibited: boolean;
}

/**
 * A simple volume slider component to adjust the player's volume setting.
 */
export class VolumeSlider extends SeekBar {

  private static readonly issuerName = 'ui';

  constructor(config: SeekBarConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, <VolumeSliderConfig>{
      cssClass: 'ui-volumeslider',
      hideIfVolumeControlProhibited: true,
    }, this.config);
  }

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager, false);

    let config = <VolumeSliderConfig>this.getConfig();

    if (config.hideIfVolumeControlProhibited && !this.detectVolumeControlAvailability()) {
      this.hide();

      // We can just return from here, because the user will never interact with the control and any configured
      // functionality would only eat resources for no reason.
      return;
    }

    let volumeChangeHandler = () => {
      if (player.isMuted()) {
        this.setPlaybackPosition(0);
      } else {
        this.setPlaybackPosition(player.getVolume());
      }
    };

    player.addEventHandler(player.EVENT.ON_READY, volumeChangeHandler);
    player.addEventHandler(player.EVENT.ON_VOLUME_CHANGED, volumeChangeHandler);
    player.addEventHandler(player.EVENT.ON_MUTED, volumeChangeHandler);
    player.addEventHandler(player.EVENT.ON_UNMUTED, volumeChangeHandler);

    this.onSeekPreview.subscribeRateLimited((sender, args) => {
      if (args.scrubbing) {
        player.setVolume(args.position, VolumeSlider.issuerName);
      }
    }, 50);
    this.onSeeked.subscribe((sender, percentage) => {
      player.setVolume(percentage, VolumeSlider.issuerName);
    });

    // Update the volume slider marker when the player resized, a source is loaded and player is ready,
    // or the UI is configured. Check the seekbar for a detailed description.
    player.addEventHandler(player.EVENT.ON_PLAYER_RESIZE, () => {
      this.refreshPlaybackPosition();
    });
    player.addEventHandler(player.EVENT.ON_READY, () => {
      this.refreshPlaybackPosition();
    });
    uimanager.onConfigured.subscribe(() => {
      this.refreshPlaybackPosition();
    });

    // Init volume bar
    volumeChangeHandler();
  }

  private detectVolumeControlAvailability(): boolean {
    /*
     * "On iOS devices, the audio level is always under the user’s physical control. The volume property is not
     * settable in JavaScript. Reading the volume property always returns 1."
     * https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
     */
    // as muted autoplay gets paused as soon as we unmute it, we may not touch the volume of the actual player so we
    // probe a dummy audio element
    const dummyVideoElement = document.createElement('video');
    // try setting the volume to 0.7 and if it's still 1 we are on a volume control restricted device
    dummyVideoElement.volume = 0.7;
    return dummyVideoElement.volume !== 1;
  }
}
