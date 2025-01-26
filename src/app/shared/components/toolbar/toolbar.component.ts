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
import { TokenService } from '../../../core/services/token.service';
import { IMovieInfo } from '../../models/movie.interface';
import { APIService } from '../../../core/services/api.service';
import { forkJoin, map, mergeMap } from 'rxjs';

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
  @Output() searchMovies = new EventEmitter<{ data: IMovieInfo[], search: string }>();

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
    this.serviceAPI.getByDescricao(value).pipe(
      mergeMap((movies: IMovieInfo[]) => {
        const moviesWithMidias$ = movies.map((movie) => {
          return this.serviceAPI.getMidia(movie).pipe(
            map((midia: any) => ({
              ...movie,
              midia: midia
            }))
          );
        });

        // Combina todos os Observables em um único Observable
        return forkJoin(moviesWithMidias$);
      })
    ).subscribe((moviesWithMidias) => {
      this.router.navigate(['filmes'], { state: { data: moviesWithMidias, search: value } });
      this.searchMovies.emit({ data: moviesWithMidias, search: value });
    });
  }

  onHome() {
    this.router.navigateByUrl("home");
  }

}
