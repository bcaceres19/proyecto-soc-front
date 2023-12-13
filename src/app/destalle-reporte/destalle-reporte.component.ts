import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ApiService} from "../api.service";
import {ReportesDto} from "../dto/ReportesDto";
import {plainToClass} from "class-transformer";
import {FormControl, FormGroup, Validators, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {ReporteCommand} from "../dto/ReporteCommand";
import {ReporteBusquedaCommand} from "../dto/ReporteBusquedaCommand";
import {Router} from "@angular/router";
import {retry, Subscription} from "rxjs";

@Component({
  selector: 'app-destalle-reporte',
  templateUrl: './destalle-reporte.component.html',
  styleUrls: ['./destalle-reporte.component.css'],
})
export class DestalleReporteComponent {

  busquedaForm = new FormGroup({
    fechaCreacion:new FormControl(''),
    codigoReporte:new FormControl('')
  })

  aereaForm = new FormGroup({
    reporteF:new FormControl('', [Validators.required])
  })

  get fechaCreacion(){
    return this.busquedaForm.get("fechaCreacion") as FormControl;
  }

  get codigoReporte(){
    return this.busquedaForm.get("codigoReporte") as FormControl;
  }

  get reporteF(){
    return this.aereaForm.get("reporteF") as FormControl;
  }

  botonAdminUser:string = '';
  listaReportes: Array<ReportesDto> = [];
  contenidoDescripcion:string = '';
  reporteActual:ReportesDto = new ReportesDto();
  linkDescarga:string = '';
  nombreArchivo:string = '';
  tipoBusqueda:string = 'date';
  controladorBusqueda:string= 'fechaCreacion';
  suscripcion: Subscription = new Subscription();

  constructor(private api:ApiService, private router: Router) {}

  ngOnInit() {
    let actUser: boolean = localStorage.getItem("actUsuario") != null ? Boolean(localStorage.getItem("actUsuario")) : false;
    let actAdmin: boolean = localStorage.getItem("actAdmin") != null ? Boolean(localStorage.getItem("actAdmin")) : false;
    this.getReportes(actUser, actAdmin);
    this.suscripcion = this.api.refresh$.subscribe(()=>{
      this.reporteF.setValue('')
      this.getReportes(actUser, actAdmin);
    })
  }

  getReportes(actUser:boolean, actAdmin:boolean):void{
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
      let idAdmin:number = Number(localStorage.getItem("id"))
      this.botonAdminUser='Confirmar'
      this.api.reportesAdmin(idAdmin).subscribe({
        next: (v) => {
          this.listaReportes = plainToClass(Array<ReportesDto>, v.mensaje)
        },
        error:(e) => console.log(e),
        complete: () => console.log("Se trajeron todos los reportes")
      })
    }
  }
  onViewInfoReport(reporte:ReportesDto){
    this.reporteActual = reporte;
    this.reporteF.setValue(decodeURIComponent(escape(atob(String(reporte.contenido)))))
  }

  busqueda(reporte: ɵTypedOrUntyped<{
    codigoReporte: FormControl<string | null>;
    fechaCreacion: FormControl<string | null>
  }, ɵFormGroupValue<{ codigoReporte: FormControl<string | null>; fechaCreacion: FormControl<string | null> }>, any>){
    let actUser:boolean = localStorage.getItem("actUsuario") != null ? Boolean(localStorage.getItem("actUsuario")) : false;
    let actAdmin:boolean = localStorage.getItem("actAdmin") != null ? Boolean(localStorage.getItem("actAdmin")) : false;
    let idUsuario:number = Number(localStorage.getItem("id"))
    if(this.controladorBusqueda == 'codigoReporte'){
      this.api.buscarReporteCodigo(reporte.codigoReporte!, actAdmin ? idUsuario : null,  actUser ? idUsuario : null).subscribe({
        next:(v) => {
          this.listaReportes = plainToClass(Array<ReportesDto>, v.mensaje)
        },
        error:(e) => console.log(e),
        complete: () => console.log("Se trajeron todos los reportes")
      })
    }else if(this.controladorBusqueda == 'fechaCreacion'){
      if(reporte.fechaCreacion != ''){
        let fecha:string = reporte.fechaCreacion + ":01";
        this.api.buscarReporteFecha(fecha, actAdmin ? idUsuario : null,  actUser ? idUsuario : null).subscribe({
          next:(v) => {
            this.listaReportes = plainToClass(Array<ReportesDto>, v.mensaje)
          },
          error:(e) => console.log(e),
          complete: () => console.log("Se trajeron todos los reportes")
        })
      }else{
        let actUser: boolean = localStorage.getItem("actUsuario") != null ? Boolean(localStorage.getItem("actUsuario")) : false;
        let actAdmin: boolean = localStorage.getItem("actAdmin") != null ? Boolean(localStorage.getItem("actAdmin")) : false;
        this.getReportes(actUser, actAdmin);
      }
    }
  }

  onEliminar(){
    this.api.eliminarReporte(this.reporteActual.codigoReporte!).subscribe({
      next:(v) => {
        console.log(v.codigo)
        if(v.codigo == "200"){

        }
      },
      error:(e)=>console.log(e),
      complete:() =>console.log("Se elimino el reporte")
    })
  }

  descargarArchivo(){
    if(this.reporteActual.codigoReporte != undefined){
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

  actualizarReporte(codigoReporte:string){
    if(this.reporteActual.codigoReporte != undefined){
      if(this.botonAdminUser == 'Confirmar'){
        this.api.aceptarReporte(codigoReporte).subscribe({
          next:(v) => {
          },
          error:(e) => console.log(e),
          complete: () => console.log("Se confirmo el reporte")
        })
      }else{
        this.router.navigate(['administrador/reporte/' + codigoReporte]);
      }
    }
  }

  cambiarTipoBus(tipo:string){
    this.tipoBusqueda = tipo
    this.controladorBusqueda = tipo == 'text'  ? 'codigoReporte' : 'fechaCreacion';
  }

  protected readonly String = String;
}
