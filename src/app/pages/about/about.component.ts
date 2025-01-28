import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ToolbarComponent, FooterComponent, MatDividerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
