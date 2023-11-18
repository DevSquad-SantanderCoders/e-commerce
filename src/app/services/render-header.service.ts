import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenderHeaderService {

  constructor() { }

  private variavelMonitorada = new BehaviorSubject<boolean>(false);

  private funcaoMonitorada = new BehaviorSubject<string>("");

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
