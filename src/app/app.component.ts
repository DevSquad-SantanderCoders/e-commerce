import { Component } from '@angular/core';
import { IProduct } from './models/product-data.model';
import { ProductService } from './services/product.service';
import { RenderHeaderService } from './services/render-header.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { StatusLoginService } from './services/status-login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  products?: IProduct[];

  renderCondition: boolean | undefined;

  private subscription: Subscription = new Subscription;

  constructor(private serviceProduct: ProductService, private renderHeaderService: RenderHeaderService, private statusLoginService: StatusLoginService) {
    this.serviceProduct.getProducts().subscribe((res) => {
      this.products = res

      const role = this.statusLoginService.getRole();

      if (role == "ADMIN") {
        this.renderHeaderService.setAdmin();
      } else if (role == "FUNCIONARIO") {
        this.renderHeaderService.setFuncionario();
      }

    })
  }

  ngOnInit() {

    this.subscription = this.renderHeaderService.getVariavel()
      .pipe(
        debounceTime(300), // Evita re-renderizações rápidas
        distinctUntilChanged() // Só reage a mudanças no valor
      ).subscribe((valor: boolean) => {
        this.renderCondition = valor;
      });
  }

}
