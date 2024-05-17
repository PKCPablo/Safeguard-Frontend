import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

import {
    HttpClientModule,
    provideHttpClient,
    withInterceptors,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Angular Material
import { AppMaterialModule } from './app-material.module';
import { apiRestInterceptor } from './helpers/api-rest.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        NavbarComponent,
        SidebarComponent,
        MyProfileComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
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
