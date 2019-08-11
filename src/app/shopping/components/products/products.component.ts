import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { IProduct } from 'shared/models/products';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAllProducts().pipe(
      switchMap((products: IProduct[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe((params: ParamMap) => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = this.category ? this.products.filter((p: IProduct) => p.category === this.category) : this.products;
  }

}
