import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { TokenService } from '../../core/services/token.service';
import { BackgroundImgComponent } from "../../shared/components/background-img/background-img.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BackgroundImgComponent, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;


  constructor(
    private autenticacaoService: AutenticacaoService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  onLogin() {
    this.autenticacaoService.signInAcount(this.loginForm.value.email, this.loginForm.value.senha)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken()
          .then((value) => { 
            this.tokenService.setToken(value);
            this.router.navigate(['/home']);
          })
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
