import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { UserProfileComponent }   from './user-profile.component';

@NgModule({
    imports: [IonicModule, FormsModule],
    entryComponents: [UserProfileComponent],
    declarations: [UserProfileComponent],
    providers: [],
})
export class UserProfileModule { }
