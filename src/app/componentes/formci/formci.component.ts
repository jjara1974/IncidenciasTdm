import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component,ViewChild,OnInit,TemplateRef } from '@angular/core';
import { concat, merge, Observable, onErrorResumeNext, Subscription } from 'rxjs';
import { Incidencia } from '../../models/incidencia'
import { Nivel } from '../../models/nivel'
import { ServiciociService } from '../../services/servicioci.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { Lugar } from '../../models/lugar'
import { Via } from '../../models/via'
import { concatAll } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-formci',
  templateUrl: './formci.component.html',
  styleUrls: ['./formci.component.css']
})
export class FormciComponent implements OnInit {
  @ViewChild("ModalGuardaCi", {static: false}) ModalGuardaCi: TemplateRef<any>;
  public titulo: string;
  public edita: number;
  public paramincidencia: any;
  public incidencias: Incidencia[] = [];
  public niveles: Nivel[] = [];
  public nuevaincidencia: Incidencia;
  public listaramaunica: Nivel[] = [];
  public listasistemaunico: Nivel[] = [];
  public listasubsistemaunico: Nivel[] = []
  public listaequipounico: Nivel[] = []
  public lugares: Lugar[] = [];
  public vias: Via[] = [];
  public date: Date = new Date();
  public datosServicio: any;
  public lastIncidencias: any[] = [];
  public lastIncidencia: string;
  public codCiNuevo: string;
  public formCI: any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, public servicioCi: ServiciociService, public servicioUtilidades: UtilidadesService, private formBuilder: FormBuilder) {
    //LLL  this.nuevaincidencia = new Incidencia("", "", "", "", "", null, null, "", null, null, "", "", "", "", "", null, null, false, null, null, "", 0, "", "", "", false, false, false, false, "", 0, false, false, "", false, false, false, false, false, false, "", "", "", "", "", "", "", false, "", 0)
    //Validacion de datos del formulario reactivo

    this.titulo = "Alta de Incidencias";
    this.paramincidencia = "";
    this.formCI = this.formBuilder.group({
      COD_DETINC: ['',],
      COD_RAMA_DETINC: ['', Validators.required],
      COD_SISTEMA_DETINC: ['', Validators.required],
      COD_SUBSISTEMA_DETINC: ['', Validators.required], //, Validators.email
      COD_EQUIPO_DETINC: ['', Validators.required],
      CODLUGAR_DETINC: ['', Validators.required],
      CODVIA_DETINC: ['', Validators.required],
      DESC_DETINC: ['', Validators.required],
      FECAP_DETINC: ['', Validators.required],
      FECCI_DETINC: ['',],
      HORAAP_DETINC: ['',],
      HORACI_DETINC: ['',],
      UTEPCC_DETINC: [true],
      PDFPCC_DETINC: [true],
      EMAILPCC_DETINC: [true],
    });

    this.route.params.subscribe((parametro) => {
      this.paramincidencia = parametro;
    });



  }

  ngOnInit(): void {





    //Estructura ConcatAll que encadena observables esperando el resultado de cada uno antes de ejecutar el siguiente  
    const source = of(this.servicioCi.getLastIncidencias(), this.servicioCi.getLugares(), this.servicioCi.getVia(), this.servicioCi.getNiveles())
    const example = source.pipe(concatAll());
    example.subscribe(result => {
      //---------------
      if (this.lastIncidencias.length == 0) {
        console.log("jj");
        this.lastIncidencias = result;
        this.lastIncidencias.forEach(e => {
          let maxvalor: string = e.MAXCODDETINC
          maxvalor = maxvalor.substr(6, 6);
          console.log(maxvalor + " =¿  " + e.MAXCODDETINC);
          //LLL  this.nuevaincidencia.COD_DETINC = "CN" + new Date().getFullYear() + this.servicioUtilidades.completaCeros((parseInt(maxvalor) + 1), 6) // Calcula COD_DETINC NUEVO 
          this.codCiNuevo = "CN" + new Date().getFullYear() + this.servicioUtilidades.completaCeros((parseInt(maxvalor) + 1), 6) // Calcula COD_DETINC NUEVO 
          //this.formCI.value.COD_DETINC = this.codCiNuevo;
          //LLL this.formCI.value.cod=(this.nuevaincidencia.COD_DETINC +"X")

        });

      } else if (this.lugares.length == 0) {
        this.lugares = result;
      } else if (this.vias.length == 0) {
        this.vias = result;
      } else if (this.niveles.length == 0) {

        this.niveles = result;

        setTimeout(function () {
          this.niveles = result;
        }, 3000);



        this.niveles.forEach(e => {
          e.COD_RAMAN = parseInt(e.COD_RAMA);
          e.COD_NIVEL1N = parseInt(e.COD_NIVEL1);
          e.COD_NIVEL2N = parseInt(e.COD_NIVEL2);
          e.COD_NIVEL3N = parseInt(e.COD_NIVEL3);
        })




        if (this.paramincidencia.COD_DETINC == undefined) { //

          this.titulo = "Alta de Incidencias";
          this.ramaunica(this.niveles);

        } else {//

          this.titulo = "Edición de Incidencias";

          this.edita = 1;

          console.log(this.paramincidencia.PDFPCC_DETINC + this.paramincidencia.EMAILPCC_DETINC + this.paramincidencia.UTEPCC_DETINC);

          let ute, pdf, email;

          if (this.paramincidencia.UTEPCC_DETINC == 'true') { ute = true } else { ute = false }
          if (this.paramincidencia.PDFPCC_DETINC == 'true') { pdf = true } else { pdf = false }
          if (this.paramincidencia.EMAILPCC_DETINC == 'true') { email = true } else { email = false }

          this.formCI.patchValue(this.paramincidencia);//
          this.formCI.controls['FECAP_DETINC'].patchValue(this.paramincidencia.FECAP_DETINC.substr(0, 16));
          this.formCI.controls['FECCI_DETINC'].patchValue(this.paramincidencia.FECCI_DETINC.substr(0, 16));
          this.formCI.controls['HORAAP_DETINC'].patchValue(this.paramincidencia.HORAAP_DETINC.substr(0, 16));
          this.formCI.controls['HORACI_DETINC'].patchValue(this.paramincidencia.HORACI_DETINC.substr(0, 16));
          this.formCI.controls['UTEPCC_DETINC'].patchValue(ute);
          this.formCI.controls['PDFPCC_DETINC'].patchValue(pdf);
          this.formCI.controls['EMAILPCC_DETINC'].patchValue(email);
       



          setTimeout(() => {
            this.ramaunica(this.niveles);
          }, 100);
          setTimeout(() => {
            this.sistemaunico();
          }, 100);
          setTimeout(() => {
            this.subsistemaunico();
          }, 100);
          setTimeout(() => {
            this.equipounico();
            this.edita = 0;
          }, 100);
        }//
      };
      //---------------------------------------------
    });
    console.log(this.formCI.value.UTEPCC_DETINC);
    console.log(this.formCI.value.EMAILPCC_DETINC);
    console.log(this.formCI.value.PDFPCC_DETINC);
    //Fin estructura ConcatAll 
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
    if (this.edita != 1) {
      this.formCI.value.COD_SISTEMA_DETINC = "";
      this.formCI.value.COD_SUBSISTEMA_DETINC = "";
      this.formCI.value.COD_EQUIPO_DETINC = "";
    }


  }

  // Extrae datos para cargar el desplegable SISTEMA de la vista  
  sistemaunico() {
    this.listasistemaunico = [];
    let eanterior: string;
    this.niveles.filter(e => e.COD_RAMA == this.formCI.value.COD_RAMA_DETINC).forEach(e => {
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
    if (this.edita != 1) {
      this.formCI.value.COD_SISTEMA_DETINC = "";
      this.formCI.value.COD_SUBSISTEMA_DETINC = "";
      this.formCI.value.COD_EQUIPO_DETINC = "";
    }

    this.ramaunica(this.niveles);

  }

  // Extrae datos para cargar el desplegable SUBSISTEMA de la vista  
  subsistemaunico() {
    this.listasubsistemaunico = [];
    let eanterior: string;

    this.niveles.filter(e => e.COD_RAMA == this.formCI.value.COD_RAMA_DETINC && e.COD_NIVEL1 == this.formCI.value.COD_SISTEMA_DETINC).forEach(e => {

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

    if (this.edita != 1) {
      this.formCI.value.COD_SUBSISTEMA_DETINC = "";
      this.formCI.value.COD_EQUIPO_DETINC = "";
    }


  }


  equipounico() {

    this.listaequipounico = [];
    let eanterior: string;
    this.niveles.filter(e => e.COD_RAMA == this.formCI.value.COD_RAMA_DETINC && e.COD_NIVEL1 == this.formCI.value.COD_SISTEMA_DETINC && e.COD_NIVEL2 == this.formCI.value.COD_SUBSISTEMA_DETINC).forEach(e => {
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




  getLastIncidencias() {
    this.servicioCi.getLastIncidencias().subscribe(
      result => {
        this.lastIncidencia = result;
      },  //Al terminar la carga de datos lanza la carga del array de destino
      error => {
        console.log(<any>error);
      }
    );

  }





  submet() {
    if (this.formCI.valid == false) {
      alert("Faltan campos obligatorios por rellenar.");
   
    }
    else {
      this.modalService.open(this.ModalGuardaCi);
      // this.guardarCi();
      console.log("Todo correcto.");
    }
  }



  guardarCi() {
    
    this.nuevaincidencia = this.formCI.value;

    if (this.formCI.value.COD_DETINC == "") { this.formCI.value.COD_DETINC = this.codCiNuevo };

    let existe: boolean;

    this.servicioCi.getBuscaIncidencia(this.paramincidencia.COD_DETINC).subscribe(result => {
      let resultado: [] = result;


      if (resultado.length == 0) {
        this.addincidencia();
      } else {
        this.updateincidencia();
      }

      this.tramitarCI();

    });





  }




  addincidencia() {
    this.servicioCi.addIncidencia(this.nuevaincidencia).subscribe(res => {
      let respuesta: any = res.body;


      if (respuesta != null) {

        if (respuesta.name == "RequestError") {
          alert("Se ha producido un error al acceder a la base de datos");
        }
      }
    },
      err => {
        console.log("Se ha producido un error al acceder a la base de datos.");
        console.log(err);
      }
    );


  }


  updateincidencia() {

    this.servicioCi.updateIncidencia(this.nuevaincidencia).subscribe(res => {
      let respuesta: any = res.body;

      if (respuesta != null) {

        if (respuesta.name == "RequestError") {
          alert("Se ha producido un error al acceder a la base de datos");
        }
      }
    },
      err => {
        console.log("Se ha producido un error al acceder a la base de datos.");
        console.log(err);
      }
    );



  }

  nuevaCi() {
    this.paramincidencia = "";
    this.lastIncidencias = [];
    this.lugares = [];
    this.vias = [];
    this.niveles = [];
    this.titulo = "Alta de Incidencias"
    this.formCI = this.formBuilder.group({
      COD_DETINC: ['',],
      COD_RAMA_DETINC: ['', Validators.required],
      COD_SISTEMA_DETINC: ['', Validators.required],
      COD_SUBSISTEMA_DETINC: ['', Validators.required], //, Validators.email
      COD_EQUIPO_DETINC: ['', Validators.required],
      CODLUGAR_DETINC: ['', Validators.required],
      CODVIA_DETINC: ['', Validators.required],
      DESC_DETINC: ['', Validators.required],
      FECAP_DETINC: ['', Validators.required],
      FECCI_DETINC: ['',],
      HORAAP_DETINC: ['',],
      HORACI_DETINC: ['',],
      UTEPCC_DETINC: [,],
      PDFPCC_DETINC: [,],
      EMAILPCC_DETINC: [,],
    });

    this.ngOnInit();
    // this.ngOnInit();
  }





  tramitarCI(){

     if(this.formCI.value.UTEPCC_DETINC==true){
       this.envioUTE();
     }   
     if(this.formCI.value.PDFPCC_DETINC==true){
       this.generaPdf();
     }   
     if(this.formCI.value.EMAILPCC_DETINC==true){
       this.envioEmail();
     }   
    

  }


  envioUTE(){

    alert("Envio UTE Ok");

  }

  generaPdf(){
   
    alert("Generación Pdf Ok");

  }

  envioEmail(){

    alert("Envio Email Ok");

  }



}
