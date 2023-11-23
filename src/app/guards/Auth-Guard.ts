import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { StatusLoginService } from '../services/status-login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  tempoMaximoLogado: number = 60000;

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private statusLoginService: StatusLoginService
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
      
      const usuarioLogado = this.statusLoginService.getStatus();

      if (usuarioLogado.condicao) {
        const permission = this.authorizationService.hasRoutePermission(
          state,
          usuarioLogado.usuario
        );

        if (permission.permission) {
          resolve(true);
          setTimeout(() => {
            this.backToLogin()
          }, this.tempoMaximoLogado);

          this.router.navigate([permission.rota]);
        } else {
          resolve(false);
          this.router.navigate([permission.rota]);
        }

      } else if (state.url === '/login') {
        resolve(true);
      } else {
        resolve(false);
        this.backToLogin();
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
