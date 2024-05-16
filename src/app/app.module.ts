import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

import {
    HttpClientModule,
    provideHttpClient,
    withInterceptors,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Angular Material
import { AppMaterialModule } from './app-material/app-material.module';
import { apiRestInterceptor } from './interceptors/api-rest.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        NavbarComponent,
        MyProfileComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        AppMaterialModule,
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([apiRestInterceptor])),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
