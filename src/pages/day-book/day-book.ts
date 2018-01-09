import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PopoverController, LoadingController, AlertController } from "ionic-angular";

import { DayBookDetailsPage } from './../day-book-details/day-book-details';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Daybook } from './../../models/daybook';
import { Platform } from 'ionic-angular/platform/platform';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-day-book',
  templateUrl: 'day-book.html',
})
export class DayBookPage {
  dayBookList: Daybook[];
  dayBookDetailsPage = DayBookDetailsPage;
  companyId: string;
  loading: any;

  constructor(private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DayBookPage');
    this.companyId = localStorage.getItem('companyId');
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Collecting Daybook...'
    });

    this.loading.present();
  }

  ngOnInit() {
    // const loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // this.authService.getActiveUser().getToken()
    // .then(
    // (token: string) => {
      this.showLoader();
    this.authService.fetchDayBook()
      .subscribe(
      (list: Daybook[]) => {
        // console.log(list);
        this.dayBookList = list;
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
        this.handleError(error.json().error);
      }
      );
    // }
    // );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
