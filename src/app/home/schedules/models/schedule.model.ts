import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Theater } from '../../theaters/models/theater.model';
import { Movie } from '../../movies/models/movie.model';

export class Schedule {
  id: string;
  theater: Theater;
  movie: Movie;
  date: string;
  time: string;
  price: number;
}

export class ScheduleRequest {
  formGroup: FormGroup = new FormGroup({
    theater: new FormControl('', Validators.required),
    movie: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)])
  });
}