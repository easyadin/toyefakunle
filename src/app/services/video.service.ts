import { Injectable } from '@angular/core';
import { Media } from '../model/media';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(
    private afstorage: AngularFireStorage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public toastController: ToastController
  ) { }

  videoCollection;
  videoItems: Media[] = [];

  //subjects
  videoSubject = new Subject<Media[]>();

  fetchVideo() {
    this.afs.collection<Media>('Video').valueChanges().subscribe(
      audio => {
        this.videoItems = audio
        this.videoSubject.next(this.videoItems);
      }
    )
  }

  get VideoList() {
    return this.videoSubject.next([...this.videoItems]);
  }

  getVideo(id: string) {
    return { ...this.videoItems.find(a => a.id === id) }
  }

}
