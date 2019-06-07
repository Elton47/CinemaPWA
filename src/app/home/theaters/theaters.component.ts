import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppEntityServices } from '../../app-entity-services';
import { Theater } from './models/theater.model';
import { TheaterComponent } from './theater/theater.component';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TheatersComponent implements OnInit {
  theaters$: Observable<Theater[]>;
  displayedColumns: string[] = ['number', 'floor', 'capacity'];

  constructor(
    private appEntityServices: AppEntityServices,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.theaters$ = this.appEntityServices.theaterService.entities$;
    this.appEntityServices.theaterService.loaded$.pipe(take(1)).subscribe((loaded: boolean) => {
      if (!loaded) {
        this.appEntityServices.theaterService.getAll();
      }
    })
  }

  public add(): void {
    this.dialog.open(TheaterComponent);
  }

  public onRowClick(selectedTheater: Theater): void {
    this.dialog.open(TheaterComponent, { data: selectedTheater });
  }
}