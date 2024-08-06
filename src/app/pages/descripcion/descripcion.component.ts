import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import moment from 'moment';
@Component({
  selector: 'app-descripcion',
  standalone: true,
  imports: [],
  templateUrl: './descripcion.component.html',
  
  styleUrl: './descripcion.component.css'
})
export class DescripcionComponent {
  datos: any = {};
  userData: any = null;

  constructor( private route: ActivatedRoute, private services: AuthService, private router: Router ){}

  ngOnInit(): void {

    // this.userData = this.services.getUserData();  

    this.route.queryParams.subscribe(params => {
      const datosCodificados = params['datos'];
      if (datosCodificados) {
        try {
          this.datos = JSON.parse(decodeURIComponent(datosCodificados));
          console.log('miii',this.datos.tcedula)
        } catch (error) {
          console.error('Error al parsear los datos:', error);
        }
      }
    });
    this.openModal()
  }

  goBack() {
    this.router.navigate(['../']);
    }


  formatDate(dateString: string): string {
    return moment(dateString).format('YYYY-MM-DD');
  }

  openModal() {
    const modal = document.getElementById('popup-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal && overlay) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      overlay.classList.add('show');
    }
  }

  closeModal() {
    const modal = document.getElementById('popup-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal && overlay) {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      overlay.classList.remove('show');
    }
  }

}
