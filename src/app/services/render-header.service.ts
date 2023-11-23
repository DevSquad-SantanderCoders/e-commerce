import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatusLoginService } from './status-login.service';

@Injectable({
  providedIn: 'root'
})
export class RenderHeaderService {

  private variavelMonitorada = new BehaviorSubject<boolean>(false);

  private funcaoMonitorada = new BehaviorSubject<string>("");

  constructor() {
    
  }

  
  setVariavel(valor: boolean) {
    this.variavelMonitorada.next(valor);
  }

  getVariavel(): Observable<boolean> {
    return this.variavelMonitorada.asObservable();
  }

  setAdmin() {
    this.funcaoMonitorada.next("ADMIN");
  }

  setFuncionario() {
    this.funcaoMonitorada.next("FUNCIONARIO");
  }

  clearRole(){
    this.funcaoMonitorada.next("");
  }

  getRole(): Observable<string> {
    return this.funcaoMonitorada.asObservable();
  }

}
