import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ModifyProductComponent } from './modify-product/modify-product.component';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  products:Product[]=[]
  
  constructor(private prodServ:ProductsService,
    private toast: HotToastService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getProducts()
    console.log(this.products)
  }

  getProducts(){
    this.prodServ.getProducts().subscribe(result => {
      this.products = result.map((e : any) => {
        const product = e.payload.doc.data();
        product.id = e.payload.doc.id;
        return product
      })
    })
  }

  deleteProduct(product:Product){
    this.prodServ.deleteProduct(product);
    this.toast.error('Produit Archive !')
  }

  openDialog(product:Product){
    this.dialog.open(ModifyProductComponent);
  }
}
