import { IProduct } from './../models/products';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productService.getAllProducts().pipe(
      switchMap((products: IProduct[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe((params: ParamMap) => {
      this.category = params.get('category');

      this.filteredProducts = this.category ? this.products.filter((p: IProduct) => p.category === this.category) : this.products;
    });
  }

}
