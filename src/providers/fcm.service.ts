import { Injectable, Directive, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Push } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CommonServices } from '../providers/common.service';
import { Camera, Diagnostic } from 'ionic-native';
// import {CloudSettings, provideCloud, PushToken} from '@ionic/cloud-angular';

declare const Notification: any;

@Injectable()
export class FcmService {
    isEnabled: Boolean;
    senderId: string = "755882045301";
    pushNotify;
    registrationId;
    constructor(public platform: Platform, private commonService: CommonServices) {
    }
        init(){
            if (!this.platform.is('cordova')) {
                console.log("Push notifications not initialized. Cordova is not available - Run in physical device");
                return;
            }
            console.log("=>check if device ready");
            
            console.log(this.pushNotify);
            Push.hasPermission().then(data => {
                this.pushNotify = Push.init({
                android: {
                    senderID: this.senderId,
                    sound: true,
                    // topics: self.topics,
                    icon: "ic_stat_name",
                    iconColor: "#666666",
                    forceShow:true
                }
            });
                console.log("=> check permission");
                console.log(data);
                this.isEnabled = data.isEnabled;
                if (this.isEnabled) {
                    this.pushNotify.on('registration', (data) => {
                        console.log(data);
                        this.registrationId = data.registrationId;
                        console.log("=>device registered  successfully");
                    });
                    this.pushNotify.on('notification', (data) => {
                        console.log(data);
                        console.log("=>notification");
                    });

                    this.pushNotify.on('error', (e) => {
                        console.log("=>error message: " + e.message);
                    });
                }
            });
    }
}



