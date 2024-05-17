import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    
    constructor(private router: Router) {}

    showNavbar(): boolean {
        return !(
            this.router.url.includes('/login') ||
            this.router.url.includes('/signup')
        );
    }
}
