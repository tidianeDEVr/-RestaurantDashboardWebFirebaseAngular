import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Menu } from 'src/app/models/menu';
import { Product } from 'src/app/models/product';
import { MenusService } from 'src/app/services/menus.service';
import { MatDialog } from '@angular/material/dialog';
import { ModifyMenuComponent } from './modify-menu/modify-menu.component';

@Component({
  selector: 'app-show-menus',
  templateUrl: './show-menus.component.html',
  styleUrls: ['./show-menus.component.css']
})
export class ShowMenusComponent implements OnInit {

  menus:Menu[] = []
  products:Product[] = []
  idCat: any = 0
  idProd: any = 0

  constructor(
    private menuServ: MenusService,
    private toast:HotToastService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMenus()
  }
  getMenus(){
    this.menuServ.getMenus().subscribe(result => {
      this.menus = result.map((e : any) => {
        const menu = e.payload.doc.data();
        menu.id = e.payload.doc.id;
        return menu
      })
    })
  }

  deleteMenu(menu:Menu){
    this.menuServ.deleteMenus(menu);
    this.toast.error('Produit Archive !')
  }

  openDialog(){
    this.dialog.open(ModifyMenuComponent);
  }
}
