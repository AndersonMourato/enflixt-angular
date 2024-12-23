import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { IMovieInfo } from '../../models/movie.interface';
import { LimitTextPipe } from "../../pips/limit-text.pipe";

@Component({
  selector: 'app-section-carousel',
  standalone: true,
  imports: [CarouselModule, CommonModule, LimitTextPipe],
  templateUrl: './section-carousel.component.html',
  styleUrl: './section-carousel.component.scss'
})

export class SectionCarouselComponent{

  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;

  isHover: boolean = false;
  itemIndex!: number;

  @Input() itemsSlide: IMovieInfo[] = [];
  @Input() title: string = "";



  onClick(movie: IMovieInfo) {
    console.log(movie)
  }

  setIsHover(index: number) {
    this.itemIndex = index;
    this.isHover ? this.isHover = false : this.isHover = true
  }

}
