import {Button, ButtonConfig} from "./button"
import {UIInstanceManager} from '../uimanager';

export class ForwardButton extends Button<ButtonConfig>{
    
  constructor(config: ButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-forwardbutton'
    }, this.config);
  }

  configure(player: bitmovin.player.Player, uimanager: UIInstanceManager): void {
    this.onClick.subscribe(()=>{
      player.seek(player.getCurrentTime() + 30)
    })
  }
}