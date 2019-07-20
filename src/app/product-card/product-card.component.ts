import { IProduct } from './../models/products';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: IProduct;
  @Input('show-actions') showActions: Boolean = true;
  constructor() { }

}
