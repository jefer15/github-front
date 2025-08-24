import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { GithubUserDetail, GithubUserSearch } from '../../models/github.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<GithubUserSearch> {
    return this.http.get<GithubUserSearch>(`${this.baseUrl}/search/users?q=${encodeURIComponent(query)}`);
  }

  getUser(login: string): Observable<GithubUserDetail> {
    return this.http.get<GithubUserDetail>(`${this.baseUrl}/users/${encodeURIComponent(login)}`);
  }
}
