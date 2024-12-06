import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-background-img',
  standalone: true,
  imports: [],
  templateUrl: './background-img.component.html',
  styleUrl: './background-img.component.scss'
})
export class BackgroundImgComponent {

  @Input() path:string = ''
  @Input() author: string = ''

}
