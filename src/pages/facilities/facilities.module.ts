import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { FacilitiesComponent, PopoverPage }   from './facilities.component';
import { NewFacilitiesComponent }   from './add-edit-facilities/new-facilities.component';
// import { NewUserComponent } from './add-edit-user/new-user.component';
import { BrowserModule } from '@angular/platform-browser';
// import { CustomNavbar } from '../../pipes/headerNav/template.component';
import { ExportModule } from '../../app/exp.module';


@NgModule({
    imports: [IonicModule, FormsModule, ExportModule],
    entryComponents: [
        PopoverPage,
        FacilitiesComponent,
        NewFacilitiesComponent ],
        // NewUserComponent  ],
        
    declarations: [
        FacilitiesComponent,
        PopoverPage,
        NewFacilitiesComponent,
        // NewUserComponent,
      // CustomNavbar    
       ],
    providers: [],

})
export class FacilitiesModule { }


