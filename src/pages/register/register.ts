import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AuthService } from './../../providers/auth-service/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  loading: any;
  regData = { email: '', password: '', confirmPassword: '', companyId: '' };
  error_message: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

  doSignup(user) {
    var valid_password: boolean = false;
    this.showLoader();
    this.regData.password === this.regData.confirmPassword ? valid_password = true : this.error_message = "Password does not match";
    if (valid_password) {
      this.authService.register(this.regData)
        .subscribe(
        success => {
          // console.log(success);
          this.loading.dismiss();
        },
        (error) => {
          this.loading.dismiss();
          this.presentToast(error);
        });
      this.error_message = "";
    }
    else {
      // alert("Invalid password")
      this.loading.dismiss();
    }

  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();
  }

}