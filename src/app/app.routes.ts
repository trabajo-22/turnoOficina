import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DescripcionComponent } from './pages/descripcion/descripcion.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch : 'full' },
    // { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'descripcion', component: DescripcionComponent},

    { path: 'login/:alias/:id', component: LoginComponent },

];


