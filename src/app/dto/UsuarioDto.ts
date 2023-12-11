export class UsuarioDto{

  private _nombre:string;
  private _apellido:string;
  private _email:string;
  private _password:string;


  constructor(nombre: string, apellido: string, email: string, password: string) {
    this._nombre = nombre;
    this._apellido = apellido;
    this._email = email;
    this._password = password;
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
