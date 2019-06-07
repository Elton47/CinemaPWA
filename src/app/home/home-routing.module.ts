import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { MoviesComponent } from './movies/movies.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { TheatersComponent } from './theaters/theaters.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'movies'
      },
      {
        path: 'movies',
        component: MoviesComponent,
        data: { icon: 'movie' }
      },
      {
        path: 'schedules',
        component: SchedulesComponent,
        data: { icon: 'schedule' }
      },
      {
        path: 'theaters',
        component: TheatersComponent,
        data: { icon: 'meeting_room' }
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        data: { icon: 'category' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

export const homeRoutes = routes[0].children.filter(route => route.path);
