
export class AdminUserDto{
  private _id:number | undefined;
  private _email: string | undefined;
  private _password:string | undefined;
  private _admin: boolean | undefined;
  private _usuario:boolean | undefined;
  private _actividad:boolean | undefined;


  constructor(id?: number, email?: string, password?: string, admin?: boolean, usuario?: boolean,actividad?:boolean) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._admin = admin;
    this._usuario = usuario;
    this._actividad = actividad;
  }


  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get password(): string | undefined {
    return this._password;
  }

  set password(value: string | undefined) {
    this._password = value;
  }

  get admin(): boolean | undefined {
    return this._admin;
  }

  set admin(value: boolean | undefined) {
    this._admin = value;
  }

  get usuario(): boolean | undefined {
    return this._usuario;
  }

  set usuario(value: boolean | undefined) {
    this._usuario = value;
  }

  get actividad(): boolean | undefined {
    return this._actividad;
  }

  set actividad(value: boolean | undefined) {
    this._actividad = value;
  }
}
