import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../../services/usuarios.service';
import { UrlApi } from '../../api/url';
import { AgenciaService } from '../../services/agencia.service';
import { AgenciaModel } from '../../models/agencia';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private subscription: Subscription = new Subscription;
  public listData: any = [];
  agencia: any = []
  listaAgencia: AgenciaModel[] = []
  boolUrl = false;

  searchForm: FormGroup;
  isLoading = false;
  isLoadingRegister = false;
  isLoadingcrear = false;

  ucedula: string = '';
  unombres: string = '';
  uapellidos: string = '';
  ucorreo: string = '';


  turno: string = '';
  usuarios: any[] = [];

  // registerForm: FormGroup;
  message: string | null = null;

  success: boolean = false;
  public url: string;
  id: string = '';
  alias: string = '';
  homeUrl: any;






  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private userServices: UsuariosService,
    private route: ActivatedRoute,
    private servicesAgencia: AgenciaService

  ) {
    this.url = UrlApi.url;

    this.searchForm = this.fb.group({
      cedula: ['', [Validators.required]]
    });

  }






  ngOnInit(): void {

    this.listaTotalAgencia()




  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }







  listAgencia(nombre: string, id: string): void {
    this.subscription.add(
      this.servicesAgencia.postAgencias(nombre, id).subscribe(resp => {
        if (resp.success) {
          this.agencia = resp.data;
         
        } else {
          console.log('ERROR', resp)
        }
      })
    )
  }





  async listaTotalAgencia() {
    this.subscription.add(
      this.servicesAgencia.listaAgencia().subscribe(resp => {

        this.listaAgencia = resp.data;
        if (this.listaAgencia.length > 0) {
          this.boolUrl = false;
          for (let i = 0; i < this.listaAgencia.length; i++) {
            this.scanear(this.listaAgencia[i].agid)
          }
          if(this.boolUrl == false){
            alert("no esxte")
          }
        }
      })
    )

  }



  async scanear(idbd: number) {
    this.route.params.subscribe(params => {
      const url = new URL(document.location.href);

      this.id = params['id'];
      this.alias = params['alias'];

      if (this.id != null && this.id != "") {
        if (idbd == +this.id  ) {
          localStorage.setItem('alias', JSON.stringify(this.alias));
          localStorage.setItem('id', JSON.stringify(this.id));
          this.boolUrl = true;
        }
      }
    });
  }







  crearUsuario() {

    if (this.registerValide.invalid) {
      return;
    }

    const { ucedula, unombres, uapellidos, ucorreo } = this.registerValide.value;
    const usuario = {
      ucedula,
      unombres,
      uapellidos,
      ucorreo
    };

    
    


    
    this.userServices.crearUsuari(usuario).subscribe(
      response => {


        if (response.success) {
          const usuarioString = JSON.stringify(usuario);
          localStorage.setItem('usuario', usuarioString);
          console.log('usuariioCrears', usuarioString)

          this.router.navigate(['/home']);
          



         
          // const datosCodificados = encodeURIComponent(JSON.stringify(usuario));
          // console.log('listaaaaaaCooficad', datosCodificados)
          // this.router.navigate(['/home'], { queryParams: { datos: datosCodificados } });
          // this.router.navigate([`${this.homeUrl}`], { queryParams: { datos: datosCodificados } });




        } else {
          this.message = response.message;
        }
      },
      error => {
        if (error.status === 400) {
          this.message = error.error.message; // Mensaje del servidor
        } else {
          this.message = 'Error en el servidor: ' + error.message;
        }
      }
    );


  }




  listar(): void {
    this.subscription.add(
      this.auth.getAll().subscribe(resp => {
        this.listData = resp;
        console.log('mis tados: ', this.listData)

        // console.log('mis tados: ', this.listData)
      })
    )

  }











  // crearUsuario() {

  //   this.registerValide.markAllAsTouched();

  //   if (this.registerValide.invalid) {
  //     return;
  //   }
  //   this.userServices.crearUsuario(this.ucedula, this.unombres, this.uapellidos, this.ucorreo )
  //   .subscribe(
  //     (response) => {
  //       if (response.success) {
  //         console.log(response.message)
  //         this.router.navigate(['/home'])
  //       } else {
  //         console.log(response.message)
  //         console.log('eror front',response.messaje)
  //       }
  //     },

  //   );

  // }





  registerValide = new FormGroup({
    ucedula: new FormControl('', [Validators.required, this.telefonoValidator.bind(this)]),
    unombres: new FormControl('', [Validators.required]),
    uapellidos: new FormControl('', [Validators.required]),
    ucorreo: new FormControl('', [Validators.required, Validators.email]),
  })



  telefonoValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^\d{10}$/.test(value);
    return isValid ? null : { 'invalidTelefono': true };
  }


  loginP() {
    console.log()
  }



  oonLogin(): void {

    if (this.searchForm.valid) {

      this.isLoading = true;
      const cedula = this.searchForm.value.cedula;

      setTimeout(() => {
        this.auth.verificarCedula(cedula).subscribe(
          (response) => {
            this.isLoading = false;
            if (response.success) {
              this.usuarios = response.data;

              const usuarioString = JSON.stringify(this.usuarios);


              localStorage.setItem('usuario', usuarioString);
              this.router.navigate(['/home']);

            } else {
              this.isLoadingRegister = true;
              console.log(response.message);

            }
          },
          (error) => {
            console.log('mi cedula', cedula)
            this.ucedula = cedula;
            this.isLoadingRegister = true;
            this.isLoading = false;
         
          }
        );
      }, 700);
    }
  }




  // onLogin(): void {

  //   if (this.searchForm.valid) {

  //     this.isLoading = true;

  //     setTimeout(() => {

  //       const cedula = this.searchForm.value.cedula;
  //       this.auth.verificarCedula(cedula).subscribe(
  //         (response) => {


  //           if (response.success) {
  //             this.router.navigate(['/home'])
  //             console.log(response.message)
  //           } else {
  //             console.log(response.message)
  //             this.isLoadingRegister = true;
  //             // this.resultado = 'La cédula no existe.';
  //           }
  //           this.isLoading = false;


  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );

  //     }, 900)
  //   }
  // }


  // if (this.searchForm.valid) {
  //     this.isLoading = true;

  //     setTimeout(() => {

  //       const cedula = this.searchForm.get('cedula')?.value;
  //       const isValid = cedula === '12345';

  //       if (isValid) {

  //         this.auth.login()
  //         this.router.navigate(['/home'])

  //       } else {
  //         this.isLoadingRegister = true;
  //       }

  //       this.isLoading = false;

  //     }, 900);


  //   } else {
  //     console.log('Datos no encontrado')
  //   }
  // }


}
