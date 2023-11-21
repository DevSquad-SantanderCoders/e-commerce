import { Component, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  images = [
    {
      id: 0,
      src: '../../../assets/teste-1.jpg',
      title: 'Potencialize sua experiência',
      subtitle: 'Encontre os melhores periféricos para o seu setup.',
    },
    {
      id: 1,
      src: '../../../assets/teste-2.jpg',
      title: 'Explore a próxima geração de periféricos',
      subtitle: 'Qualidade e desempenho em um só lugar.',
    },
    {
      id: 2,
      src: '../../../assets/teste-3.avif',
      title: 'Faça cada clique contar ',
      subtitle:
        'Descubra nossos periféricos ergonomicamente projetados para longas sessões de uso.',
    },
  ];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
