import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card'
import { MatSliderModule } from '@angular/material/slider'
import { CarouselModule } from 'ngx-bootstrap/carousel'
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatCardModule,
    MatSliderModule,
    CarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  sliders = [
  {
    image: "https://assets.nflxext.com/ffe/siteui/vlv3/dadb130d-463b-4e5b-b335-038ed912059e/web_tall_panel/BR-pt-20241118-TRIFECTA-perspective_f141b4d0-96ff-47bf-ab8a-b84ca6027702_large.jpg",
    title: "Filmes, séries e muito mais, sem limites",
    text: "A partir de R$ 20,90. Cancele quando quiser."
  },
  {
    image: "https://occ-0-2810-3852.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABbgVm7SJ1X-43iSACc9S4yG4fBJlBBWrte8NAH1Kg3_KXQPXEnv-LRj5z3zbEYQzCzMBhJK2WKdYPS0dffkUyXJBS9-ELJ_s5KlW.webp?r=22c",
    title: "Minions2",
    text: "A origem de Gru"
  },
  {
    image: "https://occ-0-2810-3852.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABQQQElVKy2WTRiNOezq_w7ymtkRIvYkNJQzDpjY5OlFMZ6vA3rZiLHZJUfZgWQXr-II3MwJVkDmxRSF0Oo5gkxHmFLiWKHym2TRC.webp?r=eec",
    title: "Outer Banks",
    text: "John B e sua turma vivem aventuras em uma ilha."
  },

]

ngOnInit() {
}

activeSlider(ev: Event){
  console.log(ev)
}

}
