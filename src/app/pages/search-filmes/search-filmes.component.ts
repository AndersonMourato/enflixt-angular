import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { IMovieInfo, IResult } from '../../shared/models/movie.interface';
import { APIService } from '../../core/services/api.service';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@Component({
  selector: 'app-search-filmes',
  standalone: true,
  imports: [CommonModule, MatGridListModule, ToolbarComponent, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './search-filmes.component.html',
  styleUrl: './search-filmes.component.scss'
})
export class SearchFilmesComponent implements OnInit {

  movies: IMovieInfo[] = []
  search: string = ''
  length: number = 0
  pageSize: number = 20
  isLoading!: boolean

  constructor(private serviceAPI: APIService, private dialog: MatDialog) { }

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

  openModal(movie: IMovieInfo) {
    const dialogRef =  this.dialog.open(ModalDialogComponent, {
      data: movie,
      restoreFocus: false,
      height: '90%',
    });
  }

  isLoadingEvent(event: boolean) {
    this.isLoading = event;
  }

}