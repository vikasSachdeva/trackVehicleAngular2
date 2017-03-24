import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { ViewRequestComponent } from './view/view-request.component';
import { DemoServices } from '../../providers/demo.service';

@Component({
  selector: 'about',
  templateUrl: 'about.html'
})
export class AboutComponent {
  ViewRequest: any;
  item: any;
 

  constructor(private demoService:DemoServices) {
  
 
  }


}
