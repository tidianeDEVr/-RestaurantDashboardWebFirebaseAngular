import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private afs: AngularFirestore) { }

  getProducts(){
    return this.afs.collection('/products').snapshotChanges()
  }
  
  createProduct(product:Product){
    product.id = this.afs.createId()
    return this.afs.collection('/products').add(product)
  }

  deleteProduct(product:Product){
    return this.afs.doc('/products/'+product.id).delete();
  }

  updateProduct(product:Product){
    this.deleteProduct(product);
    return this.createProduct(product)
  }
}
