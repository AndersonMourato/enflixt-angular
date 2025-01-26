import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { IMovieInfo } from '../../shared/models/movie.interface';
import { ActivatedRoute, Route } from '@angular/router';
import { map } from 'rxjs';
import { Router } from 'express';


@Component({
  selector: 'app-search-filmes',
  standalone: true,
  imports: [CommonModule, MatGridListModule, ToolbarComponent],
  templateUrl: './search-filmes.component.html',
  styleUrl: './search-filmes.component.scss'
})
export class SearchFilmesComponent implements OnInit {

  movies: IMovieInfo[] = []
  search: string = ''

  constructor() { }

  ngOnInit() {
    this.movies = history.state.data;
    this.search = history.state.search;
  }

  onChildeSearch(event: { data: IMovieInfo[], search: string }) {
    this.movies = event.data;
    this.search = event.search;
  }

}