import { Injectable } from '@angular/core';
import {ResponseI} from "./dto/ResponseI";
import {AdminUserCommand} from "./dto/AdminUserCommand";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, retry, Subject, tap} from "rxjs";
import {UsuarioCommand} from "./dto/UsuarioCommand";
import {AdminUserDto} from "./dto/AdminUserDto";
import {ReporteCommand} from "./dto/ReporteCommand";
import {AdminDto} from "./dto/AdminDto";
import {UsuarioDto} from "./dto/UsuarioDto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:8080/api/v1/"
  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }
  constructor(private http: HttpClient) {
  }

  loginByEmail(form: AdminUserCommand): Observable<ResponseI> {
    let direccion: string = this.url + "admin/user/buscarExistencia";

    return this.http.post<ResponseI>(direccion, form);
  }

  crearUsuario(form: UsuarioCommand): Observable<ResponseI> {
    let direccion: string = this.url + "usuario/crear";
    return this.http.post<ResponseI>(direccion, form);
  }

  crearAdmin(form: UsuarioCommand): Observable<ResponseI> {
    let direccion: string = this.url + "admin/crear";
    return this.http.post<ResponseI>(direccion, {
      "email": form.email,
      "password": form.password,
      "nombre": form.nombre,
      "apellido": form.apellido
    });
  }

  actualizarEstado(general: AdminUserDto): Observable<ResponseI> {
    let direccion: string = this.url + "admin/user/cambiarEstado"
    return this.http.post<ResponseI>(direccion, {
      "id": general.id,
      "actividad": general.actividad,
      "usuario": general.usuario,
      "admin": general.admin
    });
  }

  allUsuarios(): Observable<ResponseI> {
    let direccion: string = this.url + "usuario/allUsuarios";
    return this.http.get<ResponseI>(direccion, {});
  }

  allAdmins(): Observable<ResponseI> {
    let direccion: string = this.url + "admin/allAdmins"
    return this.http.get<ResponseI>(direccion, {});
  }

  reportesUsuarios(idUsuario: number): Observable<ResponseI> {
    let direccion: string = this.url + "reporte/reportesUsuario"
    return this.http.post<ResponseI>(direccion, {
      "usuarioCreacion": idUsuario
    });
  }

  reportesAdmin(idAdmin: number): Observable<ResponseI> {
    let direccion: string = this.url + "admin/allReportsAdmin";
    let params = new HttpParams();
    params = params.append('idAdmin', idAdmin);
    return this.http.get<ResponseI>(direccion, {
      params
    });
  }

  crearReporte(reporteCommand: ReporteCommand): Observable<ResponseI> {
    let direccion: string = this.url + "reporte/crear";
    return this.http.post<ResponseI>(direccion, reporteCommand);
  }

  actualizarReporte(reporteCommand: ReporteCommand): Observable<ResponseI> {
    let direccion: string = this.url + "reporte/actualizar";
    return this.http.post<ResponseI>(direccion, reporteCommand);
  }

  buscarReporteFecha(fecha: string, idAdmin?: number | null, idUsuario?: number | null): Observable<ResponseI> {
    let direccion: string = this.url + "reporte/buscarReporteFecha";
    let params = new HttpParams();
    params = params.append('fecha', fecha)
    if (idAdmin != null) {
      params = params.append('idAdmin', idAdmin!)
    }
    if (idUsuario != null) {
      params = params.append('idUsuario', idUsuario!);
    }
    return this.http.get<ResponseI>(direccion, {
      params: params
    });
  }

  eliminarReporte(codigo:string){
    let direccion:string = this.url + "reporte/eliminar";
    let params = new HttpParams();
    params = params.append('codigo', codigo);
    return this.http.post<ResponseI>(direccion, {},{
      params:params
    }).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  aceptarReporte(codigo:string):Observable<ResponseI>{
    let direccion:string = this.url + "reporte/confirmar";
    let params = new HttpParams();
    params = params.append('codigo', codigo);
    return this.http.post<ResponseI>(direccion, {},{
      params:params
    }).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  buscarReporteCodigo(codigo:string, idAdmin?:number | null, idUsuario?:number | null):Observable<ResponseI>{
    let direccion:string = this.url + "reporte/buscarReporteCodigo";
    let params = new HttpParams();
    params = params.append('codigo', codigo);
    if(idAdmin != null){
      params = params.append('idAdmin', idAdmin!)
    }
    if(idUsuario != null){
      params = params.append('idUsuario', idUsuario!);
    }
    return this.http.get<ResponseI>(direccion, {
      params:params
    });
  }

}
