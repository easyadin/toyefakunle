import { AuthService } from './auth.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private menu: MenuController,
    private auth: AuthService) { }

  ngOnInit() {
    this.menu.enable(false)
  }

  onSubmit(form) {
    this.auth.login_With_Email_Password(form.email, form.password)
  }

}
