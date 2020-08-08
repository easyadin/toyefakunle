import { AudioService } from './audio.service';
import { Injectable } from '@angular/core';
import { Media } from '../model/media';
import { IonRange } from '@ionic/angular';
import { Subject, BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

// Contains streaming status --> isbuffering | isplaying | ispaused | isstoped | isdownloading | isliked  
export class StreamService {
  constructor(private audioService: AudioService) { }

  // stream details
  state = {
    // Current song details
    currTitle: undefined,
    currAlbum: undefined,
    currAuthor: undefined,
    currId: undefined,
    // progress bar value
    progress: 0,
    // toggle for play/pause button
    isPlaying: undefined,
    // track of ion-range touch
    isTouched: undefined,
    //ion range texts
    currSecsText: undefined,
    durationText: undefined,
    // ion range value
    currRangeTime: undefined,
    maxRangeValue: undefined,
  }

  // monitor state changes
  private stateChange: BehaviorSubject<any> = new BehaviorSubject(
    this.state
  );

  getState(): Observable<any> {
    return this.stateChange.asObservable();
  }

  // Current audio
  currAudio: HTMLAudioElement;

  // play audio
  playAudio(audio: Media) {
    // if audio is play, stop it
    if (this.currAudio != null) {
      this.currAudio.pause();
    }

    this.state.currAlbum = audio.albumName;
    this.state.currTitle = audio.mediaName;
    this.state.currAuthor = audio.mediaAuthor;
    this.state.currId = audio.id;

    // Current audio
    this.currAudio = new Audio(audio.streamUrl);

    this.currAudio.play().then(() => {
      // Total audio duration
      this.state.durationText = this.sToTime(this.currAudio.duration);
      // Set max range value
      this.state.maxRangeValue = Number(this.currAudio.duration.toFixed(2).toString().substring(0, 5));
    })

    this.state.isPlaying = true;

    this.currAudio.addEventListener("timeupdate", () => {
      // update audio info on play

      // if io-range not touched no update
      if (!this.state.isTouched) {
        // update ion-range value
        this.state.currRangeTime = Number(this.currAudio.currentTime.toFixed(2).toString().substring(0, 5));
        // update current second text
        this.state.currSecsText = this.sToTime(this.currAudio.currentTime)
        // update progress bar
        // this.state.progress = (Math.floor(this.currAudio.currentTime) / Math.floor(this.currAudio.duration))
        // console.log(this.state.progress)
        // if song ends, play next
        if (this.currAudio.currentTime == this.currAudio.duration) {
          this.playNext();
        }
      }
    });

    // update
    this.stateChange.next(this.state);
  }

  // convert seconds to seconds format e.g 52s => 00:52
  sToTime(t) {
    return this.padZero(parseInt(String((t / (60)) % 60))) + ":" +
      this.padZero(parseInt(String((t) % 60)))
  }

  padZero(t) {
    return (t < 10) ? "0" + t : t;
  }

  // play next
  playNext() {
    // get current audio index
    var index = this.audioService.audioItems.findIndex(x => x.mediaName == this.state.currTitle);

    // if current audio is last then play first song
    if ((index + 1) == this.audioService.audioItems.length) {
      this.playAudio(this.audioService.AudioList[0])
    }

    // else play next audio
    else {
      var nextIndex = index + 1;
      this.playAudio(this.audioService.AudioList[nextIndex])
    }

    // update
    this.stateChange.next(this.state);
  }

  // play prev
  playPrev() {
    // get current audio index
    var index = this.audioService.audioItems.findIndex(x => x.mediaName == this.state.currTitle);

    // if current audio is the first, then play last song
    if (index == 0) {
      var lastIndex = this.audioService.audioItems.length - 1;
      this.playAudio(this.audioService.AudioList[lastIndex])
    }

    // else play next audio
    else {
      var prevIndex = index - 1;
      this.playAudio(this.audioService.AudioList[prevIndex])
    }

    // update
    this.stateChange.next(this.state);
  }

  // pause current stream
  pause() {
    this.currAudio.pause()
    this.state.isPlaying = false;

    // update
    this.stateChange.next(this.state);
  }

  // play current stream
  play() {
    this.currAudio.play()
    this.state.isPlaying = true;

    // update
    this.stateChange.next(this.state);
  }

  // on touch ion-range
  touchStart(range: IonRange) {
    this.state.isTouched = true;
    this.state.currRangeTime = Number(range.value)

    // update
    this.stateChange.next(this.state);
  }

  // on move ion-range
  // update current seconds text
  touchMove(range: IonRange) {
    this.state.currSecsText = this.sToTime(range.value)

    // update
    this.stateChange.next(this.state);
  }

  // on touch release/end
  touchEnd(range: IonRange) {
    this.state.isTouched = false;
    this.currAudio.currentTime = Number(range.value);
    this.state.currSecsText = this.sToTime(this.currAudio.currentTime)
    this.state.currRangeTime = Number(this.currAudio.currentTime.toFixed(2).toString().substring(0, 5));
    if (this.state.isPlaying == true) {
      this.currAudio.play();
    }

    // update
    this.stateChange.next(this.state);
  }

   

}
