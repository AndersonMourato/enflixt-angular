import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, mergeMap } from 'rxjs';
import { APIService } from '../../core/services/api.service';
import { IMovieInfo } from '../../shared/models/movie.interface';


@Component({
  selector: 'app-search-filmes',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './search-filmes.component.html',
  styleUrl: './search-filmes.component.scss'
})
export class SearchFilmesComponent implements OnInit, OnChanges {

  search!: string;
  movies!: IMovieInfo[];

  constructor(private route: ActivatedRoute, private serviceAPI: APIService) { }

  ngOnInit(): void {
    const value = this.route.snapshot.paramMap.get('search');
    this.search = value ? value : '';

    if (this.search) {
      this.serviceAPI.getByDescricao(this.search).pipe(
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
        }
        )).subscribe({
          next: (movies) => {
            this.movies = movies;
          },
          error: (err) => console.error('Erro ao buscar mídias:', err)
        })
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

}