import { Component } from '@angular/core';

@Component({
  selector: 'app-multicontainer',
  templateUrl: './multicontainer.component.html',
  styleUrls: ['./multicontainer.component.scss'],
})
export class MulticontainerComponent {
  containers = [
    {
      title: 'GAMER',
      description: 'O PC PERFEITO PARA JOGAR',
      icon: '../../assets/icons-controle.png',
    },
    {
      title: 'WORK STATION',
      description: 'PARA MODELAGEM E RENDERIZAÇÃO',
      icon: '../../assets/icons-computador.png',
    },
    {
      title: 'HOME',
      description: 'PARA CASA OU ESCRITÓRIO',
      icon: '../../assets/icons-home-office.png',
    },
    {
      title: 'CONFIG',
      description: 'DO SEU JEITO',
      icon: '../../assets/icons-configurações.png',
    },
  ];
}
