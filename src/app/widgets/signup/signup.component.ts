import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/IUser';
import { DataService } from '../../services/data.service';
import { Router } from "@angular/router";
import { ServerResponseTemplate } from '../../models/ServerResponseTemplate';
import { NotificationService } from '../../util/notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string = '';
  password1: string = '';
  password2: string = '';
  email: string = '';
  existingUsernames = [];
  existingEmails = [];
  existingAccounts = [];

  constructor(private authService: AuthService, private dataService: DataService,
    private router: Router, private notif: NotificationService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try {
      this.ngxLoader.start();
      this.existingAccounts = await this.authService.getUsers() as IUser[];
      this.ngxLoader.stop();
      for (let account of this.existingAccounts) {
        this.existingUsernames.push(account.username);
        this.existingEmails.push(account.email);
      }
    }
    catch (err) {
      this.ngxLoader.stop();

      this.notif.showErrorgNotification(err.message);
    }

  }

  usernameCheck() {

    for (let i = 0; i < this.existingUsernames.length; i++) {
      if (this.existingUsernames[i] === this.username) {
        this.notif.showWarningNotification("Username already exists");
        return false;
      }
    }
    return true;
  }

  emailCheck() {
    for (let i = 0; i < this.existingEmails.length; i++) {
      if (this.existingEmails[i] === this.email) {
        this.notif.showWarningNotification("Email already exists!");

        return false;
      }
    }
    return true;
  }

  passwordCheck() {
    if (this.password1 != this.password2) {
      this.notif.showWarningNotification("Two passwords don't match!");
      return false;
    }
    return true;
  }

  async signUp(user: IUser) {
    try {
      this.ngxLoader.start();
      const response = await this.authService.signup(user) as ServerResponseTemplate;
      this.ngxLoader.stop();

      if (response.ack == true) {
        this.notif.showSuccessNotification(response.message);
        let temp = user;
        temp.password = "";
        temp.id = response.results;
        this.dataService.changeUser(temp);
        this.router.navigate(['../user-profile']);
      } else {
        this.notif.showWarningNotification(response.message);
      }
    } catch (err) {
      this.ngxLoader.stop();

      this.notif.showErrorgNotification(err.message);
    }

  }

  getInputs() {
    if (this.checkValidity()) {
      let user = new IUser();
      user.email = this.email;
      user.username = this.username;
      user.password = this.password1;
      this.signUp(user);

    }
  }

  checkValidity() {
    if (this.username === undefined || this.username === '') {
      console.log(this.username)
      return false;
    }
    if (this.password1 === undefined || this.password1 === '') {
      console.log(this.password1)

      return false;
    }
    if (this.password2 === undefined || this.password2 === '') {
      console.log(this.password2)

      return false;
    }
    if (this.passwordCheck() && this.emailCheck() && this.usernameCheck())
      return true;
  }

}
