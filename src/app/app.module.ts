import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DeleteProductFormComponent } from './modais/delete-product-form/delete-product-form.component';
import { EditProductFormComponent } from './modais/edit-product-form/edit-product-form.component';
import { HomeComponent } from './views/home/home.component';
import { ListarProdutosComponent } from './views/listarProdutos/listar-produtos.component';
import { LoginComponent } from './views/login/login.component';
import { AddComponent } from './views/add/add.component';
import { AngularMaterialModule } from './Utils/angular-material.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,   
    LoginComponent,
    CarouselComponent,
    HeaderComponent,
    FooterComponent,
    ListarProdutosComponent,
    EditProductFormComponent,
    DeleteProductFormComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,   
    NgbModule,
    HttpClientModule,   
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
