export class UsuarioDto{

  private _nombre:string;
  private _apellido:string;
  private _email:string;
  private _password:string;
  private _actividad:boolean


  constructor(nombre: string, apellido: string, email: string, password: string, actividad:boolean) {
    this._nombre = nombre;
    this._apellido = apellido;
    this._email = email;
    this._password = password;
    this._actividad = actividad
  }


  get actividad(): boolean {
    return this._actividad;
  }

  set actividad(value: boolean) {
    this._actividad = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get apellido(): string {
    return this._apellido;
  }

  set apellido(value: string) {
    this._apellido = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
