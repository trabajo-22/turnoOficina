import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlApi } from '../api/url';
import { usuarioModel } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   public url: string;
  private storage = localStorage;
  
  constructor(private _http: HttpClient)  { 
    this.url = UrlApi.url;
  }


  verificarCedula(cedula: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.url + 'getlogin/' + cedula, {headers});


    
    // return this._http.post(`${this.url}/getlogin`, { cedula }, { headers });
  }






  getAll(): Observable<usuarioModel> {
    let datos = this.url + 'getlogin';
    return this._http.get<usuarioModel>(datos)
  }


  
  login(){

    localStorage.setItem('token', 'dfj344343kefer343434343c');
    // localStorage.setItem('userData', JSON.stringify({ nombre: 'Richard Saldarriaga', email: 'juan@example.com' }));

  }
  

  crear(lista: any): any {
     console.log('mis datos:', lista)
    localStorage.setItem('userData', JSON.stringify({ cedula:lista.ucedula, nombre: lista.unombres, apellido: lista.uapellidos, email: lista.ucorreo }));
  }


 
 


  getUserData(): any {
    const userData = this.storage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

}
