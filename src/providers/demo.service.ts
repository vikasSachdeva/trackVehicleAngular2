import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Contact } from '../shared/sdk/';
import { Camera } from 'ionic-native';
import { VehiclesMapComponent } from '../pages/track/vehicles-detail-map/vehicles-map.component';
import { GateInOutComponent } from '../pages/track/gate-in-out/gate-in-out.component';
import { GPSTrackComponent } from '../pages/track/GPS/GPS-track.component';
import { LoadingComponent } from '../pages/track/loading/loading.component';
import { Timeline } from '../model/TimelineModel';


@Injectable()
export class DemoServices {

    vehicleArray: any[];
    requestsArray: any[];

    newTimeLine() {
        return new Timeline();
    }

    cameraOptions: any = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 250,
        targetHeight: 250,
        sourceType: Camera.PictureSourceType.CAMERA
    };

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
    };

    buildContact(value, user): any {
        let names: string[] = value.fullname.split(' ');
        return {
            emails: [user.email],
            appUserId: user.id,
            picture: '../img/placeholder.png',
            firstname: names[0],
            lastname: names[names.length - 1]

        }
    }


    constructor(

        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController) {
    }

}