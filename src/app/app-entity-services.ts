import { Injectable } from '@angular/core';
import { EntityCollectionService, EntityCollectionServiceFactory, EntityServicesBase, EntityServicesElements } from '@ngrx/data';
import { Category } from './home/categories/models/category.model';
import { Movie } from './home/movies/models/movie.model';
import { Schedule } from './home/schedules/models/schedule.model';
import { Theater } from './home/theaters/models/theater.model';

@Injectable()
export class AppEntityServices extends EntityServicesBase {
  public categoryService: EntityCollectionService<Category>;
  public movieService: EntityCollectionService<Movie>;
  public scheduleService: EntityCollectionService<Schedule>;
  public theaterService: EntityCollectionService<Theater>;

  constructor(
    public readonly entityServiceFactory: EntityCollectionServiceFactory,
    public readonly entityElements: EntityServicesElements
  ) {
    super(entityElements);
    this.categoryService = entityServiceFactory.create<Category>('Category');
    this.movieService = entityServiceFactory.create<Movie>('Movie');
    this.scheduleService = entityServiceFactory.create<Schedule>('Schedule');
    this.theaterService = entityServiceFactory.create<Theater>('Theater');
    this.registerEntityCollectionServices([
      this.categoryService,
      this.movieService,
      this.scheduleService,
      this.theaterService
    ]);
  }
}