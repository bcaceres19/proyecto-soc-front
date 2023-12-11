
export class AdminUserDto{
  private _id:number;
  private _email: string;
  private _password:string;
  private _admin: boolean;
  private _usuario:boolean;

  constructor(id: number, email: string, password: string, admin: boolean, usuario: boolean) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._admin = admin;
    this._usuario = usuario;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
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

  get admin(): boolean {
    return this._admin;
  }

  set admin(value: boolean) {
    this._admin = value;
  }

  get usuario(): boolean {
    return this._usuario;
  }

  set usuario(value: boolean) {
    this._usuario = value;
  }
}
