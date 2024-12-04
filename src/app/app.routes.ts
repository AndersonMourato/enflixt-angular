import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"login", component: LoginComponent},
    {path:"home", component: HomeComponent, canActivate:[authGuard] },
    {path:"cadastro", component: CadastroComponent},
];
