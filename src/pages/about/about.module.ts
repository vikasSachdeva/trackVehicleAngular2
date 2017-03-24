import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { AboutComponent } from '../about/about.component';
import { ExportModule } from '../../app/exp.module';

@NgModule({
    imports: [IonicModule, FormsModule,ExportModule ],
    entryComponents: [
        AboutComponent,
        ],
        
    declarations: [
        AboutComponent,
        ],
    providers: [],
})
export class AboutModule {

 }
