import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfileList } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  profileList$: Observable<IProfileList[]> = new Observable<IProfileList[]>();
  profileListById$: Observable<IProfileList> = new Observable<IProfileList>();

  getAllProfile() {
    return this.http.get<any>(`${this.apiUrl}profiles`).pipe(
      map((item: any) => {
        return item;
      })
    );
  }

  getProfileById(id: any) {
    return this.http.get<any>(`${this.apiUrl}profiles/${id}`).pipe(
      map((item: any) => {
        return item;
      })
    );
  }

  createProfile(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}profiles`, data);
  }

  updateProfile(id: any, data: any) {
    return this.http.put<any>(`${this.apiUrl}profiles/${id}`, data);
  }

  deleteProfile(id: any) {
    return this.http.delete<any>(`${this.apiUrl}profiles/${id}`);
  }
}
