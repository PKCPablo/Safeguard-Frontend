import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: this.formBuilder.control('', Validators.required),
            givenName: this.formBuilder.control('', Validators.required),
            nickname: this.formBuilder.control('', Validators.required),
            password: this.formBuilder.control('', Validators.required),
        });
    }

    onRegister(): void {
        console.log(this.signupForm.value);
        this.authService.signup(
            this.signupForm.value['email'],
            this.signupForm.value['givenName'],
            this.signupForm.value['nickname'],
            this.signupForm.value['password']
        );
    }
}
