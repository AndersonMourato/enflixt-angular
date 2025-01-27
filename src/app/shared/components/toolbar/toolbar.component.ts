import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { APIService } from '../../../core/services/api.service';
import { TokenService } from '../../../core/services/token.service';
import { IResult } from '../../models/movie.interface';

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
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {

  searchForm!: FormGroup
  @Output() searchMovies = new EventEmitter<{ data: IResult, search: string }>();

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private serviceAPI: APIService
  ) {

  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  onSair() {
    this.tokenService.cleanToken();
    this.router.navigateByUrl("login");
  }

  onSearch() {
    const value: string = this.searchForm.value.search;
    this.serviceAPI.searchByDescricao(value, 1)
    .subscribe((resp: IResult) => {
      this.router.navigate(['filmes'], { state: { data: resp, search: value } });
      this.searchMovies.emit({ data: resp, search: value });
    });
  }

  onHome() {
    this.router.navigateByUrl("home");
  }

}
