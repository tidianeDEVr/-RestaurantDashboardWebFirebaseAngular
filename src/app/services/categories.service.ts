import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore) {}

  getCategories(){
    return this.afs.collection('/categories').snapshotChanges();
  }
}
