import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';

const route : Routes = [
    {path:"auth",component:AuthComponent}
];
@NgModule({
    declarations: [
        AuthComponent
    ],
    imports:[
       SharedModule,
       FormsModule,
       NgxSpinnerModule,
       RouterModule.forChild(route)
    ],
    exports:[RouterModule]
})
export class AuthModule {

}