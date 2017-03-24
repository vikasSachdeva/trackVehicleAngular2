import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CustomNavbar } from '../pipes/headerNav/template.component';
import { SearchAnywherePipe } from '../pipes/search-anywhere.pipe';



@NgModule({
	imports : [/*NgbModule.forRoot()*/IonicModule.forRoot(CustomNavbar, {
      iconMode: 'ios',
      mode: 'md',
      menuType: 'reveal',
      tabsHideOnSubPages: true,
      tabsPlacement: 'top',
      dayShortNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    })],
	exports : [/*NgbModule*/CustomNavbar, SearchAnywherePipe],
	declarations : [ CustomNavbar, SearchAnywherePipe ]
})
export class ExportModule { }
