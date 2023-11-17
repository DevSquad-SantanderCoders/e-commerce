import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  usuario: string = ""
  senha: string = ""

  constructor(private authService: AuthService, private router: Router){

  }

  login(){
    this.authService.login(this.usuario, this.senha).subscribe((result)=>{
      if (result){
        this.authService.saveLogin();
        this.router.navigate(['/']);
      }else{
        console.log("Usuario não existe");
        this.router.navigate(['/login']);
      }
    });
  }

}
