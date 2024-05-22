import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { InfoDialogComponent } from './shared/info-dialog/info-dialog.component';
import { apiRestInterceptor } from './helpers/api-rest.interceptor';

import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Angular Material
import { AppMaterialModule } from './app-material.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        NavbarComponent,
        SidebarComponent,
        AccountComponent,
        PaymentComponent,
        InfoDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
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
