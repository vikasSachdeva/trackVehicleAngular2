import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { VendorRequestsComponent }  from './vendor-requests.component';
import { ViewRequestComponent } from './view/view-request.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

import { ExportModule } from '../../app/exp.module';



@NgModule({
    imports: [IonicModule, FormsModule, ExportModule],
    entryComponents: [
        VendorRequestsComponent,
        ViewRequestComponent,
        AddVehicleComponent,
        ],
        
    declarations: [
        VendorRequestsComponent,
        ViewRequestComponent,
        AddVehicleComponent,
        ],
    providers: [],
})
export class VendorRequestsModule {

 }
