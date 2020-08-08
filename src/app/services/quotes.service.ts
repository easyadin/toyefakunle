import { Devotional } from './../model/media';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  constructor(private afs: AngularFirestore,) {

    this.fetchQuote();
    this.quoteSubject.next(this.quoteItems);

    this.fetchTodaysQuote()
  }

  quoteCollection:Devotional;
  quoteItems: Devotional[] = [];

  publishedQuote;
  public publishedQuoteSubject = new Subject<Devotional>()
  //subjects
  public quoteSubject = new Subject<Devotional[]>();

  fetchQuote() {
    this.afs.collection<Devotional>('Quote').valueChanges().subscribe(
      quotes => {
        this.quoteItems = quotes;
        this.quoteSubject.next(this.quoteItems);
      }
    )
  }

  public fetchTodaysQuote() {
    this.afs.collection<Devotional>('Quote', ref => ref.where('published', '==', 'true'))
      .valueChanges()
      .subscribe(q => {
        this.publishedQuote = q;
        this.publishedQuoteSubject.next(this.publishedQuote)
      })
  }

}
