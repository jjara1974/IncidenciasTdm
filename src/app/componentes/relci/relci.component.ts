import { Component, OnInit } from '@angular/core';
import { Incidencia } from '../../models/incidencia'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ServiciociService } from '../../services/servicioci.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 


@Component({
  selector: 'app-relci',
  templateUrl: './relci.component.html',
  styleUrls: ['./relci.component.css']
})
export class RelciComponent implements OnInit {

/*  constructor() { }

  ngOnInit(): void {
  }
*/
  public orden:String = 'asc';
  public campo:String;
  public incidencias: any //Incidencia[]=[];
  public totalItems: number;
  public page: number;
  previousPage: number;
  showPagination: boolean;

  constructor(private route: ActivatedRoute,private servicioCi: ServiciociService,private config: NgbPaginationConfig,private router: Router) {
      this.config.boundaryLinks = true;
  }

  ngOnInit() {
	this.page =1;
	this.previousPage =1;
  this.fillIncidencias(this.page);
  }
  
  fillIncidencias(page : number) : void {
	  this.servicioCi.getIncidencias().subscribe(
		  data => {
		  if ((!data) || (data && data.length ==0)) {
			  this.incidencias = [];
			  this.showPagination = false;
			}
			else {
			  this.incidencias = data;
			  this.totalItems = data.totalAmount;
			  this.showPagination = true;
      }
      

      
    /*  this.incidencias=data;
      this.incidencias.forEach(e=>{
        console.log("fffffffffffffffffff" + e.COD_DETINC);  
      })*/

		  },
		  error => {
			// Aquí se debería tratar el error, bien mostrando un mensaje al usuario o de la forma que se desee.
		  }
		);
  }
  
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.fillIncidencias(this.page-1);
    }
  }


  
  
 

  parametrosOrden(campo:String){
 

   if(this.orden=='asc'){
     this.orden='desc'
   } else{ this.orden='asc'};
    this.campo=campo;

    console.log(this.campo + " "+ this.orden)
   
 
   }




}
