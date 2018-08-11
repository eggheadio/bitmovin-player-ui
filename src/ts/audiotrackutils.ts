import {ListSelector, ListSelectorConfig} from './components/listselector';

/**
 * Helper class to handle all audio tracks related events
 *
 * This class listens to player events as well as the `ListSelector` event if selection changed
 */
export class AudioTrackSwitchHandler {

  private player: bitmovin.PlayerAPI;
  private listElement: ListSelector<ListSelectorConfig>;

  constructor(player: bitmovin.PlayerAPI, element: ListSelector<ListSelectorConfig>) {
    this.player = player;
    this.listElement = element;

    this.bindSelectionEvent();
    this.bindPlayerEvents();
    this.updateAudioTracks();
  }

  private bindSelectionEvent(): void {
    this.listElement.onItemSelected.subscribe((_, value: string) => {
      this.player.setAudio(value);
    });
  }

  private bindPlayerEvents(): void {
    const updateAudioTracksCallback = (): void => this.updateAudioTracks();
    // Update selection when selected track has changed
    this.player.addEventHandler(this.player.EVENT.ON_AUDIO_CHANGED, () => {
      this.selectCurrentAudioTrack();
    });
    // Update tracks when source goes away
    this.player.addEventHandler(this.player.EVENT.ON_SOURCE_UNLOADED, updateAudioTracksCallback);
    // Update tracks when a new source is loaded
    this.player.addEventHandler(this.player.EVENT.ON_READY, updateAudioTracksCallback);
    // Update tracks when the period within a source changes
    this.player.addEventHandler(this.player.EVENT.ON_PERIOD_SWITCHED, updateAudioTracksCallback);
    // Update tracks when a track is added or removed (since player 7.1.4)
    if (this.player.EVENT.ON_AUDIO_ADDED && this.player.EVENT.ON_AUDIO_REMOVED) {
      this.player.addEventHandler(this.player.EVENT.ON_AUDIO_ADDED, updateAudioTracksCallback);
      this.player.addEventHandler(this.player.EVENT.ON_AUDIO_REMOVED, updateAudioTracksCallback);
    }
  }

  private updateAudioTracks() {
    this.listElement.clearItems();

    // Add audio tracks
    for (let audioTrack of this.player.getAvailableAudio()) {
      this.listElement.addItem(audioTrack.id, audioTrack.label);
    }

    // Select the correct audio track after the tracks have been added
    // This is also important in case we missed the `ON_AUDIO_CHANGED` event, e.g. when `playback.audioLanguage`
    // is configured but the event is fired before the UI is created.
    this.selectCurrentAudioTrack();
  }

  private selectCurrentAudioTrack() {
    let currentAudioTrack = this.player.getAudio();

    // HLS streams don't always provide this, so we have to check
    if (currentAudioTrack) {
      this.listElement.selectItem(currentAudioTrack.id);
    }
  }
}
