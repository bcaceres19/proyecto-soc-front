import { Injectable } from '@angular/core';
import {ResponseI} from "./dto/ResponseI";
import {AdminUserCommand} from "./dto/AdminUserCommand";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsuarioCommand} from "./dto/UsuarioCommand";
import {AdminUserDto} from "./dto/AdminUserDto";
import {ReporteCommand} from "./dto/ReporteCommand";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:8080/api/v1/"

  constructor(private http:HttpClient) { }

  loginByEmail(form:AdminUserCommand):Observable<ResponseI>{
    let direccion:string =  this.url+"admin/user/buscarExistencia";

    return this.http.post<ResponseI>(direccion, form);
  }

  crearUsuario(form:UsuarioCommand):Observable<ResponseI>{
    let direccion:string = this.url + "usuario/crear";
    return this.http.post<ResponseI>(direccion, form);
  }

  actualizarEstado(general:AdminUserDto):Observable<ResponseI>{
    let direccion:string = this.url + "admin/user/cambiarEstado"
    return this.http.post<ResponseI>(direccion, {
        "id": general.id,
        "actividad": general.actividad,
        "usuario": general.usuario,
        "admin": general.admin
    });
  }

  allUsuarios():Observable<ResponseI>{
    let direccion:string = this.url + "usuario/allUsuarios";
    return this.http.get<ResponseI>(direccion, {});
  }

  allAdmins():Observable<ResponseI>{
    let direccion:string = this.url + "admin/allAdmins"
      return this.http.get<ResponseI>(direccion,{});
  }

  reportesUsuarios(idUsuario:number):Observable<ResponseI>{
      let direccion:string = this.url + "reporte/reportesUsuario"
      return this.http.post<ResponseI>(direccion, {
        "usuarioCreacion":idUsuario
      });
  }

  crearReporte(reporteCommand:ReporteCommand):Observable<ResponseI>{
      let direccion:string = this.url + "reporte/crear";
      return this.http.post<ResponseI>(direccion, reporteCommand);
  }

}
