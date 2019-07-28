import {Component, OnInit, OnDestroy} from '@angular/core';
import {timer, Subject, interval, Observable, EMPTY} from 'rxjs';
import {switchMap, scan} from 'rxjs/operators';
import {TimeManagerService} from '../shared/services/time-manager.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit, OnDestroy {
  count: number = 0;
  time: any = {};
  executeButton: string;
  pause: boolean = false;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  step: number = 0;

  subject$: Subject<any>;

  constructor(private timeManagerService: TimeManagerService) {
  }

  ngOnInit() {
    this.executeButton = 'Play';
  }

  private startTimer() {
    this.subject$ = new Subject();

    const stream$ = this.subject$.pipe(
      switchMap(resume =>
        resume ?
          interval(1000) :
          EMPTY
      ),
      scan((acc, curr) => (curr ? this.step + curr : acc), this.step)
    );

    stream$.subscribe(count => {
      this.count = count;
      this.time.hours = this.calculateHours(this.count);
      this.time.minutes = this.calculateMinutes(this.count);
      this.time.seconds = this.calculateSeconds(this.count);
    });
  }

  private calculateHours(count: number) {
    return this.calculateTime(Math.floor(count / 60));
  }

  private calculateMinutes(count: number) {
    return this.calculateTime((Math.floor(count / 60)) % 60);
  }

  private calculateSeconds(count: number) {
    return this.calculateTime(count % 60);
  }

  private calculateTime(time: any) {
    return time <= 9 ? '0' + time : time;
  }

  private executeTimer() {
    this.pause = !this.pause;
    this.executeButton = this.pause ? 'Pause' : 'Play';

    if (this.pause) {
      let retrievedTime = localStorage.getItem('currentTime');

      if (!retrievedTime) {
        this.startTimer();
        this.subject$.next(true);
      } else {
        this.time = JSON.parse(retrievedTime);
      }
    } else {
      this.step = this.count;
      this.subject$.next(false);
    }
  }

  private resetTimer() {
    this.timeManagerService.resetTimeList();
    this.time = {};
    localStorage.clear();
  }

  private addCurrentTimeToList() {
    this.timeManagerService.addTimeToTimeList(this.time);
  }

  ngOnDestroy() {
    this.subject$.unsubscribe();
  }

}
