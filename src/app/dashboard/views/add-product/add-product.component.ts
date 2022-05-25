import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm = new FormGroup({
    libelle: new FormControl('', [Validators.required]),
    prix: new FormControl('', [Validators.required, Validators.minLength(3)]),
    composants: new FormControl('', [Validators.required])
  });
  
  product: Product = {
    id: '',
    libelle: '',
    addedAt: new Date(),
    price: 0,
    archived: false,
    components: []
  };

  

  constructor(private prodServ: ProductsService, private router: Router, private toast: HotToastService) { }

  ngOnInit(): void {}
 
  handleSaveProduct(){
    if(!this.productForm.valid) return;
    const {libelle, prix, composants} = this.productForm.value;
    this.product.addedAt = new Date();
    this.product.libelle = libelle;
    this.product.price = prix;
    this.product.components = composants.split(',');
    this.prodServ.createProduct(this.product)
    this.toast.success('Ajouter avec succes !')
    this.router.navigateByUrl('/dashboard/products')
  }

  get libelle(){
    return this.productForm.get('libelle');
  }

  get prix(){
    return this.productForm.get('prix');
  }

  get composants(){
    return this.productForm.get('composants');
  }
}
