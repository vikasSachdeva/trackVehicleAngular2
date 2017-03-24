import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginComponent } from '../login.component';
import { ForgotComponent } from '../forgot/forgot.component';
import { Contact, ContactApi, Appuser, AppuserApi, Setting } from '../../../shared/sdk/';
import { CommonServices } from '../../../providers/common.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {

  signupForm: FormGroup;
  formErrors: any;
  validationMessages: any;
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
    this.formErrors = {
      fullname: '',
      email: '',
      password: '',
      retype_password: ''
    };
    this.validationMessages = {
      'fullname': {
        'required': 'Fullname is required.',
      },
      'email': {
        'required': 'Email is required.',
      },
      'password': {
        'required': 'Password is required.'
      },
      'retype_password': {
        'required': 'Confirm Password is required.',
        'equalTo': 'Passwords do not match'
      }
    };
    let password = new FormControl('', [Validators.required]);
    let rpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    //initialize form
    this.signupForm = this._fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      password: password,
      rpassword: rpassword
    });
    this.signupForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  openLogin() {
    let modal = this.modalCtrl.create(LoginComponent);
    modal.present();
    this.viewCtrl.dismiss();
  }
  openForgot() {
    let modal = this.modalCtrl.create(ForgotComponent);
    modal.present();
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  signup({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.loading = this.loadingCtrl.create({
        content: 'Signing Up...'
      }); this.loading.present();
      let user = {
        email: value.email,
        password: value.password
      };
      this.userApi.create(user)
        .subscribe(
        data => {
          this.onCreateSuccess(value, data);
        }, error => {
          this.loading.dismissAll();
          this.commonServices.showAlert('Sign Up Error', error.message);
        });
    }
  }

  private onCreateSuccess(value, user) {
    if (user) {
      let contact = this.buildContact(value, user);
      this.contactApi.create(contact).subscribe((contact: Contact) => {
        this.contactApi.createSettings(contact.id, this.buildSettings(contact)).subscribe((settings: Setting) => {
          this.loading.dismissAll();
          this.viewCtrl.dismiss(value);
        }, (error) => {
          this.loading.dismissAll();
          this.commonServices.showAlert('Login Error', error.message);
        })
      }, (error) => {
        this.loading.dismissAll();
        this.commonServices.showAlert('Login Error', error.message);
      })
    }
  }

  buildContact(value, user): any {
    let names: string[] = value.fullname.split(' ');
    return {
      emails: [user.email],
      appUserId: user.id,
      picture: '../../../img/placeholder.png',
      firstname: names[0],
      lastname: names[names.length - 1]
    }
  }

  buildSettings(user): any {
    return {
      mapRadius: 500,
      mapType: 'geocode',
      is_active: true,
      is_deleted: false,
      created_at: new Date(),
      created_by: user.id,
      updated_at: new Date(),
      updated_by: user.id,
      contactId: user.id
    }
  }
}

interface ILogin {
  email: string;
  password: string;
}
