import { Component, Input } from '@angular/core';
import { CategoryService } from 'app/shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  category$: any;
  @Input('category') category: string;

  constructor(private categoryService: CategoryService) {
    this.category$ = this.categoryService.getAllCategories();
  }

}
