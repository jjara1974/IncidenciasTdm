import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormciComponent } from './formci/formci.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: FormciComponent },
 //{ path: 'about', component: AboutComponent },
 // { path: 'products', component: ProductsComponent },
 // { path: 'product-detail/:id', component: ProductDetailComponent },  
 // { path: 'contact', component: ContactComponent },
 // { path: '**', component: NoPageFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
