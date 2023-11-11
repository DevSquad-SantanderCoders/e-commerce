import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products = [
    {
      name: 'mouse',
      description: 'faz cliques',
      code: '123adc',
      price: 500,
      installment: [2, 3, 4, 5],
      urlImg:
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91c2V8ZW58MHx8MHx8fDA%3D',
    },
    {
      name: 'headset',
      description: 'para ouvir',
      code: '548sag',
      price: 600,
      installment: [2, 3, 4],
      urlImg:
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHNldHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      name: 'webcam',
      description: 'para mostrar sua imagem',
      code: '548dte',
      price: 400,
      installment: [2, 3, 4],
      urlImg:
        'https://images.unsplash.com/photo-1623949556303-b0d17d198863?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViY2FtfGVufDB8fDB8fHww',
    },
    {
      name: 'mousepad',
      description: 'para arrastar o mouse',
      code: '544aaa',
      price: 200,
      installment: [2, 3, 4],
      urlImg:
        'https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fG1vdXNlcGFkfGVufDB8fDB8fHww',
    },
    {
      name: 'teclado',
      description: 'para teclar',
      code: '548aef',
      price: 900,
      installment: [2, 3, 4],
      urlImg:
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2xhZG98ZW58MHx8MHx8fDA%3D',
    },
    {
      name: 'controle',
      description: 'para jogar',
      code: '995lka',
      price: 800,
      installment: [2, 3, 4, 5],
      urlImg:
        'https://images.unsplash.com/photo-1580234831315-438a4813685c?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29udHJvbGUlMjBkZSUyMHZpZGVvZ2FtZXxlbnwwfHwwfHx8MA%3D%3D',
    },
  ];
}
