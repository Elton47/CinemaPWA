import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Category {
  id: string;
  name: string;
}

export class CategoryRequest {
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
}