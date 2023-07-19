import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, EventsResponse } from '../models/Event';

export type OrderBy =
  | 'startTimeAsc'
  | 'startTimeDesc'
  | 'finishTimeAsc'
  | 'finishTimeDesc';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/api/v1/events';

  constructor(private http: HttpClient) {}

  getEvents(
    activePage: number,
    itemsPerPage: number,
    orderBy: OrderBy,
    searchText?: string,
    statuses?: string[],
    sports?: string[]
  ): Observable<EventsResponse> {
    let statusesString = statuses?.length
      ? `status=${statuses?.join(',')}&`
      : '';
    let sportsString = sports?.length ? `sports=${sports?.join(',')}&` : '';
    const url = `${this.apiUrl}?activePage=${activePage}&itemsPerPage=${itemsPerPage}&orderBy=${orderBy}&${statusesString}${sportsString}searchText=${searchText}`;
    console.log(url);
    return this.http.get<EventsResponse>(url);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event, httpOptions);
  }

  updateEvent(event: Event): Observable<Event> {
    const url = `${this.apiUrl}/${event.id}`;
    return this.http.put<Event>(url, event, httpOptions);
  }
}
