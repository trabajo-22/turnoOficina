import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { every, filter, Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UrlApi } from '../../api/url';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  private subscription: Subscription = new Subscription;

  public areas: any = [];

  id: string = '';
  alias: string = '';


  public url: string;




  mostrarTurno = false;
  aid: string = '';
  agid: string = '';

  listaUsuario: any = {}
  codigoId: any;

  constructor(
    private location: Location,
    private router: Router,
    private userServices: UsuariosService,
    private sanitizer: DomSanitizer,


  ) { this.url = UrlApi.url; }



  back(): void {
    this.location.back();
  }


  ngOnInit(): void {
    this.alias = JSON.parse(localStorage.getItem('alias')!);
    this.id = JSON.parse(localStorage.getItem('id')!);
    const usuarioString = localStorage.getItem('usuario');
    this.listaUsuario = usuarioString ? JSON.parse(usuarioString) : null;
    this.listArea()
  }



  onCardClick(card: any) {
    this.aid = card.aid.toString()
    this.agid = card.agid.toString()
    console.log('IDAREA', this.aid)
    console.log('IDagencia', this.agid)
    this.mostrarTurno = true;
  }



  listArea(): void {
    this.subscription.add(
      this.userServices.getArea(this.alias, this.id).subscribe(resp => {
        this.areas = resp
        // this.mostrarTipoTurno = true;
        console.log('Lista AREAA', this.areas.data)
      })
    )
  }



  sanitize(iconPath: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(iconPath);
  }









  crearUsuario() {
    this.subscription.add(
      this.userServices.getCodigo().subscribe(resp => {
        this.codigoId = resp.data.cid
        const usuario = {
          tcedula: this.listaUsuario.ucedula,
          tnombres: this.listaUsuario.unombres,
          tapellidos: this.listaUsuario.uapellidos,
          tcorreo: this.listaUsuario.ucorreo,
          ttipoturno: 'Turno Normal',
          idarea: this.aid,
          idagencia: this.agid,
          idcodigo: this.codigoId,
        };

        this.userServices.crearTurno(usuario).subscribe(response => {
          if (response.success) {
            const datosCodificados = encodeURIComponent(JSON.stringify(response.data));
            this.router.navigate(['/descripcion'], { queryParams: { datos: datosCodificados } });

          }
        });

      })
    )




  }




  createTPrecencial() {
    this.subscription.add(
      this.userServices.getCodigo().subscribe(resp => {
        this.codigoId = resp.data.cid
        const usuario = {
          tcedula: this.listaUsuario.ucedula,
          tnombres: this.listaUsuario.unombres,
          tapellidos: this.listaUsuario.uapellidos,
          tcorreo: this.listaUsuario.ucorreo,
          ttipoturno: 'Turno presencial',
          idarea: this.aid,
          idagencia: this.agid,
          idcodigo: this.codigoId,
        };
        this.userServices.crearTurno(usuario).subscribe(response => {
          if (response.success) {
            const datosCodificados = encodeURIComponent(JSON.stringify(response.data));
            this.router.navigate(['/descripcion'], { queryParams: { datos: datosCodificados } });

          }
        });
      })
    )



  }

}
