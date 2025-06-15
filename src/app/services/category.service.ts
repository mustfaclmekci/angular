import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Category {
  id: string;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}

  getCategories(): Observable<Category[]> {
    return this.firestore.collection<Category>('categories').valueChanges({ idField: 'id' });
  }
}
