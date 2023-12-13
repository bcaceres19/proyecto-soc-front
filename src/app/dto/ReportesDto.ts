
export class ReportesDto{

  private _codigoReporte:string | undefined;

  private _fechaCreacion:Date | undefined;

  private _nombreReporte:string | undefined;

  private _contenido:string | undefined;
  private _archivo:string | undefined;

  private _tituloReporte:string | undefined;

  private _cuerpoGeneral:string | undefined;

  constructor(fechaCreacion?:Date, nombreReporte?:string, contenido?:string, archivo?: string, codigo?:string, tituloReporte?:string, cuerpoGeneral?:string) {
    this._nombreReporte = nombreReporte;
    this._fechaCreacion = fechaCreacion;
    this._archivo = archivo;
    this._contenido = contenido;
    this._codigoReporte = codigo;
    this._tituloReporte = tituloReporte;
    this._cuerpoGeneral = cuerpoGeneral;
  }


  get tituloReporte(): string | undefined {
    return this._tituloReporte;
  }

  set tituloReporte(value: string | undefined) {
    this._tituloReporte = value;
  }

  get cuerpoGeneral(): string | undefined {
    return this._cuerpoGeneral;
  }

  set cuerpoGeneral(value: string | undefined) {
    this._cuerpoGeneral = value;
  }

  get codigoReporte(): string | undefined {
    return this._codigoReporte;
  }

  set codigoReporte(value: string | undefined) {
    this._codigoReporte = value;
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
