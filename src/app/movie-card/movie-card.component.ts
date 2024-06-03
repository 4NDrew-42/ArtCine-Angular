import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

/**
 * Component for displaying movie cards.
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  genre: any = "";

  director: any = "";

  user: any = {};

  userData = { UserId: "", favoritemovie: [] }

  favoritemovie: any[] = [];

  /**
   * Constructor for MovieCardComponent.
   * @param fetchApiData - Service for fetching data from API.
   * @param dialog - Service for opening dialogs.
   * @param snackBar - Service for displaying snack bar messages.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */

  ngOnInit(): void {
    this.getMovies();
  }

  /**
     * Fetches all movies from the API.
     */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log("movies from API", this.movies)
    });
  }

  /**
     * Opens a dialog displaying genre details.
     * @param genre - The genre of the movie.
     * @param description - The description of the genre.
     */

  openGenreDialog(genre: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        genre: genre,
        description: description
      },
      width: '500px'
    });
  }

  /**
     * Opens a dialog displaying director details.
     * @param director - The name of the director.
     * @param bio - The biography of the director.
     * @param birthdate - The birthdate of the director.
     */
  openDirectorDialog(director: string, bio: string, birthdate: string,): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        director: director,
        bio: bio,
        birthdate: birthdate,
      },
      width: '500px',
    });
  }

  /**
    * Opens a dialog displaying movie synopsis.
    * @param movieName - The name of the movie.
    * @param description - The synopsis of the movie.
    */

  openSynopsisDialog(movieName: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        movieName: movieName,
        description: description
      },
      width: '500px',
    });
  }

  getFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      if (Array.isArray(resp)) {
        this.movies = resp;
        // Loop through each movie and push its ID into favoritemovie array
        this.movies.forEach((movie: any) => {
          this.favoritemovie.push(movie._id);
        });
      }
    });
  }

  /**
    * Checks if a movie is in the user's favorite list.
    * @param movie - The movie to check.
    * @returns True if the movie is in the favorite list, false otherwise.
    */
  isFav(movie: any): boolean {
    return this.favoritemovie.includes(movie._id);
  }

  /**
    * Toggles a movie in the user's favorite list.
    * @param movie - The movie to toggle.
    */
  toggleFav(movie: any): void {
    console.log('toggleFav called with movie:', movie);
    const isFavorite = this.isFav(movie);
    console.log('isFavorite:', isFavorite);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie);
  }

  /**
     * Adds a movie to the user's favorite list.
     * @param movie - The movie to add to favorites.
     */
  addFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      console.log('user:', parsedUser);
      this.userData.UserId = parsedUser._id;
      console.log('userData:', this.userData);
      this.fetchApiData.addFavouriteMovies(parsedUser.userName, movie._id).subscribe((resp) => {
        console.log('server response:', resp);
        localStorage.setItem('user', JSON.stringify(resp));
        // Add the movie ID to the favoritemovie array
        this.favoritemovie.push(movie._id);
        // Show a snack bar message
        this.snackBar.open(`${movie.movieName} has been added to your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
  }

  /**
     * Deletes a movie from the user's favorite list.
     * @param movie - The movie to remove from favorites.
     */
  deleteFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.fetchApiData.deleteFavoriteMovie(parsedUser.userName, movie._id).subscribe((resp) => {
        localStorage.setItem('user', JSON.stringify(resp));
        // Remove the movie ID from the favoritemovie array
        this.favoritemovie = this.favoritemovie.filter((id) => id !== movie._id);
        // Show a snack bar message
        this.snackBar.open(`${movie.movieName} has been removed from your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
  }
}












