import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {ReportesDto} from "../dto/ReportesDto";
import {plainToClass} from "class-transformer";
import {ReporteCommand} from "../dto/ReporteCommand";

@Component({
  selector: 'app-destalle-reporte',
  templateUrl: './destalle-reporte.component.html',
  styleUrls: ['./destalle-reporte.component.css']
})
export class DestalleReporteComponent {

  botonAdminUser:string = '';
  listaReportes: Array<ReportesDto> = [];
  contenidoDescripcion:string = '';
  reporteActual:ReportesDto = new ReportesDto();
  linkDescarga:string = '';
  nombreArchivo:string = '';
  tipoBusqueda:string = '';

  constructor(private api:ApiService) {
  }

  ngOnInit(){
    let actUser:boolean = localStorage.getItem("actUsuario") != null ? Boolean(localStorage.getItem("actUsuario")) : false;
    let actAdmin:boolean = localStorage.getItem("actAdmin") != null ? Boolean(localStorage.getItem("actAdmin")) : false;
    if(actUser){
      let idUsuario:number = Number(localStorage.getItem("id"))
      this.botonAdminUser='Actualizar';
      this.api.reportesUsuarios(idUsuario).subscribe({
        next: (v) => {
          this.listaReportes = plainToClass(Array<ReportesDto>, v.mensaje)
        },
        error:(e) => console.log(e),
        complete: () => console.log("Se trajeron todos los reportes")
      })
    }else if(actAdmin){
      this.botonAdminUser='Confirmar'
    }
  }

  onViewInfoReport(reporte:ReportesDto){
    this.reporteActual = reporte;
    this.contenidoDescripcion = decodeURIComponent(escape(atob(String(reporte.contenido))));
  }

  descargarArchivo(){
    if(this.reporteActual != null){
      const byteCharacters = atob(String(this.reporteActual.archivo));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], { type: 'application/octet-stream' });

      // Crear un enlace temporal para descargar el archivo
      this.linkDescarga = window.URL.createObjectURL(blob);
      this.nombreArchivo =  this.reporteActual.nombreReporte + ".txt";
    }
  }

  cambiarTipoBus(tipo:string){
    this.tipoBusqueda = tipo
  }

  protected readonly String = String;
}
