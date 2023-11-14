import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AddComponent } from './views/add/add.component';
import { LoginComponent } from './views/login/login.component';
import { ListarProdutosComponent } from './views/listarProdutos/listar-produtos.component';
import { AuthGuard } from './guards/Auth-Guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'listarProdutos', component: ListarProdutosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
