import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../environment/environment';
import { RefreshService } from './refresh.service';
import { IUsuario } from '../models/IUsuario';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usuario?: any;

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


  getToken(): number {

    return new Date().getTime()
    
  }

  saveLogin(): string{

    const user = JSON.stringify(this.usuario)
    const token = JSON.stringify(this.getToken())
    localStorage.setItem('USER', user )
    localStorage.setItem('TIMETOKEN', token )

    return this.usuario.tipo
  }

  logout(): void{
    localStorage.setItem('USER', '')
    localStorage.setItem('TIMETOKEN','')
    this.refreshService.refresh();
  }

}

