import { Component, HostListener, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { forkJoin, map, mergeMap } from 'rxjs';
import { APIService } from '../../core/services/api.service';
import { SectionCarouselComponent } from '../../shared/components/section-carousel/section-carousel.component';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { IMovieInfo } from '../../shared/models/movie.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent,
    SectionCarouselComponent,
    MatCardModule,
    MatSliderModule,
    CarouselModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  moviesPopular!: IMovieInfo[]
  moviesLancamentos!: IMovieInfo[]

  itemsPerSlide = 3;


  sliders = [
    {
      image: "https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/BR-pt-20241118-TRIFECTA-perspective_f141b4d0-96ff-47bf-ab8a-b84ca6027702_large.jpg",
      title: "Filmes, séries e muito mais, sem limites",
      text: "A partir de R$ 20,90. Cancele quando quiser."
    },
    {
      image: "https://occ-0-2810-3852.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABbgVm7SJ1X-43iSACc9S4yG4fBJlBBWrte8NAH1Kg3_KXQPXEnv-LRj5z3zbEYQzCzMBhJK2WKdYPS0dffkUyXJBS9-ELJ_s5KlW.webp?r=22c",
      title: "Minions2",
      text: "A origem de Gru"
    },
    {
      image: "https://occ-0-2810-3852.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABQQQElVKy2WTRiNOezq_w7ymtkRIvYkNJQzDpjY5OlFMZ6vA3rZiLHZJUfZgWQXr-II3MwJVkDmxRSF0Oo5gkxHmFLiWKHym2TRC.webp?r=eec",
      title: "Outer Banks",
      text: "John B e sua turma vivem aventuras em uma ilha."
    },

  ]

  constructor(private api: APIService) { }

  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateItemsPerSlide();
  }
  
  updateItemsPerSlide() {
    const width = window.innerWidth;
    if (width < 576) {
      this.itemsPerSlide = 1;
    } else if (width >= 576 && width < 768) {
      this.itemsPerSlide = 2;
    } else if (width >= 768 && width < 992) {
      this.itemsPerSlide = 3;
    } else if (width >= 992 && width < 1200) {
      this.itemsPerSlide = 4;
    } else {
      this.itemsPerSlide = 5;
    }
  }

  ngOnInit() {
    this.updateItemsPerSlide()

    this.api.getPopulars()
      .pipe(
        mergeMap((movies: IMovieInfo[]) => {
          const moviesWithMidias$ = movies.map((movie) =>
            this.api.getMidia(movie).pipe(
              map((midia) => ({
                ...movie,
                midia: midia
              }))
            )
          );

          // Combina todos os Observables em um único Observable
          return forkJoin(moviesWithMidias$);
        })
      )
      .subscribe({
        next: (movies) => {
          this.moviesPopular = movies;
        },
        error: (err) => console.error('Erro ao buscar mídias:', err)
      })



      this.api.getLancamentos()
      .pipe(
        mergeMap((movies: IMovieInfo[]) => {
          const moviesWithMidias$ = movies.map((movie) =>
            this.api.getMidia(movie).pipe(
              map((midia) => ({
                ...movie,
                midia: midia
              }))
            )
          );

          // Combina todos os Observables em um único Observable
          return forkJoin(moviesWithMidias$);
        })
      )
      .subscribe({
        next: (movies) => {
          this.moviesLancamentos = movies;
        },
        error: (err) => console.error('Erro ao buscar mídias:', err)
      })

  }

}






