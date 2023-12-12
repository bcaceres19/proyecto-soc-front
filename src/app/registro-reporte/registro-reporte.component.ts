import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {ReporteCommand} from "../dto/ReporteCommand";
import {ResponseI} from "../dto/ResponseI";

@Component({
  selector: 'app-registro-reporte',
  templateUrl: './registro-reporte.component.html',
  styleUrls: ['./registro-reporte.component.css']
})
export class RegistroReporteComponent {

  registroReport:FormGroup<any> = new FormGroup<any>(
      {
        titulo: new FormControl('', Validators.required),
        contenido: new FormControl('', Validators.required)
      }
  )

  errorStatus:boolean = false;
  errorMensaje:string = '';

  get titulo(){
    return this.registroReport.get("titulo") as FormControl;
  }

  get contenido(){
    return this.registroReport.get("contenido") as FormControl;
  }

  constructor(private api:ApiService, private router:Router) {}

  onRegistro(formulario:ReporteCommand){
      let id:number = Number(localStorage.getItem("id"));
      formulario.usuarioCreacion = id;
      this.api.crearReporte(formulario).subscribe({
        next:(v) => {
            if(v.codigo == "201"){
              this.router.navigate(["administrador"]);
            }else{
              this.errorStatus = true;
              this.errorMensaje = v.mensaje.toString();
            }
        },
        error:(e)=>console.log(e),
        complete:() =>console.log("Se completo la creacion del reporte")
      })
  }

}
