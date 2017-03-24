import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { BoardComponent } from './board.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ExportModule } from '../../app/exp.module';
// import { CustomNavbar } from '../../pipes/headerNav/template.component';



@NgModule({
    imports: [
        IonicModule,
        MomentModule,
        ChartsModule,
        ExportModule

    ],
    entryComponents: [
        BoardComponent
        

    ],
    declarations: [
       BoardComponent,
       // CustomNavbar
    ],
    providers: [],
})
export class BoardModule { }