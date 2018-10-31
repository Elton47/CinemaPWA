import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Theater } from '../models/theater.model';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {
  constructor(private http: HttpClient) {}

  public getTheaters = (): Observable<Theater[]> => this.http.get<Theater[]>(`${environment.apiUrl}/theaters?validity=true`);
}
