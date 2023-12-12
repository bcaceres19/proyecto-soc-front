
export class ReportesDto{

  private _fechaCreacion:Date | undefined;

  private _nombreReporte:string | undefined;

  private _contenido:string | undefined;
  private _archivo:string | undefined;

  constructor(fechaCreacion?:Date, nombreReporte?:string, contenido?:string, archivo?: string) {
    this._nombreReporte = nombreReporte;
    this._fechaCreacion = fechaCreacion;
    this._archivo = archivo;
    this._contenido = contenido;
  }


  get contenido(): string | undefined {
    return this._contenido;
  }

  set contenido(value: string | undefined) {
    this._contenido = value;
  }

  get archivo(): string | undefined {
    return this._archivo;
  }

  set archivo(value: string | undefined) {
    this._archivo = value;
  }

  get fechaCreacion(): Date | undefined {
    return this._fechaCreacion;
  }

  set fechaCreacion(value: Date| undefined) {
    this._fechaCreacion = value;
  }

  get nombreReporte(): string | undefined {
    return this._nombreReporte;
  }

  set nombreReporte(value: string | undefined) {
    this._nombreReporte = value;
  }
}
