import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
    declarations: [
        AuthComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [
        RouterModule,
        AuthRoutingModule,
        SharedModule
    ]
})

export class AuthModule {}