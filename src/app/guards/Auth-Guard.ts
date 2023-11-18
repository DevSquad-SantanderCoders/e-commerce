import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      const usuarioAutenticado = JSON.parse(
        localStorage.getItem('USER') || 'null'
      );
      const tempoToken = JSON.parse(
        localStorage.getItem('TIMETOKEN') || 'null'
      );
      const tokenExpirado = new Date().getTime() - tempoToken <= 200000;

      if (usuarioAutenticado && tokenExpirado) {
        const permission = this.authorizationService.hasRoutePermission(
          state,
          usuarioAutenticado
        );
        resolve(permission.permission);

        this.router.navigate([permission.rota]);

      } else {
        if (state.url === '/login') {
          resolve(true);
        } else {
          resolve(false);
          this.backToLogin();
        }
      }
    });
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
