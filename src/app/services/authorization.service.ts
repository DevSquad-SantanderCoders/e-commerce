import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { IUsuario } from '../models/IUsuario';
import { IPermission } from '../models/IPermission';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private router: Router) {}

  hasRoutePermission(state: RouterStateSnapshot, usuarioAutenticado: any): IPermission {
    switch (state.url) {
      case '/add':
        if (usuarioAutenticado.tipo === 'ADMIN') {
          return {permission: true};
        } else {
          return {permission: false, callback: this.backToLogin};  
        }
        
      case '/listarProdutos':
        if (
          usuarioAutenticado.tipo === 'ADMIN' ||
          usuarioAutenticado.tipo === 'FUNCIONARIO'
        ) {
          return {permission: true};
        } else {
          return {permission: false, callback: this.backToLogin};
        }
        

      case '/login':
        return {permission: false, callback: this.goToHome};
      default:
        return {permission: false, callback: this.goToHome};
    }
  }

  backToLogin(){
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
