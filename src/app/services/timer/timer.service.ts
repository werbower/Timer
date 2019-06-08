import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

export class TimerEntry {
  private intHour = 0;
  get hour(): number {
    return this.intHour;
  }
  set hour(val: number) {
    this.intHour = val;
  }
  private intMinute = 0;
  get minute(): number {
    return this.intMinute;
  }
  set minute(val: number) {
    const sVal = this.setVal(val);
    this.intMinute = sVal.r;
    this.hour += sVal.n;
  }
  private intSecond = 0;
  get second(): number {
    return this.intSecond;
  }
  set second(val: number) {
    const sVal = this.setVal(val);
    this.intSecond = sVal.r;
    this.minute += sVal.n;
  }

  setVal(val: number) {
    let r: number;
    let n: number;
    if (val < 60) {
      r = val;
      n = 0;
    } else {
      r = val % 60;
      n = (val - r) / 60;
    }
    return { r, n };
  }
  reset(h = 0, m = 0, s = 0) {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
  }
}

export enum TimerState {
  start = 'started',
  stop = 'stopped',
  wait = 'paused'
}

@Injectable()
export class TimerService implements OnDestroy {
  private timerId = null;
  timerEvent = new Subject<void>();
  private subs: Subscription;
  timerEntry = new TimerEntry();
  private readyForWait = false;

  private intTimerState = TimerState.stop;
  get timerState(): TimerState {
    return this.intTimerState;
  }


  constructor() {
    this.subs = this.timerEvent.subscribe(() => {
      this.timerEntry.second++;
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.setOffTimer();
  }

  setOnTimer() {
    this.timerId = setInterval(() => {
      this.timerEvent.next();
    }, 1000);
  }

  startTimer() {
    if (this.timerState === TimerState.stop) {
      this.timerEntry.reset();
    }
    this.intTimerState = TimerState.start;
    this.setOnTimer();
  }


  setOffTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  stopTimer() {
    this.intTimerState = TimerState.stop;
    this.setOffTimer();
  }

  pauseTimer() {
    this.intTimerState = TimerState.wait;
    this.setOffTimer();
  }

  startStopCommand() {
    switch (this.timerState) {

      case TimerState.start: {
        this.stopTimer();
        break;
      }
      default: {
        this.startTimer();
        break;
      }
    }
  }
  pauseCommand() {
    if (this.timerState === TimerState.start) {
      if (this.readyForWait === false) {
        this.readyForWait = true;
        setTimeout(() => this.readyForWait = false, 300);
      } else {
        this.pauseTimer();
      }
    }
  }
  resetCommand() {
    this.timerEntry.reset();
  }
}
