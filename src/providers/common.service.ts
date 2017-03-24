import { Injectable } from '@angular/core';
import { LoadingController, Platform , AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Camera, Diagnostic} from 'ionic-native';
import { Contact } from '../shared/sdk/';
import { AuthServices } from './af.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class CommonServices {

    currentUser: any = {
        picture: 'img/placeholder.png'
    };

    contacts: Contact[];

    depots: any[];
    sources: any[];
    vendor_share: any[];
    cities: any[];
    vendorUsers: any[];
    loggedInCurrentUser: any[];

    constructor(
        public loadingCtrl: LoadingController,
        public platform: Platform,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private auth: AuthServices,
        private http: Http) {
    }

    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    presentToast(message?: string, duration?: string) {
        let durationTime = 0;
        if (duration === 'long') {
            durationTime = 5000;
        } else if (duration === 'short') {
            durationTime = 2500;
        } else {
            durationTime = 3500;
        }
        let toast = this.toastCtrl.create({
            message: message,
            duration: durationTime
        });
        toast.present();
    }

    showAlert(title: string, subTitle?: string, buttons?: string) {
        !buttons ? buttons = "OK" : null;
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [buttons]
        });
        alert.present();
    }

    showLoader(text) {
        let loading = this.loadingCtrl.create({
            content: text
        });
        loading.present();
    }

    sendPush(registration_ids) {
        console.log("=>sendPush");
        let headers = new Headers();
        // headers = new Headers({ 'Authorization': 'key=AIzaSyCDhD151Zw62q8fOugxeYbYG6bqlmEWxbY' });
        headers.append('Authorization', 'key=AIzaSyCDhD151Zw62q8fOugxeYbYG6bqlmEWxbY');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "notification": {
                "title": "Portugal vs. Denmark",
                "body": "5 to 1"
            },
            "registration_ids": registration_ids
        });
        // this.http.post('http://192.168.0.92/projects/Hotel_Bids/hb-app/user/test', body, headers)
        console.log(headers);
        this.http.post('https://fcm.googleapis.com/fcm/send', body, options)
            // this.http.post('https://android.googleapis.com/gcm/send', body, headers)
            .subscribe(
            data => { console.log(data) }, //For Success Response
            err => { console.error(err) } //For Error Response
            );
    }


    accessLocation(fnSuccessCallback, fnErrorCallback) {
        if (!this.platform.is('cordova')) {
            fnSuccessCallback();
            return;
        }

        Diagnostic.getLocationAuthorizationStatus().then(status => {
            console.log("Location authorization status: " + status);
            console.log(this.platform.is('ios'));
            if (!this.platform.is('ios')) { //android
                if (status != "GRANTED") {
                    requestLocationPermission(fnSuccessCallback, fnErrorCallback);
                    // fnErrorCallback("This feature requires permission to access location");
                } else {
                    getLocation(fnSuccessCallback, fnErrorCallback);
                }
            } else {
                if (status == "NOT_DETERMINED") {
                    requestLocationPermission(fnSuccessCallback, fnErrorCallback);
                    // fnErrorCallback("This feature requires permission to access location");
                } else if (status == "authorized_always" || status == "authorized_when_in_use") {
                    getLocation(fnSuccessCallback, fnErrorCallback);
                } else {
                    requestLocationPermission(fnSuccessCallback, fnErrorCallback);
                    // fnErrorCallback("This feature requires permission to access location");
                }
            }
        }, error => fnErrorCallback("Some error occurred"));


        var requestLocationPermission = (fnSuccessCallback, fnErrorCallback) => {

            Diagnostic.requestLocationAuthorization().then(status => {
                console.log(status);
                if (!this.platform.is('ios')) { //android
                    if (status != "GRANTED") {
                        fnErrorCallback("Permission denied");
                    } else {
                        getLocation(fnSuccessCallback, fnErrorCallback);
                    }
                }
            }, error => {
                fnErrorCallback("Failed to grant permission");
                console.error(error);
            });
        };


        var getLocation = (fnSuccessCallback, fnErrorCallback) => {
            if (this.platform.is('ios')) {
                Diagnostic.isLocationEnabled().then(enabled => {
                    console.log(enabled);
                    if (!enabled) {
                        Diagnostic.switchToLocationSettings();
                        fnErrorCallback("");
                        return;
                    }
                    fnSuccessCallback();

                }, () => {
                    Diagnostic.switchToLocationSettings();
                    fnErrorCallback("");
                });
            } else {
                Diagnostic.isGpsLocationEnabled().then(enabled => {
                    console.log(enabled);
                    if (!enabled) {
                        Diagnostic.switchToLocationSettings();
                        fnErrorCallback("");
                        return;
                    }
                    fnSuccessCallback();

                }, () => {
                    Diagnostic.switchToLocationSettings();
                    fnErrorCallback("");
                });
            }
        };
    }

    confirmAlert(title: string, subTitle: string, callBack?: any) {
        let confirmBoxalert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Yes clicked');
                        // console.log(callBack);clo
                        callBack();
                    }
                }
            ]
        });
        confirmBoxalert.present();
    }

    loadDataAfterLoggedIn(userType?: string) {
        console.log('== loadDataAfterLoggedIn == ');
        this.auth.getData('/sources', data => {
            console.log("sources:::" + data);
            // console.log(data.length);
            this.sources = data;
        }, {});
        this.auth.getData('/depots', data => {
            console.log("depots:::" + data);
            // console.log(data.length);
            this.depots = data;
        }, {});
        this.auth.getData('/vendor_share', data => {
            console.log("vendor_share::" + data);
            // console.log(data.length);
            this.vendor_share = data;
        }, {});

        this.auth.getData('/cities', data => {
            console.log("city::" + data);
            // console.log(data.length);
            this.cities = data;
        }, {});
    }

    getNextIncrementId(node) {
        let len;
        this.auth.getData(node, data => {
            console.log(data);
            console.log(data[0].id);
            if(data) {len = data[0].id + 1}
            console.log(len);
        }, {orderByKey: 'id',limitToLast:1});
        console.log(len);
        return len;
    }
    colorLuminance(hex, lum, type?) {
        if (!type) {
            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            lum = lum || 0;
            // convert to decimal and change luminosity
            let rgb = '#', c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ('00' + c).substr(c.length);
            }
            return rgb;
        } else {
            let num = parseInt(hex.slice(1), 16), amt = Math.round(2.55 * lum), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
            return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
        }
    }
 
}

// form validator class
@Injectable()
export class formValidator {

   public isValidMailFormat(control: FormControl){
        let EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
            return { "Please provide a valid email": true };
        }

        return null;
    }

}