import {ToggleButton, ToggleButtonConfig} from './togglebutton';
import {UIInstanceManager} from '../uimanager';

/**
 * A button that toggles the player between windowed and fullscreen view.
 */
export class TheaterToggleButton extends ToggleButton<ToggleButtonConfig> {

  constructor(config: ToggleButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-theatertogglebutton',
      text: 'Theater Mode'
    }, this.config);
  }

  configure(player: bitmovin.player.Player, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    let fullscreenStateHandler = () => {
      if (player.isFullscreen()) {
        this.on();
      } else {
        this.off();
      }
    };

    player.addEventHandler(player.EVENT.ON_FULLSCREEN_ENTER, fullscreenStateHandler);
    player.addEventHandler(player.EVENT.ON_FULLSCREEN_EXIT, fullscreenStateHandler);

    this.onClick.subscribe(() => {
      if (player.isFullscreen()) {
        player.exitFullscreen();
      } else {
        player.enterFullscreen();
      }
    });

    // Startup init
    fullscreenStateHandler();
  }
}