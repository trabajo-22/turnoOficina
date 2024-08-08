


// export interface ModelEmpresa_s {
    
//   total: number;
//   data:  usuarioModel[];
// }



export interface usuarioModel {
  uid: number,
  ucedula: string,
  unombres: string,
  uapellidos: string,
  ucorreo: string,
  ufecha: string,

}




export class usuarioModel {

  constructor(
    public uid: number,
    public ucedula: string,
    public unombres: string,
    public uapellidos: string,
    public ucorreo: string,
    public ufecha: string,

  ) {

    this.uid = uid,
      this.ucedula = ucedula,
      this.unombres = unombres,
      this.uapellidos = uapellidos,
      this.ucorreo = ucorreo,
      this.ufecha = ufecha
  }

}


