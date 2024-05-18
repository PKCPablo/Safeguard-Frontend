import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../services/api-rest.service';
import { Producto } from '../../models/producto';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    productos: Producto[];

    username: String;

    constructor(private apiRestService: ApiRestService, private authService: AuthService) {}

    ngOnInit(): void {
        this.apiRestService.retrieveProducts().subscribe((data) => {
            this.productos = data;
        });
        
        this.username = this.authService.authUser.getUsername();
    }
}
