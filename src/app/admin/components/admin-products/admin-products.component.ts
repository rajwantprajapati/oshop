import { IProduct } from 'shared/models/products';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy {
  products: IProduct[];
  productsSubscription: Subscription;
  tableResource: DataTableResource<IProduct>;
  items: IProduct[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.productsSubscription = this.productService.getAllProducts().subscribe((products: IProduct[]) => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: IProduct[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0, limit: 10 }).then((items: IProduct[]) => this.items = items);
    this.tableResource.count().then((count: number) => this.itemCount = count);
  }

  reloadItems(params: any) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then((items: IProduct[]) => this.items = items);
  }

  filter(searchText: string) {
    let filteredProducts = searchText ?
      this.products.filter((p: IProduct) => p.title.toLowerCase().includes(searchText.toLowerCase())) : this.products;
    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
