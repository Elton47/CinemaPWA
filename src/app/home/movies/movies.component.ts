import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { EntityAction, EntityOp } from '@ngrx/data';
import { Observable, Subject, Subscription } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { AppEntityServices } from '../../app-entity-services';
import { Schedule } from '../schedules/models/schedule.model';
import { ScheduleComponent } from '../schedules/schedule/schedule.component';
import { Movie } from './models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private dialogRef: MatDialogRef<ScheduleComponent>;
  movies$: Observable<Movie[]>;

  constructor(
    private appEntityServices: AppEntityServices,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.movies$ = this.appEntityServices.movieService.entities$;
    this.appEntityServices.movieService.loaded$.pipe(take(1)).subscribe((loaded: boolean) => {
      if (!loaded) {
        this.appEntityServices.movieService.getAll();
      }
    });
    this.appEntityServices.scheduleService.entityActions$.pipe( // ScheduleService, we are creating schedules of the selected Movie.
      tap((action: EntityAction<any>) => {
        switch(action.payload.entityOp) {
          case EntityOp.SAVE_ADD_ONE_SUCCESS: this.onAddedSchedule(action.payload.data); return;
        }
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getAvatarUrl = (url: string) => `url(${url})`;

  public watchTrailer = (url: string) => window.open(url, '_blank');

  public scheduleMovie(movie: Movie) {
    this.dialogRef = this.dialog.open(ScheduleComponent, { data: movie });
  }

  private onAddedSchedule(schedule: Schedule): void {
    this.dialogRef.close();
    const snackBarRef = this.snackBar.open(`Schedule for movie "${schedule.movie.name}" was created successfully!`, 'Schedules', { duration: 4000 });
    const snackBarOnActionSubscription: Subscription = snackBarRef.onAction().subscribe(() => {
      this.router.navigateByUrl('/home/schedules');
      snackBarOnActionSubscription.unsubscribe();
    });
  }
}