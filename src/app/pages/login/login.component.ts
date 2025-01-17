import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: this.formBuilder.control('', Validators.required),
            password: this.formBuilder.control('', Validators.required),
        });
    }

    onLogin(): void {
        this.authService.login(this.loginForm.value['email'], this.loginForm.value['password']);
    }

    saltarLogin() {
        this.authService.login('pablinelchulin@gmail.com', 'XXXXX');
    }
}
