import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../models/periodic-element';

@Injectable({
  providedIn: 'root',
})
export class ElementsService {
  private readonly apiUrl = 'http://localhost:3000/api/elements';

  public constructor(private http: HttpClient) { }

  public getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.apiUrl);
  }

  public addElement(element: PeriodicElement): Observable<PeriodicElement> {
    return this.http.post<PeriodicElement>(this.apiUrl, element);
  }

  public updateElement(id: number, element: PeriodicElement): Observable<PeriodicElement> {
    return this.http.put<PeriodicElement>(`${this.apiUrl}/${id}`, element);
  }

  public deleteElement(id: number): Observable<PeriodicElement> {
    return this.http.delete<PeriodicElement>(`${this.apiUrl}/${id}`);
  }
}

