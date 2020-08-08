import { Subscription } from 'rxjs';
import { Devotional } from './../model/media';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { QuotesService } from '../services/quotes.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  constructor(private quoteService: QuotesService) { }

  dailyQuote: Devotional[];
  quoteSub: Subscription
  // update qoute


  ngOnInit(): void {
    this.quoteSub = this.quoteService.quoteSubject.subscribe(
      q => {
        this.dailyQuote = q.filter(q => q.published === true)
      }
    )
    this.quoteService.fetchQuote();
  }

  ngOnDestroy() {
    this.quoteSub.unsubscribe()
  }
}
