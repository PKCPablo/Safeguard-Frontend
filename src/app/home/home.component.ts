import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../services/api-rest.service';
import { Producto } from '../models/producto';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    productos: Producto[];

    constructor(private apiRestService: ApiRestService) {}

    ngOnInit(): void {
        this.apiRestService.getProductoList().subscribe((data) => {
            this.productos = data;
        });
    }
}
