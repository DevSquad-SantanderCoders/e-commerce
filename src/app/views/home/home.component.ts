import { Component } from '@angular/core';
import { RenderHeaderService } from 'src/app/services/render-header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private renderHeaderService: RenderHeaderService) {
    this.renderHeaderService.setVariavel(true);
    console.log("entrou")
  }
}
