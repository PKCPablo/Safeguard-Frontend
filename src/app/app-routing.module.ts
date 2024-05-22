import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';
import { AccountComponent } from './pages/account/account.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [loginGuard] },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [loginGuard] },
    { path: 'home', component: HomeComponent, canActivate: [homeGuard] },
    { path: 'account', component: AccountComponent, canActivate: [homeGuard] },
    { path: 'payment', component: PaymentComponent, canActivate: [homeGuard] },
    {
        path: 'my-profile',
        component: MyProfileComponent,
        canActivate: [homeGuard],
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
