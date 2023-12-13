import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {AdminUserDto} from "../dto/AdminUserDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  abrir:boolean = false;

  formularioCrear:string = '';

  redireccion:string = '';

  constructor(private api:ApiService,private route:Router) {
  }

  cambiarEstado(){
    this.abrir=!this.abrir
  }

  ngOnInit() {
    let actUser:boolean = sessionStorage.getItem("actUsuario") != null ? Boolean(sessionStorage.getItem("actUsuario")) : false;
    let actAdmin:boolean = sessionStorage.getItem("actAdmin") != null ? Boolean(sessionStorage.getItem("actAdmin")) : false;
    if(actUser){
      this.formularioCrear='Reporte';
      this.redireccion = 'registroreporte';
    }else if(actAdmin){
      this.formularioCrear='Admin'
      this.redireccion = 'registraradmin';
    }
  }

    onSalir(){
    let id:number = Number(sessionStorage.getItem("id"));
    let activoAdmin:boolean = sessionStorage.getItem("actAdmin") != null ? Boolean(sessionStorage.getItem("actAdmin")) : false;
    let activoUsuario:boolean = sessionStorage.getItem("actUsuario") != null ? Boolean(sessionStorage.getItem("actUsuario")) : false;
    let adminUserDto:AdminUserDto = new AdminUserDto(id,undefined, undefined,activoAdmin, activoUsuario, false);
    this.api.actualizarEstado(adminUserDto).subscribe({
      next:(v) => {
        sessionStorage.clear();
        this.route.navigate([""]);
      },
      error:(e) => console.log(e),
      complete:() => console.log("Salio exitosamente")
    })
  }

}
