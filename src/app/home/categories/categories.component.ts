import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppEntityServices } from '../../app-entity-services';
import { CategoryComponent } from './category/category.component';
import { Category } from './models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  displayedColumns: string[] = ['name'];

  constructor(
    private appEntityServices: AppEntityServices,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.categories$ = this.appEntityServices.categoryService.entities$;
    this.appEntityServices.categoryService.loaded$.pipe(take(1)).subscribe((loaded: boolean) => {
      if (!loaded) {
        this.appEntityServices.categoryService.getAll();
      }
    });
  }

  public add(): void {
    this.dialog.open(CategoryComponent);
  }

  public onRowClick(category: Category): void {
    this.dialog.open(CategoryComponent, { data: category });
  }
}