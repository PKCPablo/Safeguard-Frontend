import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../services/api-rest.service';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    productos: Product[];

    username: String;

    constructor(
        private apiRestService: ApiRestService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.onLoad();
        this.username = this.authService.authUser.getUsername();
    }

    onLoad() {
        this.apiRestService.retrieveProducts().subscribe((data) => {
            this.productos = data;
        });
    }
}
