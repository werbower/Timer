import { Component } from '@angular/core';
import { TimerService, TimerState } from './services/timer/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimerService]
})
export class AppComponent {
  title = 'Timer';

  constructor(public timerService: TimerService) {}

  startStop() {
    this.timerService.startStopCommand();
  }

  pause() {
    this.timerService.pauseCommand();
  }

  reset() {
    this.timerService.resetCommand();
  }

  titleStartStop() {
    if (this.timerService.timerState === TimerState.stop) {
      return 'Start';
    } else if (this.timerService.timerState === TimerState.start) {
      return 'Stop';
    } else {
      return 'Continue';
    }
  }

  isWaitable() {
    return this.timerService.timerState === TimerState.start;
  }

  fTwo(val: number): string {
    return ('00' + val).substr(-2);
  }

  stringDisplay() {
    return this.fTwo(this.timerService.timerEntry.hour)
      + ': ' + this.fTwo(this.timerService.timerEntry.minute)
      + ': ' + this.fTwo(this.timerService.timerEntry.second);
  }

}
