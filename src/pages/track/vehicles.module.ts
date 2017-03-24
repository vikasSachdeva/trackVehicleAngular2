import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesDetailComponent } from './vehicles-detail/vehicles-detail.component';
import { VehiclesMapComponent } from './vehicles-detail-map/vehicles-map.component';
import { GPSTrackComponent } from './GPS/GPS-track.component';
import { GateInOutComponent} from './gate-in-out/gate-in-out.component';
import { ExportModule } from '../../app/exp.module';
import { LoadingComponent} from './loading/loading.component';
@NgModule({
    imports: [
        IonicModule,
        MomentModule,
        ExportModule
    ],
    entryComponents: [
        VehiclesComponent,
        VehiclesDetailComponent,
        VehiclesMapComponent,
        GPSTrackComponent,
        GateInOutComponent,
        LoadingComponent,
    ],
    declarations: [
       VehiclesComponent,
       VehiclesDetailComponent,
       VehiclesMapComponent,
       GPSTrackComponent,
       GateInOutComponent,
       LoadingComponent,
    ],
    providers: [],
})
export class VehiclesModule { }