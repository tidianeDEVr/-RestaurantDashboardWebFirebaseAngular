import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddMenuComponent } from './views/add-menu/add-menu.component';
import { AddProductComponent } from './views/add-product/add-product.component';
import { HomeComponent } from './views/home/home.component';
import { ShowCommandsComponent } from './views/show-commands/show-commands.component';
import { ShowMenusComponent } from './views/show-menus/show-menus.component';
import { ShowProductsComponent } from './views/show-products/show-products.component';

const routes: Routes = [
  { path: '', 
  component: DashboardComponent ,
  children: [
    { path: '', component: HomeComponent },
    { path: 'commands', component: ShowCommandsComponent },
    { path: 'add-menu', component: AddMenuComponent },
    { path: 'menus', component: ShowMenusComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'products', component: ShowProductsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
