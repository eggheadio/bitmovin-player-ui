import {ToggleButton, ToggleButtonConfig} from './togglebutton';
import {UIInstanceManager} from '../uimanager';





export class TheaterToggleButton extends ToggleButton<ToggleButtonConfig> {
  static THEATER_TOGGLE:bitmovin.PlayerAPI.EVENT = "THEATER_TOGGLE"  

  constructor(config: ToggleButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-theatertogglebutton',
      text: 'Theater Mode'
    }, this.config);
  }

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    this.onClick.subscribe(() => {
      uimanager.onTheaterToggled.dispatch(uimanager.getUI())
    });
  }
}