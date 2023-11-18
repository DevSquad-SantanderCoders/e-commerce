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
          return {permission: false, rota: '/login'};  
        }
        
      case '/listarProdutos':
        if (
          usuarioAutenticado.tipo === 'ADMIN' ||
          usuarioAutenticado.tipo === 'FUNCIONARIO'
        ) {
          
          return {permission: true};
        } else {
          
          return {permission: false, rota: '/login'};
        }
        

      case '/login':
        return {permission: false, rota: '/'};
      default:
        return {permission: false, rota: '/'};
    }
  }

  
}
