import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class InfoService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getName(): Observable<string> {
    const url: string = this.baseUrl + '/configuration/name'
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.get<string>(url, requestOptions);

  }

}
