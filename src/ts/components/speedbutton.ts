import {Button, ButtonConfig} from "./button"
import {UIInstanceManager} from '../uimanager';

export class SpeedButton extends Button<ButtonConfig>{
  private static readonly CLASS_ONE = 'one';
  private static readonly CLASS_ONE_POINT_TWO_FIVE = 'one-point-two-five';
  private static readonly CLASS_ONE_POINT_FIVE = 'one-point-five';
  private static readonly CLASS_TWO = 'two';

  constructor(config: ButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-speedbutton'
    }, this.config);


  }

    configure(player: bitmovin.player.Player, uimanager: UIInstanceManager, handleClickEvent: boolean = true): void {
      super.configure(player, uimanager);

      const speeds = [1.0, 1.25, 1.5, 2.0]
      const getNextPlaybackSpeed = (speed:number) => {
        const i = speeds.indexOf(speed)
        return speeds[i < speeds.length - 1 ? i + 1 : 0]
      }

      this.getDomElement().html(`<span>1.0x</span>`)
      

      this.onClick.subscribe(()=>{
        const speed = getNextPlaybackSpeed(player.getPlaybackSpeed())
        player.setPlaybackSpeed(speed)
        const formatSpeed = (speed:number) => speed.toString().includes('.')
          ? speed.toString()
          : speed.toString() + ".0"
        this.getDomElement().html(`<span>${formatSpeed(speed)}x</span>`)
      })      
    }
}