import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAllCategories() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().pipe(
      map((categories: any) => {
        return categories.map((categoriy: any) => ({ key: categoriy.payload.key, ...categoriy.payload.val() }))
      })
    );
  }
}
