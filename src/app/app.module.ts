import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './componentes/app/app.component';
import { FormciComponent } from './componentes/formci/formci.component';
import { ServiciociService } from './services/servicioci.service';
import { UtilidadesService } from './services/utilidades.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RelciComponent } from './componentes/relci/relci.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PipeOrdenaPipe } from './pipes/pipe-ordena.pipe';


@NgModule({
  declarations: [ 
    AppComponent,
    FormciComponent,
    RelciComponent,
    PipeOrdenaPipe,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,  
    NgbModule
  ],
  providers: [ServiciociService,UtilidadesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
