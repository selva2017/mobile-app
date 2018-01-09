import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AlertController } from "ionic-angular";

import { Daybook } from './../../models/daybook';

@Component({
  selector: 'page-day-book-details',
  templateUrl: 'day-book-details.html',
})
export class DayBookDetailsPage {
  dayBookList: Daybook[];
  companyId: string;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
  ) { }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DayBook details');
    this.companyId = localStorage.getItem('companyId');
  }
  ngOnInit() {
    this.dayBookList = this.navParams.data;
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

}
