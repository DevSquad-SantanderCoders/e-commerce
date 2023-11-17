import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  Login() {
    if (this.login.valid) {
      const usuario = this.login.value.usuario;
      const senha = this.login.value.senha;

      this.authService.login(usuario, senha).subscribe((result) => {
        if (result) {
          this.authService.saveLogin();
          this.router.navigate(['/']);
        } else {
          this.UserDontExist()
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.inputError()
    }
  }

  UserDontExist(): void {
    this.login.get('usuario')?.setErrors({ 'Usuario não encontrado': true });
  }

  inputError():void {
    this.login.get('usuario')?.setErrors({ 'wrongInput': true });
  }

}
