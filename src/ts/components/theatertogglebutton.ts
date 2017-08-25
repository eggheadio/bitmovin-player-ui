import {ToggleButton, ToggleButtonConfig} from './togglebutton';
import {UIInstanceManager} from '../uimanager';





export class TheaterToggleButton extends ToggleButton<ToggleButtonConfig> {
  static THEATER_TOGGLE:bitmovin.player.EVENT = "THEATER_TOGGLE"  

  constructor(config: ToggleButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-theatertogglebutton',
      text: 'Theater Mode'
    }, this.config);
  }

  configure(player: bitmovin.player.Player, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    this.onClick.subscribe(() => {
      uimanager.onTheaterToggled.dispatch(uimanager.getUI())
    });
  }
}