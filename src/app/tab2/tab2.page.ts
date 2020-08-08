import { Component, OnInit, OnDestroy } from '@angular/core';
import { Media } from '../model/media';
import { AudioService } from '../services/audio.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  constructor(private audioService: AudioService) { }
  
  ngOnDestroy(): void {
    this.audioSub.unsubscribe();
  }


  searchText = '';

  isToggle = 'all';

  audioSub: Subscription;
  audioList: Media[] = [];

  segmentChanged(ev: any) {
    this.isToggle = ev.target.value;
  }

  ngOnInit() {
    this.audioSub = this.audioService.audioSubject.subscribe(
      medialist => {
        this.audioList = medialist.filter(media => media.published === true)
      }
    )
    this.audioService.fetchAudio()
  }



}
