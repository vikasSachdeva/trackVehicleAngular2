import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoopBackConfig, CONFIG } from '../shared/sdk';
import { CommonServices, formValidator } from '../providers/common.service';
import { FcmService } from '../providers/fcm.service';
import { DemoServices } from '../providers/demo.service';
import { LoginComponent } from '../pages/login/login.component';
import { AboutComponent } from '../pages/about/about.component';
import { ManageUsersComponent } from '../pages/manage-users/manage-users.component';
import { FacilitiesComponent } from '../pages/facilities/facilities.component';
import { TransportersComponent } from '../pages/transporters/transporters.component';
import { DeliveryPointsComponent } from '../pages/delivery-points/delivery-points.component';
import { RequestsComponent } from '../pages/requests/requests.component';
import { NewRequestComponent } from '../pages/requests/new/new-request.component';
import { VendorRequestsComponent } from '../pages/vendor-requests/vendor-requests.component';
import { ViewRequestComponent } from '../pages/requests/view/view-request.component';
import { DetailRequestComponent } from '../pages/requests/detail/detail-request.component';
import { GPSTrackComponent } from '../pages/track/GPS/GPS-track.component.ts';
import { VehiclesComponent } from '../pages/track/vehicles.component';
import { VehiclesDetailComponent } from '../pages/track/vehicles-detail/vehicles-detail.component';
import { GateInOutComponent } from '../pages/track/gate-in-out/gate-in-out.component';
import { LoadingComponent } from '../pages/track/loading/loading.component';
import { BoardComponent } from '../pages/board/board.component';
import { NotificationComponent } from '../pages/notification/notification.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthServices } from '../providers/af.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-root',
  templateUrl: 'app.html'
})
export class AppComponent {

  @ViewChild(Nav) nav: Nav;
  color: string = '#525e64';
  rootPage: any = LoginComponent;
  loggedInUser: any;
  selectedIndex: number = 0;
  pages: Array<{ title: string, component: any, icon: string, faIcon: string, image: boolean, show: boolean, role: string[], action?: any }>;

  constructor(public platform: Platform,
    private events: Events,
    private menuCtrl: MenuController,
    private sanitizer: DomSanitizer,
    private commonService: CommonServices,
    private auth: AuthServices,
    private fcmService: FcmService,
    private demoService: DemoServices,
    private http: Http) {
    this.initializeApp();
    let loggedIn = false; //if false then show login page 


    this.pages = [
      { title: 'Login', component: LoginComponent, icon: 'settings-outline', faIcon: 'fa', image: false, show: false, role: [] },
      { title: 'About Us', component: AboutComponent, icon: 'md-globe', faIcon: 'fa', image: false, show: false, role: ['supervisor', 'admin', 'security'] }
    ];

    this.events.subscribe('isLoggedIn', () => {
      this.loggedInUser = this.commonService.currentUser;
      this.selectedIndex = 0;
      menuCtrl.swipeEnable(true);
      this.pages = [

        { title: 'Dashboard', component: BoardComponent, icon: '', faIcon: 'fa-tablet', image: false, show: false, role: ['admin'] },
        { title: 'Notification', component: NotificationComponent, icon: 'settings', faIcon: 'fa-bell', image: false, show: false, role: ['admin'] },
        { title: 'Facilities/Factory', component: FacilitiesComponent, icon: 'settings', faIcon: '', image: false, show: false, role: ['admin'] },
        { title: 'Manage users', component: ManageUsersComponent, icon: 'ios-people', faIcon: '', image: false, show: false, role: ['admin'] },
        { title: 'Transporters', component: TransportersComponent, icon: 'ios-people', faIcon: '', image: false, show: false, role: ['admin'] },
        { title: 'Delivery Points', component: DeliveryPointsComponent, icon: 'ios-people', faIcon: '', image: false, show: false, role: ['admin'] },
        { title: 'Supervisor Requests', component: RequestsComponent, icon: 'contact', faIcon: '', image: false, show: false, role: ['supervisor'] },
        { title: 'Vendor Requests', component: VendorRequestsComponent, icon: 'contact', faIcon: '', image: false, show: false, role: ['vendor'] },
        { title: 'Track Vehicles', component: VehiclesComponent, icon: 'locate', faIcon: 'fa-tablet', image: false, show: false, role: ['supervisor', 'security'] },
        { title: 'About Us', component: AboutComponent, icon: 'md-globe', image: false, faIcon: '', show: false, role: ['supervisor', 'admin', 'security', 'vendor'] },
        { title: 'Logout', component: LoginComponent, icon: 'ios-log-out-outline', faIcon: '', image: false, show: false, role: ['supervisor', 'admin', 'security', 'vendor'], action: 'logout' },


      ].filter(item => item.role.indexOf(this.loggedInUser.role) > -1);
      console.log(this.pages[0].component);
      this.nav.setRoot(this.pages[0].component);
    });
    if (loggedIn) {
      // this.loggedInUser = this.commonService.currentUser = this.commonService.loggedInCurrentUser[0];
      // console.log(this.loggedInUser);
      // this.rootPage = BoardComponent;
      // this.events.publish('isLoggedIn');      
    } else {
      console.log(this.commonService.currentUser);
      // this.loggedInUser = this.commonService.currentUser = this.commonService.loggedInCurrentUser[0];
      this.loggedInUser = this.commonService.currentUser = {
        picture: '../img/placeholder.png'
      };
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.menuCtrl.swipeEnable(false);
      this.fcmService.init();
    });
    LoopBackConfig.setBaseURL(CONFIG.BASE_URL);
    LoopBackConfig.setApiVersion(CONFIG.API_VERSION);
  }

  editProfile() {
    this.nav.setRoot(UserProfileComponent);
  }

  openPage(page, index) {
    // if same menu link
    if (this.selectedIndex == index) {
      return;
    }
    this.selectedIndex = index;

    //logout action
    if (page.action) {
      console.log(page.component);
      console.log(page.action);
      this[page.action]();
      return;
    }
    this.selectedIndex = index;
    this.nav.setRoot(page.component);
  }
  openPage2(pagecomponent) {
    this.nav.setRoot(pagecomponent);
  }

  logout() {
    this.auth.logoutUser().then(
      data => {
        console.log(data);
        this.menuCtrl.swipeEnable(false);
        this.pages = [
          { title: 'Login', component: LoginComponent, icon: 'settings-outline', faIcon: 'fa', image: false, show: false, role: [] },
          { title: 'About Us', component: AboutComponent, icon: 'md-globe', faIcon: 'fa', image: false, show: false, role: ['supervisor', 'admin', 'security'] }
        ];
        this.loggedInUser = this.commonService.currentUser = {
          picture: '../img/placeholder.png'
        };
        this.nav.setRoot(LoginComponent);
      },
      err => console.log(err)
    );
  };

  colorLuminance(hex, lum, type?) {
    if (!type) {
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;
      // convert to decimal and change luminosity
      let rgb = '#', c, i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
      }
      return rgb;
    } else {
      let num = parseInt(hex.slice(1), 16), amt = Math.round(2.55 * lum), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
  }

}

