import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule, DOCUMENT } from '@angular/common';
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

  // data: any = { codigo: 'CR53' };
  datos: any = {};
  area: any = {};
  public areas: any = [];
  areaclick: string = '';
  isModalOpena = false;



  NumTurno: string = '';
  miUrl: string = '';
  

  id: string = '';
  alias: string = '';
  boolUrl = false;
  

  public url: string;
  mostrarali: string = '';
  mostraid: string = '';



  mostrarTurno = false;
  aid: string = '';
  agid: string = '';
  
  listaUsuario: any = {}
  codigoId: any;
  

  constructor(

    private router: Router,
    private route: ActivatedRoute, 
    private userServices: UsuariosService,
    private sanitizer: DomSanitizer,

  ) { this.url = UrlApi.url;}




  
  ngOnInit(): void {

    this.alias = JSON.parse(localStorage.getItem('alias')!);
    this.id = JSON.parse(localStorage.getItem('id')!);


    const usuarioString = localStorage.getItem('usuario');
    this.listaUsuario = usuarioString ? JSON.parse(usuarioString) : null;
console.log('crearuser',this.listaUsuario)
    
    this.listArea()
  


    // console.log('mostrando..', this.alias, this.id)

    // this.route.params.subscribe(params => {
    //   const url = new URL(document.location.href);
      
    //   const urll = url.href;
      
    //   // console.log('URL:', urll)
    //   //  console.log('URLl:', url)

    //   this.id = params['id'];
    //   this.alias = params['alias'];


    //     const a = 'matriz'
    //     const i = '1'
         
    //     const verificando = `${url.origin}/login/${a}/${i}`;
    //     // console.log('vericando', verificando)

    //     if (urll === verificando){
    //       this.boolUrl  = true;
    //       console.log('Bienn....')
    //     } else{ 
    //       this.boolUrl  = false;
    //       console.log('no existe')
    //     }

    // });







  
  
   


    // this.route.queryParams.subscribe(params => {
    //   const datosCodificados = params['datos'];
    //   if (datosCodificados) {
    //     try {
    //       this.datos = JSON.parse(decodeURIComponent(datosCodificados));
    //       // console.log('recibiendo', this.datos)

    //     } catch (error) {
    //       console.error('Error al parsear los datos:', error);
    //     }
    //   }
    // });


  }


  
 

 
  onCardClick(card:any){


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





  

//   getCodigo(): void {
//     this.subscription.add(
//     this.userServices.getCodigo().subscribe(resp => {
//       this.codigoId = resp.data.cid
   
//      console.log('Mi codigo......', this.codigoId)
//     })
//   )
// }



  sanitize(iconPath: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(iconPath);
  }




  // tipoTurno(){
  //   this.router.navigate(['/tipoTurno'])
  // }




  crearRegister() {
    const usuario = {
     tcedula: this.datos.ucedula,
      tnombres : this.datos.unombres,
      tapellidos : this.datos.uapellidos,
      tcorreo : this.datos.ucorreo,
      tturno : 'ffu54'
    };

    console.log(usuario);
    this.userServices.crearTurno(usuario).subscribe(response => {
      // this.message = response.message;
        // console.log('bien',response.data);
        const datosCodificados = encodeURIComponent(JSON.stringify(this.datos));
        console.log(datosCodificados)
        this.router.navigate(['/descripcion'], { queryParams: { datos: datosCodificados } });
      
    });
    
  
  }






  crearUsuario() {
    
    this.subscription.add(
      this.userServices.getCodigo().subscribe(resp => {
        this.codigoId = resp.data.cid
        
        const usuario = {
          tcedula: this.listaUsuario.ucedula,
          tnombres : this.listaUsuario.unombres,
          tapellidos : this.listaUsuario.uapellidos,
          tcorreo : this.listaUsuario.ucorreo,
          ttipoturno : 'Turno Normal',
          idarea: this.aid,
          idagencia: this.agid,
          idcodigo : this.codigoId,
        };
      

        console.log('cre.....', usuario)
     this.userServices.crearTurno(usuario).subscribe(response => {
      if(response.success){
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
          tnombres : this.listaUsuario.unombres,
          tapellidos : this.listaUsuario.uapellidos,
          tcorreo : this.listaUsuario.ucorreo,
          ttipoturno : 'Turno presencial',
          idarea: this.aid,
          idagencia: this.agid,
          idcodigo : this.codigoId,
        };
         this.userServices.crearTurno(usuario).subscribe(response => {
        if(response.success){
          const datosCodificados = encodeURIComponent(JSON.stringify(response.data));
          this.router.navigate(['/descripcion'], { queryParams: { datos: datosCodificados } });
        
        }
    });
    
      })


    )






    // const usuario = {
    //   tcedula: this.listaUsuario.ucedula,
    //    tnombres : this.listaUsuario.unombres,
    //    tapellidos : this.listaUsuario.uapellidos,
    //    tcorreo : this.listaUsuario.ucorreo,
 
    //    tturno : this.NumTurno,
    //    ttipoturno : 'Turno presencial',
    //    idarea: this.aid,
    //    idagencia: this.agid
    //  };
   
    //  this.userServices.crearTurno(usuario).subscribe(response => {
    //   if(response.success){
    //     console.log(response.message)
    //     console.log(response.data)
    //     const datosCodificados = encodeURIComponent(JSON.stringify(response.data));
    //     this.router.navigate(['/descripcion'], { queryParams: { datos: datosCodificados } });
    //   }
    // });
  }









  submit() {
    this.router.navigate(['/descripcion'])
  }




  codigo() {
    const datosCodificados = encodeURIComponent(JSON.stringify(this.datos));
    console.log(datosCodificados)
    this.router.navigate(['/descripcion'], { queryParams: { datos: datosCodificados } });
  }


  



  // mostrar(){
  //   this.mostrarTipoTurno = true;
  //   console.log('mi turnos',this.mostrarTipoTurno= true)

   

  // }

  // atras(){
  //   this.route
  //   this.mostrarTipoTurno = false;
  // }


}
