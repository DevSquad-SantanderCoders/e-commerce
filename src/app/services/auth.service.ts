import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../environment/environment';
import { RefreshService } from './refresh.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario?: Object;

  constructor(private http: HttpClient,private refreshService: RefreshService) { }

  login(user: string, password: string): Observable<boolean> {

    return this.http.get(environment.URL + '/usuarios').pipe(
      map((listaDeUsuarios: any) => {
        const usuarioExiste = listaDeUsuarios.find((usuario: any) => ((usuario.email == user) && (usuario.senha == password)))

        if (usuarioExiste) {

          this.usuario = usuarioExiste;

          return true
        } else {
          return false
        }

      }),
      catchError((error: any) => {
        // Trate erros aqui, se necessário
        console.error('Erro na requisição:', error);
        return of(false); // Retorna false em caso de erro
      })
    )

  }


  getToken(): any {

    return new Date().getTime()
    
  }

  saveLogin(): boolean{

    const user = JSON.stringify(this.usuario)
    const token = JSON.stringify(this.getToken())
    localStorage.setItem('USER', user )
    localStorage.setItem('TIMETOKEN', token )

    return true
  }

  logout(): void{
    localStorage.removeItem('USER')
    localStorage.removeItem('TIMETOKEN')
    this.refreshService.refresh();
  }

}

