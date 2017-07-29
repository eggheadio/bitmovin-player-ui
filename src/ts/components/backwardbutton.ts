import {Button, ButtonConfig} from "./button"
import {UIInstanceManager} from '../uimanager';


export class BackwardButton extends Button<ButtonConfig>{
    
  constructor(config: ButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-backwardbutton'
    }, this.config);
  }


  configure(player: bitmovin.player.Player, uimanager: UIInstanceManager): void {
    this.onClick.subscribe(()=>{
      player.seek(player.getCurrentTime() - 10)
    })
  }
}