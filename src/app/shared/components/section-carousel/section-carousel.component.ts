import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { IMovieInfo } from '../../models/movie.interface';
import { LimitTextPipe } from "../../pips/limit-text.pipe";
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-section-carousel',
  standalone: true,
  imports: [CarouselModule, CommonModule, LimitTextPipe],
  templateUrl: './section-carousel.component.html',
  styleUrl: './section-carousel.component.scss'
})

export class SectionCarouselComponent{
  
  singleSlideOffset = true;
  noWrap = true;
  
  isHover: boolean = false;
  itemIndex!: number;
  
  @Input() title!: string;
  @Input() itemsPerSlide!: number;
  @Input() itemsSlide: IMovieInfo[] = [];
  
  constructor(private dialog: MatDialog) {}
  
  onClick(movie: IMovieInfo) {
   this.openModal(movie);
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


