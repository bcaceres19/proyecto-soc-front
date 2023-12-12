import { Component } from '@angular/core';
import {FormGroup, FormControl, Validator, Validators} from "@angular/forms";
import {AdminUserCommand} from "../dto/AdminUserCommand";
import {ApiService} from "../api.service";
import {Router} from "@angular/router"
import {ResponseI} from "../dto/ResponseI";
import {plainToClass} from "class-transformer";
import {AdminUserDto} from "../dto/AdminUserDto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup<any> =  new FormGroup(
    {
      email:new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    }
  );

  errorStatus:boolean = false;
  errorMensaje:string = '';
  get email(){
    return this.loginForm.get("email") as FormControl;
  }

  get password(){
    return this.loginForm.get("password") as FormControl;
  }

  constructor(private api:ApiService, private router:Router) {}

  onLogin(formulario:AdminUserCommand){
    this.api.loginByEmail(formulario).subscribe(
      {
        next:(v) => {
          let dataResponse:ResponseI = v;
          let adminUser:AdminUserDto=plainToClass(AdminUserDto, dataResponse.mensaje);
          if(dataResponse.codigo == "200"){
            if(adminUser.admin){
              localStorage.setItem("actAdmin", "true");
            }else if(adminUser.usuario){
              localStorage.setItem("actUsuario", "true");
            }
            localStorage.setItem("id", String(adminUser.id))
            adminUser.actividad=true;
            this.api.actualizarEstado(adminUser).subscribe({
              next:(v) => {
                this.router.navigate(["administrador"]);
              },
              error:(e) => console.log(e),
              complete:() => console.log("Se cambio el estado")
            })
          }else{
            this.errorStatus = true;
            this.errorMensaje = dataResponse.mensaje.toString();
          }
        },
        error:(e)=> console.log(e),
        complete:() => console.log("Se completo")
      }
    );
  }

}
