import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { IMovieInfo, IResult } from '../../shared/models/movie.interface';
import { APIService } from '../../core/services/api.service';




@Component({
  selector: 'app-search-filmes',
  standalone: true,
  imports: [CommonModule, MatGridListModule, ToolbarComponent, MatPaginatorModule],
  templateUrl: './search-filmes.component.html',
  styleUrl: './search-filmes.component.scss'
})
export class SearchFilmesComponent implements OnInit {

  movies: IMovieInfo[] = []
  search: string = ''
  length: number = 0
  pageSize: number = 20

  constructor(private serviceAPI: APIService) { }

  ngOnInit() {
    if(history.state.data && history.state.data as IResult) {
      this.movies = history.state.data.results;
      this.search = history.state.search;
      this.length = history.state.data.total_results;
    }
  }

  onChildeSearch(state: { data: IResult, search: string }) {
    this.movies = state.data.results;
    this.search = state.search;
    this.length = state.data.total_results;
  }

  onNextPage(event: any) {
    this.serviceAPI.searchByDescricao(this.search, event.pageIndex + 1).subscribe((resp) => {
      this.movies = resp.results;
    })
  }

}