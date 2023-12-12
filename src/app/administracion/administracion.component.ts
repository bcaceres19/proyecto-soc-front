import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {UsuarioDto} from "../dto/UsuarioDto";
import {plainToClass} from "class-transformer";
import {ReportesDto} from "../dto/ReportesDto";
import {AdminUserDto} from "../dto/AdminUserDto";

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent {

  listaUsuarios: Array<any> =[];

  listaReportes: Array<ReportesDto> = [];

  tituloActivos:string = "";

  constructor(private api:ApiService, private router: Router) {}

  ngOnInit(){
    let actUser:boolean = localStorage.getItem("actUsuario") != null ? Boolean(localStorage.getItem("actUsuario")) : false;
    let actAdmin:boolean = localStorage.getItem("actAdmin") != null ? Boolean(localStorage.getItem("actAdmin")) : false;
    if(actAdmin){
      this.tituloActivos = 'Usuarios';
      this.api.allUsuarios().subscribe({
        next: (v) => {
          this.listaUsuarios = plainToClass(Array<UsuarioDto>,v.mensaje)
        },
        error:(e) => console.log(e),
        complete: () => console.log("Se trajeron todos los usuarios")
      })
    }else if(actUser){
        this.tituloActivos = 'Admins';
        let idUsuario:number = Number(localStorage.getItem("id"))
        this.api.allAdmins().subscribe(
            {
                next:(v) => {
                  this.listaUsuarios = plainToClass(Array<AdminUserDto>, v.mensaje)
                },
                error:(e) => console.log(e),
                complete: () => console.log("Se trajeron todos los admins")
            }
        )
      this.api.reportesUsuarios(idUsuario).subscribe({
        next: (v) => {
          this.listaReportes = plainToClass(Array<ReportesDto>, v.mensaje)
          console.log(v)
        },
        error:(e) => console.log(e),
        complete: () => console.log("Se trajeron todos los reportes")
      })
    }

  }

    protected readonly String = String;
}
