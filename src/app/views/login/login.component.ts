import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RenderHeaderService } from 'src/app/services/render-header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private renderHeaderService: RenderHeaderService
  ) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });

    this.renderHeaderService.setVariavel(false);
  }
  userNotFound: boolean = false;

  Login() {
    if (this.login.valid) {
      const usuario = this.login.value.usuario;
      const senha = this.login.value.senha;

      this.authService.login(usuario, senha).subscribe((result) => {
        if (result) {
          const tipo = this.authService.saveLogin();
          if(tipo == 'ADMIN'){
            this.renderHeaderService.setAdmin();
          }else if(tipo == 'FUNCIONARIO'){
            this.renderHeaderService.setFuncionario();
          }
          
          this.router.navigate(['/']);
        } else {
          this.userNotFound = true;
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.inputError()
    }
  }

  inputError():void {
    this.login.get('usuario')?.setErrors({ 'wrongInput': true });
  }

}
