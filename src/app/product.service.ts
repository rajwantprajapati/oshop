import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list('/products').snapshotChanges().pipe(
      map((products: any) => {
        return products.map((product: any) => ({ key: product.payload.key, ...product.payload.val() }))
      })
    );
  }

  getProductById(productId: any) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }

  updateProduct(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId: any) {
    return this.db.object('/products/' + productId).remove();
  }
}
