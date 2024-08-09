import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

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
  // User login
  public userLogin(Username: string, Password: string) {
    const userDetails = { Username, Password };

    return this.http.post(`${this.apiUrl}/login`, userDetails).pipe(
      tap((response: any) => {
        // Handle response and store token
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
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
  public getOneMovie(title: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get(`${this.apiUrl}/movies/${title}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Get director
  public getDirector(name: string) {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${this.apiUrl}/movies/directors/${name}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(catchError(this.handleError));
  }

  // Get genre
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${this.apiUrl}/movies/genres/${name}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(catchError(this.handleError));
  }

  // Get user
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${this.apiUrl}/movies/users/${username}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(catchError(this.handleError));
  }

  // Get favorite movies for a user
  public getFavoriteMovies(username: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get(`${this.apiUrl}/users/${username}/movies`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post(
        `${this.apiUrl}/users/${username}/movies/${movieId}`,
        {},
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  // Edit user
  public editUser(userDetails: any): Observable<any> {
    const token = this.getToken();
    return this.http
      .put(`${this.apiUrl}/users/${userDetails.id}`, userDetails, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(tap(this.extractResponseData), catchError(this.handleError));
  }
  extractResponseData(
    extractResponseData: any
  ): import('rxjs').OperatorFunction<Object, Object> {
    throw new Error('Method not implemented.');
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .delete(`${this.apiUrl}/users/${username}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Delete a movie from favorite movies
  public deleteFavoriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .delete(`${this.apiUrl}/users/${username}/movies/${movieId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Handle API errors
  private handleError(error: any) {
    console.error(error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
