import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatSnackBarRef, MAT_DIALOG_DATA, SimpleSnackBar } from '@angular/material';
import { EntityAction, EntityOp } from '@ngrx/data';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { AppEntityServices } from '../../../app-entity-services';
import { Movie } from '../../movies/models/movie.model';
import { Theater } from '../../theaters/models/theater.model';
import { Schedule, ScheduleRequest } from '../models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  today = new Date();
  preselectedMovie: Movie;
  editMode = false;
  request: ScheduleRequest = new ScheduleRequest();
  theaters$: Observable<Theater[]>;
  movies$: Observable<Movie[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Schedule | Movie,
    private appEntityServices: AppEntityServices,
    private dialogRef: MatDialogRef<ScheduleComponent>,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTheaters();
    this.buildForm();
    this.appEntityServices.scheduleService.entityActions$.pipe(
      tap((action: EntityAction<any>) => {
        switch (action.payload.entityOp) {
          case EntityOp.SAVE_ADD_ONE:
          case EntityOp.SAVE_UPDATE_ONE:
          case EntityOp.SAVE_DELETE_ONE: this.request.formGroup.markAsPending(); return;
          case EntityOp.SAVE_ADD_ONE_SUCCESS: this.close(`Schedule for Movie "${(action.payload.data as Partial<Schedule>).movie.name}" created successfully!`); return;
          case EntityOp.SAVE_UPDATE_ONE_SUCCESS: this.close('Schedule updated successfully!'); return;
          case EntityOp.SAVE_DELETE_ONE_SUCCESS: this.close(`Schedule of Movie "${(this.data as Schedule).movie.name}" deleted successfully!`); return;
          case EntityOp.SAVE_ADD_ONE_ERROR:
            this.snackBarRef = this.matSnackBar.open(`Couldn't create the Schedule for Movie "${(action.payload.data as Partial<Schedule>).movie.name}"! ${action.payload.data.error.error.status !== undefined ? `Error ${action.payload.data.error.error.status}` : ''}`, 'Retry', { duration: 4000 });
            this.snackBarRef.onAction().pipe(take(1)).subscribe(() => this.save());
            this.close();
            return;
          case EntityOp.SAVE_UPDATE_ONE_ERROR:
            this.snackBarRef = this.matSnackBar.open(`Couldn't update the Schedule! ${action.payload.data.error.error.status !== undefined ? `Error ${action.payload.data.error.error.status}` : ''}`, 'Retry', { duration: 4000 });
            this.snackBarRef.onAction().pipe(take(1)).subscribe(() => this.save());
            this.close();
            return;
          case EntityOp.SAVE_DELETE_ONE_ERROR:
            this.snackBarRef = this.matSnackBar.open(`Couldn't delete the Schedule of Movie "${(this.data as Schedule).movie.name}"! ${action.payload.data.error.error.status !== undefined ? `Error ${action.payload.data.error.error.status}` : ''}`, 'Retry', { duration: 4000 });
            this.snackBarRef.onAction().pipe(take(1)).subscribe(() => this.delete());
            return;
          default: this.close(); return;
        }
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
    if (this.request.formGroup.pending) {
      this.matSnackBar.open('Cancelled', null, { duration: 4000 });
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private close(message?: string): void {
    if (message) {
      this.matSnackBar.open(message, null, { duration: 4000 });
    }
    if (this.request.formGroup.pending) {
      this.request.formGroup.updateValueAndValidity();
    }
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.request.formGroup.get('date').setValue(`${this.today.getFullYear()}-${this.today.getMonth() + 1 < 10 ? '0' + (this.today.getMonth() + 1) : this.today.getMonth() + 1}-${this.today.getDate() < 10 ? '0' + this.today.getDate() : this.today.getDate()}`);
    this.request.formGroup.get('time').setValue(`${this.today.getHours() < 10 ? '0' + this.today.getHours() : this.today.getHours()}:${this.today.getMinutes() < 10 ? '0' + this.today.getMinutes() : this.today.getMinutes()}`);
    if (this.data) {
      if ((this.data as Schedule).theater) {
        this.request.formGroup.patchValue(this.data);
        this.editMode = true;
        this.loadMovies();
      } else if ((this.data as Movie).name) {
        this.preselectedMovie = this.data as Movie;
        this.request.formGroup.get('movie').setValue(this.preselectedMovie);
      }
    } else {
      this.loadMovies();
    }
  }

  private loadMovies(): void {
    this.movies$ = this.appEntityServices.movieService.entities$;
    this.appEntityServices.movieService.loaded$.pipe(take(1)).subscribe((loaded: boolean) => {
      if (!loaded) {
        this.appEntityServices.movieService.getAll();
      }
    });
  }

  private loadTheaters(): void {
    this.theaters$ = this.appEntityServices.theaterService.entities$;
    this.appEntityServices.theaterService.loaded$.pipe(take(1)).subscribe((loaded: boolean) => {
      if (!loaded) {
        this.appEntityServices.theaterService.getAll();
      }
    });
  }

  public save(): void {
    const date = new Date(this.request.formGroup.get('date').value);
    this.request.formGroup.get('date').setValue(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
    if (this.editMode) {
      this.appEntityServices.scheduleService.update({ id: this.data.id, ...this.request.formGroup.value });
    } else {
      this.appEntityServices.scheduleService.add(this.request.formGroup.value);
    }
  }

  public delete(): void {
    this.appEntityServices.scheduleService.delete(this.data.id);
  }

  public dropdownCompareFn = (obj1: any, obj2: any): boolean => obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
}