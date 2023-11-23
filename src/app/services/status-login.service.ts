import { Injectable } from '@angular/core';
import { IUsuarioLogado } from '../models/IUsuarioLogado';

@Injectable({
  providedIn: 'root'
})
export class StatusLoginService {

  
  private tempoMaximoLogado: number = 5*60000;

  constructor() { }

  getStatus(): IUsuarioLogado {

    const usuarioAutenticado = JSON.parse(
      localStorage.getItem('USER') || 'null'
    );
    const tempoToken = JSON.parse(
      localStorage.getItem('TIMETOKEN') || 'null'
    );
    const tokenExpirado = new Date().getTime() - tempoToken <= this.tempoMaximoLogado;

    if (usuarioAutenticado && tokenExpirado) {
      return {condicao: true, usuario: usuarioAutenticado}
    } else {
      return {condicao: false}
    }
  }

  getRole(): string {
    const usuarioAutenticado = JSON.parse(
      localStorage.getItem('USER') || 'null'
    );

    if (usuarioAutenticado) {

      return usuarioAutenticado.tipo;

    } else {
      return ""
    }


  }


}
