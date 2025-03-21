import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-carrera',
  standalone: true,
  imports: [],
  templateUrl: './countdown-carrera.component.html',
  styleUrl: './countdown-carrera.component.css',
})

export class CountdownCarreraComponent implements OnInit, OnDestroy {
  countDownDate = new Date('April 27, 2025 09:00:00').getTime();
  constructor() {}
  timer: any;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.timer = setInterval(() => {
      let now = new Date().getTime();
      let interval = this.countDownDate - now;
      let days = Math.floor(interval / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((interval % (1000 * 60)) / 1000);
      this.timer = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    });
  }
  ngOnDestroy() {
    clearInterval(this.timer); // Limpiar el temporizador cuando el componente se destruye
  }
}
