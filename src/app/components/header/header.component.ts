import { Component } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RenderHeaderService } from 'src/app/services/render-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

   renderizaTextoAdmin: boolean = false;
   renderizaListaDeProdutos: boolean = false;
   renderizaAdicionarProduto: boolean = false;
   renderizaLogin: boolean = true;
  
  private subscription: Subscription = new Subscription;

  constructor(private authService: AuthenticationService, private renderHeaderService: RenderHeaderService){}

  ngOnInit() {
    this.subscription = this.renderHeaderService.getRole()
    .pipe(
      debounceTime(300), // Evita re-renderizações rápidas
      distinctUntilChanged() // Só reage a mudanças no valor
    ).subscribe((role: string) => {
      this.renderizarIcones(role);
    });
  }

  renderizarIcones(role: string): void{
    switch(role){
      case 'ADMIN':
        this.renderizaAdicionarProduto = true;
        this.renderizaListaDeProdutos = true;
        this.renderizaTextoAdmin = true;
        this.renderizaLogin = false;
        break;
      case 'FUNCIONARIO':
        this.renderizaAdicionarProduto = false;
        this.renderizaListaDeProdutos = true;
        this.renderizaTextoAdmin = false;
        this.renderizaLogin = false;
        break;
      default:
        this.renderizaAdicionarProduto = false;
        this.renderizaListaDeProdutos = false;
        this.renderizaTextoAdmin = false;
        this.renderizaLogin = true;
    }
    
  }

  logout(){
    this.authService.logout();
    this.renderHeaderService.clearRole();
  }




}
