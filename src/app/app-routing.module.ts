import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormciComponent } from './componentes/formci/formci.component';
import { RelciComponent } from './componentes/relci/relci.component';
import { AppComponent } from './componentes/app/app.component';
const routes: Routes = [
 // { path: '', redirectTo: 'formci', pathMatch: 'full' },
  //{ path: 'home', component: AppComponent},
  { path: 'formci', component: FormciComponent },
  { path: 'relci', component: RelciComponent },
 // { path: 'products', component: ProductsComponent },
 // { path: 'product-detail/:id', component: ProductDetailComponent },  
 // { path: 'contact', component: ContactComponent },
  { path: '**', component: RelciComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
