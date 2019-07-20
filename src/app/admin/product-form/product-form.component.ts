import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$: any;
  product: any = {};
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getAllCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProductById(this.id).subscribe((p: any) => {
        this.product = p.payload.val();
      });

      /* this.productService.getProductById(id).pipe(
        map(res => res.payload.val())
      ).subscribe((p) => {
        this.product = p;
        console.log('p:', this.product);
      }); */

    }

  }

  ngOnInit() {
  }

  save(product: any) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm("Are you are you want to delete this product?")) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

}
