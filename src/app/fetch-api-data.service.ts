import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap, take } from 'rxjs';

// API URL for fetching data
const apiUrl = 'https://art-cine-be3340ead7b8.herokuapp.com/';

/**
 * Service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Constructs the FetchApiDataService.
   * @param http - The HttpClient module for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Sends user registration data to the backend.
   * @param userDetails - User registration details.
   * @returns An observable of the registration result.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends user login data to the backend.
   * @param userDetails - User login details.
   * @returns An observable of the login result.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all movies from the database.
   * @returns An observable of the movies data.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /** Non-typed response extraction */
  private extractResponseData(res: object): any {
    const body = res;
    return body || {};
  }

  /**
   * Retrieves data for a single movie by its title.
   * @param title - The title of the movie to retrieve.
   * @returns An observable of the movie data.
   */
  getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves data for a director by name.
   * @param name - The name of the director.
   * @returns An observable of the director data.
   */
  getDirector(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves data for a genre by name.
   * @param genreName - The name of the genre.
   * @returns An observable of the genre data.
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Retrieves user data for the currently authenticated user.
   * @returns An observable of the user data.
   */
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const url = apiUrl + 'users/' + user.userName;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(url, { headers }).pipe(
      tap((result: any) => {}),
      map(this.extractResponseData),
      catchError((error) => {
        console.error('API Error:', error);
        return this.handleError(error);
      })
    );
  }

  /**
   * Retrieves the favorite movies of a user.
   * @param userName - The username of the user.
   * @returns An observable of the user's favorite movies.
   */
  getFavouriteMovies(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a movie to the user's favorite movies list.
   * @param userName - The username of the user.
   * @param movieId - The ID of the movie to add.
   * @returns An observable indicating the success of the operation.
   */
  addFavouriteMovies(userName: string, movieid: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + 'users/' + userName + '/movies/' + movieid, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Updates user details.
   * @param userDetails - The updated user details.
   * @returns An observable of the updated user data.
   */
  updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + userDetails.userName, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes the user account.
   * @returns An observable indicating the success of the operation.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .delete(apiUrl + 'users/' + user.email, {
        headers: headers,
        responseType: 'text',
      })
      .pipe(take(1), catchError(this.handleError));
  }

  /**
   * Deletes a movie from the user's favorite list.
   * @param userName - The username of the user.
   * @param movieId - The ID of the movie to delete.
   * @returns An observable indicating the success of the operation.
   */
  deleteFavoriteMovie(userName: string, movieid: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Deleting movie with ID:', movieid);
    return this.http
      .delete(apiUrl + 'users/' + userName + '/movies/' + movieid, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response.
   * @returns An observable with an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    const err = new Error('Something went wrong, please try again later.');
    throwError(() => err);
  }
}
