import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [
    GenericTableComponent
  ],
  exports: [
    GenericTableComponent
  ]
})
export class SharedModule { }
