import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { ManageUsersComponent, PopoverPage }   from './manage-users.component';
import { NewUserComponent } from './add-edit-user/new-user.component';
import { BrowserModule } from '@angular/platform-browser';
// import { CustomNavbar } from '../../pipes/headerNav/template.component';
import { ExportModule } from '../../app/exp.module';


@NgModule({
    imports: [IonicModule, FormsModule, ExportModule],
    entryComponents: [
        PopoverPage,
        ManageUsersComponent,
        NewUserComponent  ],
        
    declarations: [
        ManageUsersComponent,
        PopoverPage,
        NewUserComponent,
      // CustomNavbar    
       ],
    providers: [],

})
export class ManageUsersModule { }


