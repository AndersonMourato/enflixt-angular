import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { APIService } from '../../../core/services/api.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {

  searchForm!: FormGroup
  paramsUrl!: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tokenService: TokenService) {}

  ngOnInit(){
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })

    this.activatedRoute.params.subscribe(params => {
      this.paramsUrl = params['search'];
    })

    if(this.paramsUrl){
      this.searchForm.setValue({
        search: this.paramsUrl
      });
    }
  }

  onSair(){
    this.tokenService.cleanToken();
    this.router.navigateByUrl("login");
  }

  onSearch(){
    const value = this.searchForm.value.search;
    this.router.navigate(['filmes', value]);
  }

  onHome(){
    this.router.navigateByUrl("home");
  }

}
