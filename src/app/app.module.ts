import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { MomentModule } from 'angular2-moment';
import { CustomConfig, Ng2UiAuthModule } from 'ng2-ui-auth';
import { CustomFormsModule } from 'ng2-validation'
import { SDKBrowserModule, CONFIG } from '../shared/sdk/index';
import { LoginModule } from '../pages/login/login.module';
import { ManageUsersModule } from '../pages/manage-users/manage-users.module';
import { FacilitiesModule } from '../pages/facilities/facilities.module';
import { TransportersModule } from '../pages/transporters/transporters.module';
import { DeliveryPointsModule } from '../pages/delivery-points/delivery-points.module';
import { RequestsModule } from '../pages/requests/requests.module';
import { VendorRequestsModule } from '../pages/vendor-requests/vendor-requests.module';
// import { AddVehicleComponentModule } from '../pages/vendor-requests/add-vehicle/add-vehicle.module';
import { CommonServices, formValidator } from '../providers/common.service';
import { FcmService } from '../providers/fcm.service';
import { AuthServices } from '../providers/af.service';
import { DemoServices } from '../providers/demo.service';
import { Demo1Services } from '../providers/demo1.service';
import { BoardModule } from '../pages/board/board.module';
import { NotificationModule } from '../pages/notification/notification.module';
import { AboutModule } from '../pages/about/about.module';
import { UserProfileModule } from '../pages/user-profile/user-profile.module';
import { ExportActivity } from '../model/TimelineModel';
import { ExportModule } from './exp.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { SearchAnywherePipe } from '../pipes/search-anywhere.pipe.ts';
import { AngularFireModule } from 'angularfire2';


// import { KeyboardAttachDirective }from '../providers/keyboard-attach.directive';

import { VehiclesModule } from '../pages/track/vehicles.module';


export const firebaseConfig = {
  apiKey: "AIzaSyAv_Ynss1Izj2Rv4OEBZdCG6MK427IAdSI",
  authDomain: "paavuvcs-debug.firebaseapp.com",
  databaseURL: "https://paavuvcs-debug.firebaseio.com",
  storageBucket: "paavuvcs-debug.appspot.com",
  messagingSenderId: "755882045301"
};

export class MyAuthConfig extends CustomConfig {
  defaultHeaders = { 'Content-Type': 'application/json' };
  providers = {
    google: {
      clientId: CONFIG.GOOGLE_CLIENT_ID,
      redirectUri: 'http://localhost/'
    },
    facebook: {
      clientId: CONFIG.FACEBOOK_KEY,
      redirectUri: 'http://localhost/'
    }
  };
  tokenName = 'accessToken';
  tokenPrefix = '';
  baseUrl = CONFIG.BASE_URL;
}

@NgModule({
  declarations: [
    AppComponent,
    // SearchAnywherePipe
  ],
  imports: [
    IonicModule.forRoot(AppComponent, {
      iconMode: 'ios',
      mode: 'md',
      menuType: 'reveal',
      tabsHideOnSubPages: true,
      tabsPlacement: 'top',
      dayShortNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    }),
    AngularFireModule.initializeApp(firebaseConfig),
    MomentModule,
    CustomFormsModule,
    SDKBrowserModule.forRoot(),
    // NgbModule.forRoot(),
    ExportModule,
    Ng2UiAuthModule.getWithConfig(MyAuthConfig),
    LoginModule,
    ManageUsersModule,
    FacilitiesModule,
    TransportersModule,
    DeliveryPointsModule,
    VehiclesModule,
    RequestsModule,
    VendorRequestsModule,
    // AddVehicleComponentModule,
    BoardModule,
    NotificationModule,
    UserProfileModule,
    AboutModule,
   
  ], 
  exports: [
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent
  ],

  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, CommonServices, DemoServices, AuthServices, Demo1Services, FcmService,ExportActivity, formValidator]

})
export class AppModule { }
