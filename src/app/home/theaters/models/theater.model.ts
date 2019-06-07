import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Theater {
  id: string;
  number: number;
  floor: number;
  capacity: number;
}

export class TheaterRequest {
  formGroup: FormGroup = new FormGroup({
    number: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required)
  });
}