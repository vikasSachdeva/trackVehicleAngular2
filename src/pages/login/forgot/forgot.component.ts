import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login.component';
import { Contact, ContactApi, AppuserApi, Appuser } from '../../../shared/sdk/';
import { CommonServices } from '../../../providers/common.service';
import { CustomValidators } from 'ng2-validation';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotComponent {

  forgotForm: FormGroup;
  resetForm: boolean = false;
  password: FormControl;
  rpassword: FormControl;
  loading: Loading;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private contactApi: ContactApi,
    private userApi: AppuserApi,
    private sanitizer: DomSanitizer,
    private commonServices: CommonServices) {

    this.password = new FormControl('');
    this.rpassword = new FormControl('');
    //initialize form
    this.forgotForm = this._fb.group({
      email: ['', [<any>Validators.required, CustomValidators.email]],
      password: this.password,
      rpassword: this.rpassword
    });
  }

  openSignUp() {
    this.viewCtrl.dismiss();
    let modal = this.modalCtrl.create(SignupComponent);
    modal.present();
  }
  openLogin() {
    this.viewCtrl.dismiss();
    let modal = this.modalCtrl.create(LoginComponent);
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  resetPassword({ value, valid }: { value: Appuser, valid: boolean }) {
    if (this.resetForm) {
      this.userApi.resetPassword(value.email).subscribe(
        data => {
          this.resetForm = true;
          this.password = new FormControl('', [Validators.required]);
          this.rpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);
        },
        error => {
          this.commonServices.showAlert('Reset Password Error', error.message);
        });
    } else {
      // this.userApi.
    }
  }

}
