import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { DeliveryPointsComponent, PopoverPage }   from './delivery-points.component';
import { NewDeliveryPointComponent } from './add-edit-delivery-point/new-delivery-point.component';
import { BrowserModule } from '@angular/platform-browser';
// import { CustomNavbar } from '../../pipes/headerNav/template.component';
import { ExportModule } from '../../app/exp.module';


@NgModule({
    imports: [IonicModule, FormsModule, ExportModule],
    entryComponents: [
        PopoverPage,
        DeliveryPointsComponent,
        NewDeliveryPointComponent  ],
        
    declarations: [
        DeliveryPointsComponent,
        PopoverPage,
        NewDeliveryPointComponent,
      // CustomNavbar    
       ],
    providers: [],

})
export class DeliveryPointsModule { }


