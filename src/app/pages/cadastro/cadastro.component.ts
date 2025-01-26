import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { BackgroundImgComponent } from "../../shared/components/background-img/background-img.component";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [BackgroundImgComponent, MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastroForm!: FormGroup;


  constructor(private autenticacaoService: AutenticacaoService, private router: Router){}

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  onCadastrar(){
    this.autenticacaoService.signUpUser(this.cadastroForm.value.email, this.cadastroForm.value.senha)
    .then((userCredential) => {
      const user = userCredential.user;

      this.autenticacaoService.sendVerification(user)
      .then(() => {
        Swal.fire({
          title: "Cadastro realizado.",
          text: "E-mail de verificação enviado.",
          icon: "success"
        });
        this.router.navigateByUrl("home")
      })

    })
    .catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        title: "Inválido",
        text: errorMessage,
        icon: "error"
      });
    });
  }

}
