import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelsModule } from '../../shared/models/models.module';
import Swal from 'sweetalert2'
import { TokenService } from '../../core/services/token.service';
import { BackgroundImgComponent } from "../../shared/components/background-img/background-img.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ModelsModule, BackgroundImgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;


  constructor(
    private autenticacaoService: AutenticacaoService, 
    private tokenService: TokenService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  onLogin(){
    this.autenticacaoService.signInAcount(this.loginForm.value.email, this.loginForm.value.senha)
    .then((userCredential) => {
      const user = userCredential.user;
      user.getIdToken()
      .then((value)=> {
        this.tokenService.setToken(value)
      })
      this.router.navigate(['/home']);
    })
    .catch((error) => {
      Swal.fire({
        title: "Inválido",
        text: "Certifique-se a senha ou e-mail está correto.",
        icon: "error"
      });
    });
  }
}
