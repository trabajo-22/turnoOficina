import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth.service';
import { UsuariosService } from './services/usuarios.service';
import { AgenciaService } from './services/agencia.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
    AuthService,
    UsuariosService,
    AgenciaService]
})
export class AppComponent {
  title = 'turnos';
  ngOnInit(): void {
    initFlowbite();
  }
}
