import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { NotificationComponent } from './notification.component';
// import { CustomNavbar } from '../../pipes/headerNav/template.component';



@NgModule({
    imports: [
        IonicModule,
        MomentModule,

    ],
    
    entryComponents: [
       NotificationComponent,
    ],
    declarations: [
       NotificationComponent,
    
    ],
    providers: [],
})
export class NotificationModule { }