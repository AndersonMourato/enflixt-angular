import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { IMovieInfo } from '../../models/movie.interface';
import { LimitTextPipe } from "../../pips/limit-text.pipe";
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@Component({
  selector: 'app-section-carousel',
  standalone: true,
  imports: [CarouselModule, CommonModule, LimitTextPipe, MatProgressSpinnerModule],
  templateUrl: './section-carousel.component.html',
  styleUrl: './section-carousel.component.scss'
})

export class SectionCarouselComponent {
  
  singleSlideOffset = true;
  noWrap = true;
  
  isHover: boolean = false;
  itemIndex!: number;
  
  @Input() title!: string;
  @Input() itemsPerSlide!: number;
  @Input() itemsSlide: IMovieInfo[] = [];
  @Input() isLoading: boolean;
  
  constructor(private dialog: MatDialog) {
    this.isLoading = true;
  }

  setIsHover(index: number) {
    this.itemIndex = index;
    this.isHover ? this.isHover = false : this.isHover = true
  }
  
  openModal(movie: IMovieInfo) {
    const dialogRef =  this.dialog.open(ModalDialogComponent, {
      data: movie,
      restoreFocus: false,
      height: '90%',
    });
  }
  
}


