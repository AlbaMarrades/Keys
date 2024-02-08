import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../shared/result';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AssetsService {

  private baseUrl: string = environment.baseUrl + '/assets/'

  constructor(private http: HttpClient) { }

  create(owner: string, origin: string, portfolio: string): Observable<Result> {
    const url: string = this.baseUrl + 'new'
    const requestOptions: Object = {
      owner,
      origin,
      portfolio
    }
    return this.http.post<Result>(url, requestOptions)
  }

  list(searchTerm: string, portfolio: string, owner: string): Observable<Result> {
    const url: string = this.baseUrl + 'list'
    return this.http.post<Result>(url, { searchTerm, portfolio, owner })
  }

  retrieve(UUID: string): Observable<Result> {
    const url: string = this.baseUrl + 'retrieve/' + UUID
    return this.http.get<Result>(url)
  }

  edit(UUID: string, owner: string, origin: string, portfolio: string): Observable<Result> {
    const url: string = this.baseUrl + 'edit'
    const requestOptions: Object = {
      UUID,
      owner,
      origin,
      portfolio
    }
    return this.http.post<Result>(url, requestOptions)
  }

  doFilter(searchTerm: string): Observable<Result> {
    const url: string = this.baseUrl + searchTerm
    return this.http.get<Result>(url)
  }
}
