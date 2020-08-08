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

// play | pause | next | prev | share | download | comment | seekTo | getAlbumsList | getAudioList
export class AudioService {
  constructor(
    private afstorage: AngularFireStorage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public toastController: ToastController
  ) {

    this.fetchAudio();
    this.audioSubject.next(this.audioItems);
  }

  audioCollection;
  audioItems: Media[] = [];

  //subjects
  public audioSubject = new Subject<Media[]>();

  fetchAudio() {
    this.afs.collection<Media>('Audio').valueChanges().subscribe(
      audio => {
        this.audioItems = audio
        this.audioSubject.next(this.audioItems);
      }
    )
  }

  public fetchCurrentAudio() {
    return this.afs.collection<Media>('Audio').valueChanges()
  }

  get AudioList() {
    return this.audioSubject.next([...this.audioItems]);
  }

  getAudio(id: string) {
    return { ...this.audioItems.find(a => a.id === id) }
  }





}
