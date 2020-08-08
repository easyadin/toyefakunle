import { MediaService } from 'src/app/services/media.service';
import { Subscription } from 'rxjs';
import { VideoService } from './../services/video.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Media } from '../model/media';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  constructor(private videoService: VideoService,
    private mediaService: MediaService
  ) { }

  searchText = '';

  isToggle = 'all';
  videoList: Media[] = [];
  videoSub: Subscription;

  @ViewChildren('player') videoPlayers: QueryList<any>;

  currentPLaying = null;
  isFullScreen = false;

  segmentChanged(ev: any) {
    this.isToggle = ev.target.value;
  }

  ngOnInit() {
    this.videoSub = this.videoService.videoSubject.subscribe(
      medialist => {
        this.videoList = medialist.filter(media => media.published === true)
      }
    )
    this.videoService.fetchVideo();
  }

  didScroll() {
    if (this.currentPLaying && this.isElementInViewport(this.currentPLaying)) {
      return;
    }
    else if (this.currentPLaying && !this.isElementInViewport(this.currentPLaying)) {
      // Item is out of view, pause it
      this.currentPLaying.pause();
      this.currentPLaying = null;
      this.isFullScreen = false;
    }

    this.videoPlayers.forEach(player => {
      if (this.currentPLaying) {
        return;
      }

      const nativeElement = player.nativeElement;
      const inView = this.isElementInViewport(nativeElement)

      if (inView) {
        this.currentPLaying = nativeElement;
        this.currentPLaying.muted = true;
        // this.currentPLaying.play();
      }
    });
  }

  openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      this.currentPLaying.muted = false;
      // this.isFullScreen = true;
    }
    else if (elem.webkitEnterFullscreen) {
      elem.webkitEnterFullscreen();
      elem.enterFullscreen();
      this.currentPLaying.muted = false;
      // this.isFullScreen = true;
    }
  }

  playOnSide(elem) {

  }

  // bounding rate of element
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }



  download(media: Media) {
    this.mediaService.Download(media)
  }

  ngOnDestroy() {
    this.videoSub.unsubscribe();
  }
}
