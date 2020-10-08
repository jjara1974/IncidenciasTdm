import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormciComponent } from './formci/formci.component';
import {ServiciociService } from './services/servicioci.service';


@NgModule({
  declarations: [
    AppComponent,
    FormciComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ServiciociService],
  bootstrap: [AppComponent,FormciComponent]
})
export class AppModule { }
