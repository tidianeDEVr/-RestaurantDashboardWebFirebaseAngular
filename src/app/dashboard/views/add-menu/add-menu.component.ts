import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Category } from 'src/app/models/category';
import { Menu } from 'src/app/models/menu';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { MenusService } from 'src/app/services/menus.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  categories:Category[]=[]
  products:Product[]=[]
  image: any = {}
  imgSrc:string = '../../../../assets/img/menus-placeholder.png'

  menu: Menu = {
    id: '',
    libelle: '',
    category: '',
    products: []
  };

  constructor(
    private catServ: CategoriesService,
    private prodServ: ProductsService,
    private toast: HotToastService,
    private menuServ: MenusService,
    private router: Router) 
    { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
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

  getCategories(){
    this.catServ.getCategories().subscribe(result => {
      this.categories = result.map((e : any) => {
        const category = e.payload.doc.data();
        category.id = e.payload.doc.id;
        return category
      })
    })
  }

  handleSaveMenu(){
    if((this.menu.libelle == '') 
      || (this.menu.products == [])
      ) return this.toast.error('Renseignez tous les champs !')
    this.menuServ.createMenus(this.menu, this.image)
    this.toast.success('Menu ajoute avec succes !')
    return this.router.navigateByUrl('/dashboard/menus')
  }

  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
    }else{
      this.imgSrc = '../../../../assets/img/menus-placeholder.png';
      this.image = null;
    }
  }
}
