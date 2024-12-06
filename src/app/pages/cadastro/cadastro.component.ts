import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelsModule } from '../../shared/models/models.module';
import Swal from 'sweetalert2'
import { BackgroundImgComponent } from "../../shared/components/background-img/background-img.component";


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ModelsModule, BackgroundImgComponent],
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
