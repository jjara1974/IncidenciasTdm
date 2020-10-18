import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { onErrorResumeNext, Subscription } from 'rxjs';
import { Incidencia } from '../models/incidencia'
import { Nivel } from '../models/nivel'
import { ServiciociService } from '../services/servicioci.service';
import { Lugar } from '../models/lugar'
import { Via } from '../models/via'


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
  public lugares: Lugar[]=[];
  public vias: Via[]=[];
  public date: Date = new Date();
  


  constructor(public servicioCi: ServiciociService) { 
    this.nuevaincidencia = new Incidencia("", "", "", "", "", null, null, "", null, null, "", "", "", "", "", null, null, false, null, null, "", 0, "", "", "", false, false, false, false, "", 0, false, false, "", false, false, false, false, false, false, "", "", "", "", "", "", "", false, "", 0)
    this.nuevaincidencia.FECAP_DETINC = new Date(new Date().getTime());
  }

  ngOnInit(): void {

    
    this.getNiveles(); //Carga los niveles desde la api y rellena el array de destino
    alert(this.nuevaincidencia.FECSO_DETINC);
    //console.log(this.nuevaincidencia)
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
    this.listaramaunica.sort();
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
    this.listasistemaunico.sort(function (a, b) {
      if (a.COD_NIVEL1N > b.COD_NIVEL1N) {
        return 1;
      }
      if (a.COD_NIVEL1N < b.COD_NIVEL1N) {
        return -1;
      }
      return 0;
    });

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
    this.listasubsistemaunico.sort(function (a, b) {
      if (a.COD_NIVEL2N > b.COD_NIVEL2N) {
        return 1;
      }
      if (a.COD_NIVEL2N < b.COD_NIVEL2N) {
        return -1;
      }
      return 0;
    });

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
    this.listaequipounico.sort(function (a, b) {
      if (a.COD_NIVEL3N > b.COD_NIVEL3N) {
        return 1;
      }
      if (a.COD_NIVEL3N < b.COD_NIVEL3N) {
        return -1;
      }
      return 0;
    });

  }




  getNiveles() {

    this.servicioCi.getNiveles().subscribe(
      result => {
        this.niveles = result;
         
        this.niveles.forEach(e=>{

           e.COD_RAMAN= parseInt(e.COD_RAMA);
           e.COD_NIVEL1N=parseInt(e.COD_NIVEL1);
           e.COD_NIVEL2N=parseInt(e.COD_NIVEL2);
           e.COD_NIVEL3N=parseInt(e.COD_NIVEL3);
        }) 

        this.ramaunica(this.niveles)
        this.getLugares(); 
       
       
      },  //Al terminar la carga de datos lanza la carga del array de destino
      error => {
        console.log(<any>error);
      }
    );

  }


  getLugares(){
    this.servicioCi.getLugares().subscribe( 
      result=>{
         this.lugares = result;
         this.getVia();
        },  //Al terminar la carga de datos lanza la carga del array de destino
      error => {
        console.log(<any>error);
      }
    );

    }

    getVia(){
      this.servicioCi.getVia().subscribe( 
        result=>{
           this.vias = result;
         },  //Al terminar la carga de datos lanza la carga del array de destino
        error => {
          console.log(<any>error);
        }
      );
  
      }
  


    guardarCi(){


      console.log(this.nuevaincidencia)

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
