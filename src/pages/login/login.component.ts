import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController, ViewController, ModalController, LoadingController, Loading, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { Contact, Appuser, AppuserApi, ContactApi, Setting } from '../../shared/sdk/';
import { CommonServices, formValidator } from '../../providers/common.service';
import { AuthServices } from '../../providers/af.service';
import { AuthService } from 'ng2-ui-auth';
import { BoardComponent } from '../board/board.component';
import { AboutComponent } from '../about/about.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { FcmService } from '../../providers/fcm.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  /******************TEST CODE************************** */
  adminForm: FormGroup;
  supervisorForm: FormGroup;
  vendorForm: FormGroup;
  securityForm: FormGroup;
  /******************TEST CODE END************************** */
  loading: Loading;
  aboutPage: any;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private events: Events,
    private loadingCtrl: LoadingController,
    private contactApi: ContactApi,
    private userApi: AppuserApi,
    private commonServices: CommonServices,
    private sanitizer: DomSanitizer,
    private afAuth: AuthServices,
    private authService: AuthService,
    private fcmService: FcmService,
    private fvalid: formValidator) {

    this.aboutPage = AboutComponent;
    //initialize form
    this.loginForm = this._fb.group({

      email: ['vendor@paavu.com', Validators.compose([Validators.required, Validators.minLength(5) /*, Validators.maxLength(10)*/, fvalid.isValidMailFormat])],
      password: ['123456', [<any>Validators.required, <any>Validators.minLength(3)]]
    });



    /*if(this.commonServices.currentUser.email) {
      this.afAuth.checkUserSession(user => this.onLoginSuccess(user), ()=>this.loading.dismissAll());
    } else {
      this.loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      this.loading.present();    
      setTimeout(()=>{this.loading.dismissAll();}, 500);
    }*/

    /******************TEST CODE************************** */
    this.adminForm = this._fb.group({
      email: ['admin@paavu.com', [<any>Validators.required, <any>Validators.minLength(5)]],
      password: ['123456', [<any>Validators.required, <any>Validators.minLength(3)]]
    }); this.vendorForm = this._fb.group({
      email: ['vendor@paavu.com', [<any>Validators.required, <any>Validators.minLength(5)]],
      password: ['123456', [<any>Validators.required, <any>Validators.minLength(3)]]
    }); this.securityForm = this._fb.group({
      email: ['security@paavu.com', [<any>Validators.required, <any>Validators.minLength(5)]],
      password: ['123456', [<any>Validators.required, <any>Validators.minLength(3)]]
    }); this.supervisorForm = this._fb.group({
      email: ['supervisor@paavu.com', [<any>Validators.required, <any>Validators.minLength(5)]],
      password: ['123456', [<any>Validators.required, <any>Validators.minLength(3)]]
    });
    /******************TEST CODE END************************** */
  }


  ionViewDidEnter(){
console.log("LoginComponent");
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
    this.afAuth.checkUserSession(user => this.onLoginSuccess(user), () => this.loading.dismissAll());
  }

  openSignUp() {
    let modal = this.modalCtrl.create(SignupComponent);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.commonServices.presentToast('Sign Up successful. Login to continue');
        this.loginForm.setValue({ email: data.email, password: data.password });
      }
    });
    modal.present();
  }

  openForgot() {
    let modal = this.modalCtrl.create(ForgotComponent);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.commonServices.presentToast('Password Reset successful. Login to continue');
        this.loginForm.setValue({ email: data.email, password: data.password });
      }
    });
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  socialLogin(provider: string) {
    this.loading = this.loadingCtrl.create({
      content: 'Logging In...'
    }); //this.loading.present();
    this.authService.authenticate(provider)
      .subscribe((data: any) => {
        data = JSON.parse(data._body);
        this.onSocialLoginSuccess(data.user);
      },
      error => {
        // this.loading.dismissAll();
        this.commonServices.showAlert('Login Error', error.message);
      });
  }

  login({ value, valid }: { value: ILogin, valid: boolean }) {
    console.log(value);
    this.loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    this.loading.present();

    this.afAuth.loginUser(value.email, value.password).then(

      data => {
        // this.onLoginSuccess(data);
        console.log(data);
        this.loading.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
      },

      err => {
        console.log(err);
        this.loading.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
        alert(err.message);
      });
  }
  private onSocialLoginSuccess(user) {
    if (user) {
      this.contactApi.count({ is_active: true, is_deleted: false, appUserId: user.id }).subscribe((count: any) => {
        if (count.count === 0) {
          this.createContact(user);
        } else {
          this.onLoginSuccess(user);
        }
      }, (error) => {
        this.loading.dismissAll();
        this.commonServices.showAlert('Login Error', error.message);
      })
    }
  }

  private onLoginSuccess(data) {

    console.log(data);
    let loginCallback = (user) => {
      this.commonServices.currentUser = user;
      console.log(this.commonServices.currentUser);

      this.loading.dismissAll();
      console.log(this.commonServices.currentUser);
      this.commonServices.currentUser.settings = this.commonServices.currentUser.settings ? this.buildSettings(this.commonServices.currentUser) : null;
      this.commonServices.loadDataAfterLoggedIn();
      // this.commonServices.sendPush(registrationIds);
      this.events.publish('isLoggedIn');
    };
    let emailQuery = {
      orderByChild: 'email',
      equalTo: data.email
    };
    let queryObservable = this.afAuth.getData('/users', users => {
      console.log(users);
      if (users.length == 0) {
        let queryObservable = this.afAuth.getData('/vendors', vendors => {
          console.log(vendors);
          loginCallback(vendors[0]);
        }, emailQuery);
        // this.loading.dismissAll();
        return;
      }
      console.log(users.length);
      loginCallback(users[0]);
    }, emailQuery);
  }

  private createContact(user) {
    if (user) {
      this.loading.dismiss();
      this.loading = this.loadingCtrl.create({
        content: 'Creating User Account...'
      }); //this.loading.present();
      let contact = {
        appUserId: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        emails: [user.email],
        picture: user.picture,
      }
      this.contactApi.create(contact).subscribe((contact: Contact) => {
        this.contactApi.createSettings(contact.id, this.buildSettings(contact)).subscribe((settings: Setting) => {
          this.loading.dismissAll();
          this.viewCtrl.dismiss('authorised')
        }, (error) => {
          this.loading.dismissAll();
          this.commonServices.showAlert('Login Error', error.message);
        })
      }, (error) => {
        // this.loading.dismissAll();
        this.commonServices.showAlert('Login Error', error.message);
      });
    }
  }

  buildSettings(user): any {
    return {
      mapRadius: 500,
      mapType: 'geocode',
      is_active: true,
      is_deleted: false,
      created_at: new Date(),
      created_by: user.id ? user.id : null,
      updated_at: new Date(),
      updated_by: user.id ? user.id : null,
      contactId: user.id ? user.id : null,
    }
  }
}

interface ILogin {
  email: string;
  password: string;
}


