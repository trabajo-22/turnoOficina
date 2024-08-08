import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { UrlApi } from '../api/url';
import { finalize, Observable, tap } from 'rxjs';
import { areaModel } from '../models/area';
import { codigoModel } from '../models/codigo';
import { usuarioModel } from '../models/users';

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




  crearTurno(data: any): Observable<any> {
    console.log('listaServicios:', data)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'createTurno', data, { headers: headers });
  }




  createUsuario(data: usuarioModel): Observable<any> {
    this.$loading.set(true);
    let params = JSON.stringify(data);
    return this._http.post(this.url + 'create', params, {
      headers: {
        "Content-Type": "application/json",
      },
    }).pipe(tap(() => this.$loading.set(true)),
      finalize(() => this.$loading.set(false))
    );
  }


}
