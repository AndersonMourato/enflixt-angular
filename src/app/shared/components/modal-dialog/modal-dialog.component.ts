import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMovieInfo, IProviders } from '../../models/movie.interface';
import { APIService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatDividerModule, MatListModule],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss'
})
export class ModalDialogComponent implements OnInit {

  provedores: IProviders[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public movie: IMovieInfo,
    private apiService: APIService
  ) {}

  ngOnInit(): void {
    this.apiService.getProvidersById(this.movie.id).subscribe((midia) => {
      this.provedores = midia;
    });
  }

}
