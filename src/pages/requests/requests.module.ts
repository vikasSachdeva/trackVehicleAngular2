import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { RequestsComponent }   from './requests.component';

import { NewRequestComponent , PopoverPage } from './new/new-request.component';
import { ExportModule } from '../../app/exp.module';


@NgModule({
    imports: [IonicModule, FormsModule, ExportModule],
    entryComponents: [
        RequestsComponent,
        NewRequestComponent,
        PopoverPage
        ],
    
    declarations: [
        RequestsComponent,
        NewRequestComponent,
        PopoverPage,
        ],
    providers: [],
})
export class RequestsModule {

 }






