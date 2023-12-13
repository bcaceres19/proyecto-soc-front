import {FormControl} from "@angular/forms";

export interface ReporteCommand{
    codigoReporte: string;
    tituloReporte:string;
    cuerpoGeneral:string;
    usuarioCreacion:number;
    fechaCreacion: Date;

}
