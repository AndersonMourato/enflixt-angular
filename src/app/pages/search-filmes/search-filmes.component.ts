import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { APIService } from '../../core/services/api.service';
import { mergeMap, map, forkJoin } from 'rxjs';
import { IMovie, IMovieInfo } from '../../shared/models/movie.interface';


@Component({
  selector: 'app-search-filmes',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, MatGridListModule],
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
    if (changes['search'] && changes['search'].currentValue !== this.search) {
      alert('Mudou');
      const search = changes['search'].currentValue;
      if (search && search !== this.search) {
        this.search = search;
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

            return forkJoin(moviesWithMidias$);
          })
        ).subscribe({
          next: (movies) => {
            this.movies = movies;
          },
          error: (err) => console.error('Erro ao buscar mídias:', err)
        });
      }
    }
  }

}