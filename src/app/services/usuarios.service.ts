import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { UrlApi } from '../api/url';
import { finalize, Observable, tap } from 'rxjs';
import { areaModel } from '../models/area';
import { codigoModel } from '../models/codigo';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  $loading: WritableSignal<boolean> = signal(false);
  public url: string;

  private currentNumber: number = 0;

  constructor(private _http: HttpClient) {
    this.url = UrlApi.url;
  }

  
  getArea(agnombre: string, agid: string): Observable<any> {

    let datos = this.url + `getArea/${agnombre}/${agid}`;
    // console.log('datos',datos)
    return this._http.get<areaModel>(datos)
  }



  getCodigo(): Observable<any> {
    let datos = this.url + 'getCodigo';
    return this._http.get<codigoModel>(datos)
  }


  


















  // getArea(agnombre: string, agid: string): Observable<any> {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.get<any>(`${this.url}getArea/${agnombre}/${agid}`);
  // }




// getArea(): Observable<areaModel> {
//     this.$loading.set(true);
//     let datos = this.url + 'getArea';
//     return this._http.get<areaModel>(datos).pipe(
//       tap(() => this.$loading.set(true)),
//       finalize(() => this.$loading.set(false))
//     );
//   }





  crearTurno(data: any): Observable<any> {
    console.log('listaServicios:', data)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'createTurno', data, { headers: headers });
  }




  crearUsuari(datos: any): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'create', datos, { headers: headers });
  }





















  // crearUsuari(ucedula: string, unombres: string, uapellidos: string, ucorreo: string): Observable<any> {

  //   const datos = {ucedula, unombres, uapellidos, ucorreo}

  //   this.$loading.set(true);

  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   let url = this.url + 'create';
  //   return this._http.post(url, datos, {headers: headers}).pipe(
  //     tap(() => this.$loading.set(true)),
  //     finalize(() => this.$loading.set(false))
  //   );

  // }


  //   crearUsuari(ucedula: string, unombres: string, uapellidos: string, ucorreo: string): Observable<any> {
  //     const datos = {ucedula, unombres, uapellidos, ucorreo}

  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.post(this.url + 'create', datos, {headers});
  // 




  // crearUser(turno: string, nombres: string, apellido: string,  correo: string): Observable<any> {
  //   const datos = {turno, nombres, apellido, correo}
  //   this.$loading.set(true);

  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   let url = this.url + 'createUser';
  //   return this._http.post(url, datos, {headers: headers}).pipe(
  //     tap(() => this.$loading.set(true)),
  //     finalize(() => this.$loading.set(false))
  //   );
  // }






  // crearUsuario(cedula: string, nombre: string, apellido: string,  correo: string): Observable<any> {
  //   const body = {cedula, nombre, apellido, correo}
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.post(this.url + 'create', body, {headers: headers});
  // }




}
