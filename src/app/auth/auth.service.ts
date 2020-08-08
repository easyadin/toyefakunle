import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private loadingController: LoadingController,
    public alertController: AlertController,
  ) {


    // check user login status
    localStorage.getItem('toyeAdmin') != null ? this._userIsAuthenticated = true : this._userIsAuthenticated = false;
    this.authenticationSubJect.next(this._userIsAuthenticated)
  }

  userUID; // id to identify user
  authenticationSubJect = new Subject();
  currentUserSubject = new Subject<any>();

  _userIsAuthenticated = false;
  currentUser; // local user details


  // login with email
  public async login_With_Email_Password(email, password) {
    const spinner = await this.loadingController.create({
      animated: true,
      message: "One sec..."
    })
    await spinner.present()
    this.auth.signInWithEmailAndPassword(email, password).then(
      resp => {
        spinner.dismiss()
        this._userIsAuthenticated = true;
        // save to localStorage
        localStorage.setItem('toyeAdmin', JSON.stringify(resp.user.providerData))
        // user login occured
        this.authenticationSubJect.next(this._userIsAuthenticated)
        // get user UID
        this.userUID = resp.user.email;
        localStorage.setItem('toyeAdminUID', this.userUID)

        // redirect user to admin page
        this.router.navigateByUrl('/audio')
      }
    ).catch(err => {
      this.alertModal("We cannot find your login credentials", err);
      spinner.dismiss()
    })
  }

  // logout and delete details from local storage
  async logout() {
    const spinner = await this.loadingController.create({
      animated: true,
      message: "One sec..."
    })
    await spinner.present()
    this.auth.signOut().then(
      resp => {
        localStorage.removeItem('toyeAdmin')
        localStorage.removeItem('toyeAdminUID')
        spinner.dismiss();

        // redirect user to admin page
        this.router.navigateByUrl('/')
      });

  }

  // alert modal
  async alertModal(subHeader, message) {
    // user not found 
    const alert = this.alertController.create({
      cssClass: 'modal-css',
      subHeader: subHeader,
      message: message,
      buttons: ['Retry']
    });
    (await alert).present()
  }
}
