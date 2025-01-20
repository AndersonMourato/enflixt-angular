import { Component } from '@angular/core';
import { ContainerComponent } from "./shared/components/container/container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Enflixt-Angular';
}
