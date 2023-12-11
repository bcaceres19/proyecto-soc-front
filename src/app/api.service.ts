import { Injectable } from '@angular/core';
import {ResponseI} from "./dto/ResponseI";
import {AdminUserCommand} from "./dto/AdminUserCommand";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsuarioCommand} from "./dto/UsuarioCommand";

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

}
