import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppEntityServices } from '../../app-entity-services';
import { Schedule } from './models/schedule.model';
import { ScheduleComponent } from './schedule/schedule.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulesComponent implements OnInit {
  schedules$: Observable<Schedule[]>;
  displayedColumns: string[] = ['movie.name', 'theater.number', 'date', 'time', 'price'];

  constructor(
    private appEntityServices: AppEntityServices,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.schedules$ = this.appEntityServices.scheduleService.entities$;
    this.appEntityServices.scheduleService.loaded$.pipe(take(1)).subscribe((loaded: boolean) => {
      if (!loaded) {
        this.appEntityServices.scheduleService.getAll();
      }
    });
  }

  public add(): void {
    this.dialog.open(ScheduleComponent);
  }

  public onRowClick(selectedSchedule: Schedule): void {
    this.dialog.open(ScheduleComponent, { data: selectedSchedule });
  }
}