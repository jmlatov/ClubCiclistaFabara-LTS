import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-inscripcion',
  standalone: true,
  imports: [],
  templateUrl: './countdown-inscripcion.component.html',
  styleUrl: './countdown-inscripcion.component.css',
})
export class CountdownInscripcionComponent implements OnInit, OnDestroy {
  countDownDate = new Date('March 14, 2024 23:59:59').getTime();
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
