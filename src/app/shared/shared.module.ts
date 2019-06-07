import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatTableModule } from '@angular/material';
import { GenericTableComponent } from './generic-table/generic-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule
  ],
  declarations: [
    GenericTableComponent
  ],
  exports: [
    GenericTableComponent
  ]
})
export class SharedModule { }
