import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ValidaFormsService {
   form;
  constructor(private formBuilder: FormBuilder) {
    
    this.form = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      localizacion: ['', Validators.required],
 
    });


   }



submit() {
  if (this.form.valid) {
    console.log(this.form.value)
  }
  else{
    alert("FILL ALL FIELDS")
  }
}








}