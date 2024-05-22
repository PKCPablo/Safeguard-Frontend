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

    password: string = '';

    uppercaseValid: boolean = false;
    lowercaseValid: boolean = false;
    numberValid: boolean = false;
    lengthValid: boolean = false;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

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

    validatePassword(): void {
        this.password = this.signupForm.value['password'];

        const re_uppercase = new RegExp('(?=.*[A-Z])');
        const re_lowercase = new RegExp('(?=.*[a-z])');
        const re_length = new RegExp('.{8,}$');
        const re_number = new RegExp('(?=.*\\d)');

        if (this.password.length > 0) {
            this.uppercaseValid = this.password.match(re_uppercase) ? true : false;
            this.lowercaseValid = this.password.match(re_lowercase) ? true : false;
            this.numberValid = this.password.match(re_number) ? true : false;
            this.lengthValid = this.password.match(re_length) ? true : false;
        }
    }
}
