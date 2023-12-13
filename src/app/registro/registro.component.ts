import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {UsuarioCommand} from "../dto/UsuarioCommand";
import {plainToClass} from "class-transformer";
import {ResponseI} from "../dto/ResponseI";
import {UsuarioDto} from "../dto/UsuarioDto";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm:FormGroup<any>=new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repetirPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }
  )

  errorStatus: boolean = false;
  errorMensaje:string = '';
  errorPassword: boolean = false;

  get email(){
    return this.registroForm.get('email') as FormControl;
  }

  get nombres(){
    return this.registroForm.get('nombre') as FormControl;
  }

  get apellidos(){
    return this.registroForm.get('apellido') as FormControl;
  }

  get password(){
    return this.registroForm.get('password') as FormControl;
  }

  get repetirPassword(){
    return this.registroForm.get('repetirPassword') as FormControl;
  }


  constructor(private api:ApiService, private router:Router) {}

  onClose(){
    let actAdmin:boolean = localStorage.getItem("actAdmin") != null ? Boolean(localStorage.getItem("actAdmin")) : false;
    if(!actAdmin){
      this.router.navigate([""]);
    }else{
      this.router.navigate(["administrador/inicio"]);
    }
  }

  onRegistro(formulario:UsuarioCommand){
    if(formulario.password != formulario.repetirPassword){
      this.errorPassword = true;
      this.errorMensaje = "Las contraseñas no son iguales"
    }else {
      let actAdmin:boolean = localStorage.getItem("actAdmin") != null ? Boolean(localStorage.getItem("actAdmin")) : false;
      if(!actAdmin){
        this.api.crearUsuario(formulario).subscribe(
          {
            next:(v) => {
              let dataResponse:ResponseI = v;
              if(dataResponse.codigo == '201'){
                this.router.navigate([""]);
              }else{
                this.errorStatus = true;
                this.errorMensaje = dataResponse.mensaje.toString();
              }
            },
            error:(e)=> console.log(e),
            complete:() => console.log("Se copleto el registro")
          }
        )
      }else{
        this.api.crearAdmin(formulario).subscribe(
          {
            next:(v) => {
              let dataResponse:ResponseI = v;
              if(dataResponse.codigo == '201'){
                this.router.navigate(["administrador/inicio"]);
              }else{
                this.errorStatus = true;
                this.errorMensaje = dataResponse.mensaje.toString();
              }
            },
            error:(e)=> console.log(e),
            complete:() => console.log("Se copleto el registro")
          }
        )
      }

    }
  }

}
