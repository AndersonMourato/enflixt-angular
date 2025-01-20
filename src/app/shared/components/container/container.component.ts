import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [ToolbarComponent, RouterOutlet],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

  searchData!: string;

}
