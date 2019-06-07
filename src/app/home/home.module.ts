import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { HomeRoutingModule } from './home-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { ScheduleComponent } from './schedules/schedule/schedule.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { TheaterComponent } from './theaters/theater/theater.component';
import { TheatersComponent } from './theaters/theaters.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    MoviesComponent,
    SchedulesComponent,
    TheatersComponent,
    TheaterComponent,
    CategoriesComponent,
    CategoryComponent,
    ScheduleComponent
  ],
  entryComponents: [
    ScheduleComponent,
    TheaterComponent,
    CategoryComponent
  ]
})
export class HomeModule { }
