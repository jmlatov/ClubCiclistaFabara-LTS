import { Component } from '@angular/core';

@Component({
  selector: 'app-countdown-carrera',
  standalone: true,
  imports: [],
  templateUrl: './countdown-carrera.component.html',
  styleUrl: './countdown-carrera.component.css',
})
export class CountdownCarreraComponent {
  ngOnInit() {}
  countDownDate = new Date('March 17, 2024 09:00:00').getTime();
  constructor() {}
  timer: any;
  x = setInterval(() => {
    let now = new Date().getTime();
    let interval = this.countDownDate - now;
    let days = Math.floor(interval / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((interval % (1000 * 60)) / 1000);
    if(days == 0 && hours == 0 && minutes == 0 && seconds == 0){
      this.timer ='Hoy es el dia, ¡Vamos!';
    }else{
      this.timer ='Faltan: '+ days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
  });
}
