import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Replace 'your_api_url' with the actual URL of your API
  apiUrl = 'https://myflix-app-s99e.onrender.com';

  constructor(private http: HttpClient) {}

  // Get token from local storage
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any) {
    return this.http.post(`${this.apiUrl}/login`, userDetails).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      }),
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get(`${this.apiUrl}/movies`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Get one movie
  public getOneMovie(title: string) {
    return this.http
      .get(`${this.apiUrl}/movies/${title}`)
      .pipe(catchError(this.handleError));
  }

  // Get director
  public getDirector(name: string) {
    return this.http
      .get(`${this.apiUrl}/directors/${name}`)
      .pipe(catchError(this.handleError));
  }

  // Get genre
  public getGenre(name: string) {
    return this.http
      .get(`${this.apiUrl}/genres/${name}`)
      .pipe(catchError(this.handleError));
  }

  // Get user
  public getUser(username: string) {
    return this.http
      .get(`${this.apiUrl}/users/${username}`)
      .pipe(catchError(this.handleError));
  }

  // Get favorite movies for a user
  public getFavoriteMovies(username: string) {
    return this.http
      .get(`${this.apiUrl}/users/${username}/movies`)
      .pipe(catchError(this.handleError));
  }

  // Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string) {
    return this.http
      .post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Edit user
  public editUser(username: string, userDetails: any) {
    return this.http
      .put(`${this.apiUrl}/users/${username}`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // Delete user
  public deleteUser(username: string) {
    return this.http
      .delete(`${this.apiUrl}/users/${username}`)
      .pipe(catchError(this.handleError));
  }

  // Delete a movie from favorite movies
  public deleteFavoriteMovie(username: string, movieId: string) {
    return this.http
      .delete(`${this.apiUrl}/users/${username}/movies/${movieId}`)
      .pipe(catchError(this.handleError));
  }

  // Handle API errors
  private handleError(error: any) {
    console.error(error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
