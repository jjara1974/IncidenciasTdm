import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { onErrorResumeNext, Subscription } from 'rxjs';
import { Incidencia } from '../models/incidencia'
import { Nivel } from '../models/nivel'
import { ServiciociService } from '../services/servicioci.service';



@Component({
  selector: 'app-formci',
  templateUrl: './formci.component.html',
  styleUrls: ['./formci.component.css']
})
export class FormciComponent implements OnInit {
  public incidencias: Incidencia[] = [];
  public niveles: Nivel[];
  public nuevaincidencia: Incidencia;
  public listaramaunica: Nivel[] = [];
  public listasistemaunico: Nivel[] = [];
  public listasubsistemaunico: Nivel[] = []
  public listaequipounico: Nivel[] = []
 


  constructor(public servicioCi: ServiciociService) { }

  ngOnInit(): void {

    this.nuevaincidencia = new Incidencia("", "", "", "", "", new Date(), new Date(), "", new Date(), new Date(), "", "", "", "", "", new Date(), new Date(), false, new Date(), new Date(), "", 0, "", "", "", false, false, false, false, "", 0, false, false, "", false, false, false, false, false, false, "", "", "", "", "", "", "", false, "", 0),
   
    this.getniveles(); //Carga los niveles desde la api y rellena el array de destino


  }



  // Extrae datos para cargar el desplegable RAMA de la vista
  ramaunica(nivelesx: Nivel[]) {
    this.listaramaunica = [];
    let eanterior: string;
    nivelesx.forEach(e => {
      if (e.COD_RAMA != eanterior) {
        this.listaramaunica.push(e)
      }
      eanterior = e.COD_RAMA;
    })
    this.nuevaincidencia.COD_SISTEMA_DETINC = "";
    this.nuevaincidencia.COD_SUBSISTEMA_DETINC = "";
    this.nuevaincidencia.COD_EQUIPO_DETINC = "";

  }

  // Extrae datos para cargar el desplegable SISTEMA de la vista  
  sistemaunico() {
    this.listasistemaunico = [];
    let eanterior: string;
    this.niveles.filter(e => e.COD_RAMA == this.nuevaincidencia.COD_RAMA_DETINC).forEach(e => {
      if (e.COD_NIVEL1 != eanterior) {
        this.listasistemaunico.push(e)
      }
      eanterior = e.COD_NIVEL1;
    })

    this.nuevaincidencia.COD_SISTEMA_DETINC = "";
    this.nuevaincidencia.COD_SUBSISTEMA_DETINC = "";
    this.nuevaincidencia.COD_EQUIPO_DETINC = "";
    this.ramaunica(this.niveles);
    console.log(this.niveles);
  }

  // Extrae datos para cargar el desplegable SUBSISTEMA de la vista  
  subsistemaunico() {
    this.listasubsistemaunico = [];
    let eanterior: string;
    console.log("=>" + this.nuevaincidencia.COD_RAMA_DETINC + "--" + this.nuevaincidencia.COD_SISTEMA_DETINC)
    this.niveles.filter(e => e.COD_RAMA == this.nuevaincidencia.COD_RAMA_DETINC && e.COD_NIVEL1 == this.nuevaincidencia.COD_SISTEMA_DETINC).forEach(e => {

      if (e.COD_NIVEL2 != eanterior) {
        this.listasubsistemaunico.push(e)

      }
      eanterior = e.COD_NIVEL2;
    })

    this.nuevaincidencia.COD_SUBSISTEMA_DETINC = "";
    this.nuevaincidencia.COD_EQUIPO_DETINC = "";



  }


  equipounico() {

    this.listaequipounico = [];
    let eanterior: string;
    this.niveles.filter(e => e.COD_RAMA == this.nuevaincidencia.COD_RAMA_DETINC && e.COD_NIVEL1 == this.nuevaincidencia.COD_SISTEMA_DETINC && e.COD_NIVEL2 == this.nuevaincidencia.COD_SUBSISTEMA_DETINC).forEach(e => {
      if (e.COD_NIVEL3 != eanterior) {
        this.listaequipounico.push(e)
      }
      eanterior = e.COD_NIVEL3;
    })


  }




  getniveles() {

    this.servicioCi.getNiveles().subscribe(
      result => {
        this.niveles = result;
        this.ramaunica(this.niveles)
      },  //Al terminar la carga de datos lanza la carga del array de destino
      error => {
        console.log(<any>error);
      }
    );

  }



  /*captura(){
    
   this.servicioCi.getIncidencias().subscribe(
      result => {this.inci = result;},
      error => {
          console.log(<any>error);
      }
     );

   }*/

}
