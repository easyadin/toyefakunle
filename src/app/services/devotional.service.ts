import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Devotional } from '../model/media';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevotionalService {
  constructor(private afs: AngularFirestore) {

    this.fetchQuote();
    this.devotionalSubject.next(this.devotionalItems);
  }

  devotionalCollection: Devotional;
  devotionalItems: Devotional[] = [];

  publishedQuote;
  public publishedQuoteSubject = new Subject<Devotional>()
  //subjects
  public devotionalSubject = new Subject<Devotional[]>();

  fetchQuote() {
    this.afs.collection<Devotional>('Devotional').valueChanges().subscribe(
      quotes => {
        this.devotionalItems = quotes;
        this.devotionalSubject.next(this.devotionalItems);
      }
    )
  }

  getDevotion(id) {
    return { ...this.devotionalItems.find(d => d.id === id)}
  }
}
