import { DevotionalService } from 'src/app/services/devotional.service';
import { Subscription } from 'rxjs';
import { Devotional } from './../model/media';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, OnDestroy {
  constructor(private devotionaService: DevotionalService) {
    
   }


  devotionalList: Devotional[] = []
  devotionalSub: Subscription;

  ngOnInit() {
    this.devotionalSub = this.devotionaService.devotionalSubject.subscribe(
      devotionals => {
        this.devotionalList = devotionals.filter(d => d.published === true)
      }
    )
  }


  ngOnDestroy(): void {
    this.devotionalSub.unsubscribe()
  }
}
