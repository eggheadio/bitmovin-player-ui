import {Button, ButtonConfig} from "./button"

export class NextButton extends Button<ButtonConfig>{
    
  constructor(config: ButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-nextbutton'
    }, this.config);
  }
}