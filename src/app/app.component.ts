import { Component } from '@angular/core';
import {interval, Observable, timer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  timer: number = 0;
  timerString: string = "00 : 00 : 00";
  interval: Observable<any>;
  subscribe: any;
  clicksOnWaitBtn: number = 0;

  startTimer() {
    if (this.timer < 1) {
      this.timer = 1;
    }
    let timerOld = this.timer;
    if (this.subscribe?.closed || !this.subscribe) {
      this.interval = interval(1000);
      this.subscribe = this.interval.subscribe(
          ( val ) => {
            this.timer = timerOld + val;
            let hours = Math.floor(this.timer / 3600);
            let minutes = Math.floor((this.timer % 3600)/60);
            let seconds = Math.floor(this.timer % 60);
            this.timerString  = hours.toString().padStart( 2, "0") + ' : ' + minutes.toString().padStart( 2, "0") + ' : ' + seconds.toString().padStart( 2, "0");
          }
      );
    }
  }

  pauseTimer() {
    if (!this.subscribe?.closed) {
      this.subscribe.unsubscribe();
      this.timer++;
    }
  }

  stopTimer() {
    this.pauseTimer();
    this.timer = 1;
    this.timerString = "00 : 00 : 00";
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer();
  }

  waitTimer() {
    this.clicksOnWaitBtn++;
    let timerVar = timer(300).subscribe(() => {
      this.clicksOnWaitBtn = 0;
      timerVar.unsubscribe();
    });
    if (this.clicksOnWaitBtn > 1) {
      this.pauseTimer();
    }
  }
}
