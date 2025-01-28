import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchFilmesComponent } from './pages/search-filmes/search-filmes.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"login", component: LoginComponent},
    {path:"home", component: HomeComponent, canActivate:[authGuard] },
    {path:"sobre", component: AboutComponent},
    {path:"filmes", component: SearchFilmesComponent, canActivate:[authGuard] },
    {path:"cadastro", component: CadastroComponent},
];
