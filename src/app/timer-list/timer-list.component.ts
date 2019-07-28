import {Component, OnInit, OnChanges} from '@angular/core';
import {TimeManagerService} from '../shared/services/time-manager.service';
import {Time} from '../shared/interfaces/time.interface';

@Component({
  selector: 'timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss']
})
export class TimerListComponent implements OnInit, OnChanges {
  timeList: Array<Time> = [];

  constructor(private timeManagerService: TimeManagerService) {
  }

  ngOnInit() {
      this.timeList = this.timeManagerService.getTimeList();
  }

  ngOnChanges() {
    let currentTimeList = localStorage.getItem('currentTimeList');

    if (currentTimeList) {
      this.timeList = JSON.parse(currentTimeList);
    }
  }

  private deleteCurrentTimeFromTimeList(currentTime: Time) {
    this.timeManagerService.deleteCurrentTime(currentTime);
  }


}
