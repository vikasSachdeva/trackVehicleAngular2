import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'chart.js/src/chart';
import { DomSanitizer } from '@angular/platform-browser';
declare var Chart;

@Component({
  selector: 'notification',
  templateUrl: 'notification.html'
})
export class NotificationComponent {
  viewNotification: any;

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer) {
    this.viewNotification=NotificationComponent;
   }
   

}
