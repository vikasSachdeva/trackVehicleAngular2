import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { TransportersComponent, PopoverPage }   from './transporters.component';
import { NewTransporterComponent } from './add-edit-transporter/new-transporter.component';
import { BrowserModule } from '@angular/platform-browser';
// import { CustomNavbar } from '../../pipes/headerNav/template.component';
import { ExportModule } from '../../app/exp.module';


@NgModule({
    imports: [IonicModule, FormsModule, ExportModule],
    entryComponents: [
        PopoverPage,
        TransportersComponent,
        NewTransporterComponent  ],
        
    declarations: [
        TransportersComponent,
        PopoverPage,
        NewTransporterComponent,
      // CustomNavbar    
       ],
    providers: [],

})
export class TransportersModule { }


