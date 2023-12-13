import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {ReporteCommand} from "../dto/ReporteCommand";
import {ActivatedRoute} from "@angular/router";
import {ReportesDto} from "../dto/ReportesDto";
import {plainToClass} from "class-transformer";

@Component({
  selector: 'app-registro-reporte',
  templateUrl: './registro-reporte.component.html',
  styleUrls: ['./registro-reporte.component.css']
})
export class RegistroReporteComponent {


  constructor(private api:ApiService, private router:Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      if(JSON.stringify(params) != '{}'){
        this.codigoReporte = params['codigo'];
        this.api.buscarReporteCodigo(this.codigoReporte).subscribe({
          next:(v) => {
            let reporteGenerado:ReportesDto = plainToClass(Array<ReportesDto>, v.mensaje)[0];
            this.tituloReporte.setValue(reporteGenerado.tituloReporte)
            this.cuerpoGeneral.setValue(reporteGenerado.cuerpoGeneral);
            this.fechaReport = reporteGenerado.fechaCreacion!;
          },
          error:(e) => console.log(e),
          complete:() => console.log("Se completo correctamente")
        })
        this.textoBoton = 'Actualizar';
      }else{
        this.textoBoton = 'Crear';
      }
    })
  }

  registroReport:FormGroup<any> = new FormGroup<any>(
    {
      tituloReporte: new FormControl('', Validators.required),
      cuerpoGeneral: new FormControl('', Validators.required)
    }
  )

  errorStatus:boolean = false;
  errorMensaje:string = '';

  codigoReporte:string = '';
  textoBoton:string = '';
  fechaReport:Date = new Date();

  get tituloReporte(){
    return this.registroReport.get("tituloReporte") as FormControl;
  }

  get cuerpoGeneral(){
    return this.registroReport.get("cuerpoGeneral") as FormControl;
  }

  onSalir(){
    if(this.codigoReporte == ''){
        this.router.navigate(['administrador/inicio'])
    }else{
      this.router.navigate(['administrador/reporte'])
    }
  }

  onRegistro(formulario:ReporteCommand){
    let id:number = Number(localStorage.getItem("id"));
    formulario.usuarioCreacion = id;
    if(this.textoBoton == 'Actualizar'){
      formulario.codigoReporte = this.codigoReporte;
      formulario.fechaCreacion = this.fechaReport;
      this.api.actualizarReporte(formulario).subscribe({
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
    }else{
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


}
