import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatSnackBarRef, MAT_DIALOG_DATA, SimpleSnackBar } from '@angular/material';
import { EntityAction, EntityOp } from '@ngrx/data';
import { Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { AppEntityServices } from '../../../app-entity-services';
import { Theater, TheaterRequest } from '../models/theater.model';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TheaterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  editMode = false;
  request: TheaterRequest = new TheaterRequest();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Theater,
    private appEntityServices: AppEntityServices,
    private dialogRef: MatDialogRef<TheaterComponent>,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.request.formGroup.patchValue(this.data);
      this.editMode = true;
    }
    this.appEntityServices.theaterService.entityActions$.pipe(
      tap((action: EntityAction<any>) => {
        switch (action.payload.entityOp) {
          case EntityOp.SAVE_ADD_ONE:
          case EntityOp.SAVE_UPDATE_ONE:
          case EntityOp.SAVE_DELETE_ONE: this.request.formGroup.markAsPending(); return;
          case EntityOp.SAVE_ADD_ONE_SUCCESS: this.close(`Theater number "${(action.payload.data as Partial<Theater>).number}" created successfully!`); return;
          case EntityOp.SAVE_UPDATE_ONE_SUCCESS: this.close('Theater updated successfully!'); return;
          case EntityOp.SAVE_DELETE_ONE_SUCCESS: this.close(`Theater number "${this.data.number}" deleted successfully!`); return;
          case EntityOp.SAVE_ADD_ONE_ERROR:
            this.snackBarRef = this.matSnackBar.open(`Couldn't create the Theater number "${(action.payload.data as Partial<Theater>).number}"! ${action.payload.data.error.error.status !== undefined ? `Error ${action.payload.data.error.error.status}` : ''}`, 'Retry', { duration: 4000 });
            this.snackBarRef.onAction().pipe(take(1)).subscribe(() => this.save());
            this.close();
            return;
          case EntityOp.SAVE_UPDATE_ONE_ERROR:
            this.snackBarRef = this.matSnackBar.open(`Couldn't update the Theater! ${action.payload.data.error.error.status !== undefined ? `Error ${action.payload.data.error.error.status}` : ''}`, 'Retry', { duration: 4000 });
            this.snackBarRef.onAction().pipe(take(1)).subscribe(() => this.save());
            this.close();
            return;
          case EntityOp.SAVE_DELETE_ONE_ERROR:
            this.snackBarRef = this.matSnackBar.open(`Couldn't delete the Theater number "${this.data.number}"! ${action.payload.data.error.error.status !== undefined ? `Error ${action.payload.data.error.error.status}` : ''}`, 'Retry', { duration: 4000 });
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

  public save(): void {
    if (this.editMode) {
      this.appEntityServices.theaterService.update({ id: this.data.id, ...this.request.formGroup.value });
    } else {
      this.appEntityServices.theaterService.add(this.request.formGroup.value);
    }
  }

  public delete(): void {
    this.appEntityServices.theaterService.delete(this.data.id);
  }
}
