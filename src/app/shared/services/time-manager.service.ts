import {Injectable} from '@angular/core';
import {Time} from '../interfaces/time.interface';

@Injectable()
export class TimeManagerService {
  private timeList: Array<Time> = [];

  constructor() {
    if (localStorage.getItem('currentTimeList')) {
      this.timeList = JSON.parse(localStorage.getItem('currentTimeList'));
    }
  }

  public getTimeList(): Array<Time> {
    return this.timeList;
  }

  public addTimeToTimeList(time: Time) {
    if (!(JSON.stringify(this.timeList).includes(JSON.stringify(time)))) {
      let currentTime = JSON.stringify(time);

      this.timeList.push(JSON.parse(currentTime));
      localStorage.setItem('currentTimeList', JSON.stringify(this.timeList));
    }
  }

  public deleteCurrentTime(currentTime: Time) {
    this.timeList.splice(this.timeList.indexOf(currentTime), 1);

    localStorage.setItem('currentTimeList', JSON.stringify(this.timeList));
  }

  public resetTimeList() {
    this.timeList.length = 0;
    localStorage.clear();
  }
}
