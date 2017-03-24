import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';

@NgModule({
    imports: [
        IonicModule,
        MomentModule,
    ],
    entryComponents: [
        LoginComponent,
        SignupComponent,
        ForgotComponent],
    declarations: [
        LoginComponent,
        SignupComponent,
        ForgotComponent],
    providers: [],
})
export class LoginModule { }
