import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Media, Devotional } from '../model/media';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { saveAs } from 'file-saver';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(
    private afstorage: AngularFireStorage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public toastController: ToastController,
    private platform: Platform,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private downloader: Downloader
  ) { }

  audioCollection
  audioItems
  videoCollection
  videoItems

  media: Media;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadPercentageSubject = new Subject<any>();
  downloadPercentage;

  // upload media: 
  uploadMedia(form, mediaType: string, mediaDetails) {
    const id = this.afs.createId(); // generate id
    // get the form details >> album,author,media,name
    var createAt = Date.now();
    const file = mediaDetails;
    const filePath = `${mediaType}/${id}`; // seperate path for audio & video
    const fileRef = this.afstorage.ref(filePath);
    const task = this.afstorage.upload(filePath, file); // upload

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.subscribe(url => {
          // get download url

          if (url) {
            // build media
            this.media = new Media(
              id,
              "",
              form.name,
              form.author || "Toye Fakunle",
              mediaType,
              url,
              url,
              "",
              "", //
              "", // isLiked? 
              "", // local download status
              false // published
            )
            // add media data to database audio | video 
            // this.afs.collection<any>(mediaType).add(JSON.parse(JSON.stringify(this.media))).then(
            //   resp => {
            //     this.presentToast(mediaType)
            //   }
            // )
            this.afs.collection(mediaType).doc(id).set(JSON.parse(JSON.stringify(this.media))).then(
              resp => {
                this.router.navigateByUrl(mediaType.toLowerCase())
                this.presentToast(mediaType)
              }
            )
          }
        })
      })
    ).subscribe((task) => {
      this.downloadPercentage = ((task.bytesTransferred / task.totalBytes) * 100);
      this.downloadPercentageSubject.next(this.downloadPercentage)
    })
  }

  // upload devotional & quotes
  uploadMessage(form, mediaType: string) {
    const id = this.afs.createId(); // generate id

    // build media
    let media = new Devotional(
      id,
      mediaType,
      form.title,
      form.text,
      form.content,
      new Date().toLocaleString(),
      false
    )
    this.afs.collection(mediaType).doc(id).set(JSON.parse(JSON.stringify(media))).then(
      resp => {
        this.presentToast(mediaType)
        this.router.navigateByUrl(mediaType.toLowerCase())
      }
    )
  }

  Counter = {
    pending: [],
    published: [],
  }
  CounterSubject = new Subject<any>();

  // return the pending and published counts for all mediaTypes
  getCounter(mediaType) {
    this.afs.collection<Media>(mediaType, ref => ref.where("published", "==", true)).valueChanges()
      .subscribe(p => {
        this.Counter.published = p
        this.CounterSubject.next(this.Counter);
      });

    this.afs.collection<Media>(mediaType, ref => ref.where("published", "==", false)).valueChanges()
      .subscribe(p => {
        this.Counter.pending = p
        this.CounterSubject.next(this.Counter);
      });
  }


  // modify status - Publish | unpublish | delete

  // delete media
  delete(id, mediaType) {
    // delete from storage
    this.afstorage.ref(`${mediaType}/${id}`).delete();
    // delete from database
    this.afs.collection(mediaType).doc(id).delete();
  }

  // publish media
  publish(id, mediaType) {
    if (mediaType !== 'Quote') {
      this.afs.collection(mediaType).doc(id).update({
        "published": true
      })
    } else {
      // only 1 quote can be published
      // publishing a quote will unpublish all other published quote
      // publish this quote
      let toPublish = id
      let ptrue: Devotional;
      this.afs.collection<Devotional>(mediaType, ref => ref.where("published", "==", true)).valueChanges().subscribe(
        p => {
          ptrue = p[0]
          console.log(p)
          if (ptrue) {
            localStorage.setItem('published', ptrue.id)
          }
        }
      )

      this.afs.collection(mediaType).doc(localStorage.getItem('published')).update({ "published": false })
      this.afs.collection(mediaType).doc(id).update({ "published": true })

      // this.afs.collection(mediaType).doc(id).update({
      //   "published": true
      // })
    }

  }

  // unpublish
  unPublish(id, mediaType) {
    this.afs.collection(mediaType).doc(id).update({
      "published": false
    })
  }

  // alert modal
  async alertModal(message) {
    // user not found 
    const alert = this.alertController.create({
      cssClass: 'modal-css',
      message: message,
      buttons: ['OK']
    });
    (await alert).present()
  }

  async presentToast(mediaType) {
    const toast = await this.toastController.create({
      message: `${mediaType} was uploaded successfully`,
      duration: 3200
    });
    toast.present();
  }

  async presentToast2(mediaType, message) {
    const toast = await this.toastController.create({
      message: `${mediaType} ${message}`,
      duration: 3000
    });
    toast.present();
  }



  //====== Post to api ======
  // like audio
  Like(id) {

  }
  // comment
  Comment(id) {

  }
  // share
  Share(id) {

  }
  // download audio
  Download(media: Media) {
    console.log(media)
    if (this.platform.is('hybrid')) {
      const url = media.downloadUrl;
      // this.transfer.create().download(url, this.file.dataDirectory)
      //   .then((entry) => {
      //     this.presentToast2(media.mediaType, "downloaded")
      //     // entry.toURL()
      //   }, (error) => {
      //     this.presentToast2(media.mediaType, error)
      //     console.log(error)
      //   });
      var request: DownloadRequest = {
        uri: url,
        title: media.mediaName,
        description: '',
        mimeType: '',
        visibleInDownloadsUi: true,
        notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
        destinationInExternalFilesDir: {
          dirType: 'Downloads/',
          subPath: media.mediaName
        }
      };

      this.downloader.download(request)
        .then((location: string) => console.log('File downloaded at:' + location))
        .catch((error: any) => console.error(error));
    }
    else {
      // cordova or capacitor
      if (media.mediaType == "Audio") {
        let blob = new Blob([media.downloadUrl], { type: 'audio/ogg' })
        saveAs(media.downloadUrl)
      }
      else {
        let blob = new Blob([media.downloadUrl], { type: 'video\/mp4' })
        saveAs(media.downloadUrl, media.mediaName)
      }

      // this.download
    }


  }

}
