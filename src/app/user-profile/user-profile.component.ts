import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


// Component Imports
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

/**
 * Component for user profile management.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /** Input for user data. */
  @Input() userData: any = { userName: '', password: '', email: '', birthday: '' };

  /** Form data for user. */
  formUserData: any = {
    userName: '',
    password: '',
    email: '',
    birthday: '',
    favoriteMovie: []
  };

  /** User object. */
  user: any = {};

  /** List of all movies. */
  movies: any[] = [];

  /** List of favorite movies. */
  favoritemovie: any[] = [];

  /** List of favorite movie IDs. */
  favoriteMoviesIDs: any[] = [];

  /**
     * Constructs the UserProfileComponent.
     * @param fetchApiData - The service for fetching API data.
     * @param dialog - The dialog service for displaying dialogs.
     * @param snackBar - The snack bar service for displaying notifications.
     * @param router - The router service for navigation.
     */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
/** Lifecycle hook called after component initialization. */  ngOnInit(): void {
    this.getProfile();
    this.getMovies(); // Call getMovies() on component initialization
    this.getFavMovies(); // Call getFavMovies() on component initialization
  }

  /**
     * Fetches user profile data.
     */
  public getProfile(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      console.log('result:', result.favoritemovie);
      this.user = result;
      this.userData.userName = this.user.userName;
      this.userData.email = this.user.email;
      if (this.user.birthday) {
        let Birthday = new Date(this.user.birthday);
        if (!isNaN(Birthday.getTime())) {
          this.userData.birthday = Birthday.toISOString().split('T')[0];
        }
      }
      this.formUserData = { ...this.userData };
      this.favoriteMoviesIDs = this.user.favoritemovie;

      this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
        this.favoritemovie = movies.filter((movie: any) => this.favoriteMoviesIDs.includes(movie._id));
      });
    });
  }

  /**
     * Fetches all movies.
     */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      if (Array.isArray(result)) {
        this.movies = result;
      }
      return this.movies;
    });
  }

  /**
     * Fetches user's favorite movies.
     */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((result) => {
      this.favoriteMoviesIDs = result.favoritemovie;
    });
  }

  /**
     * Checks if a movie is in the user's favorite movies list.
     * @param movie - The movie to check.
     * @returns True if the movie is a favorite, otherwise false.
     */
  isFav(movie: any): boolean {

    return this.favoriteMoviesIDs.includes(movie._id);
  }


  /**
     * Toggles a movie in the user's favorite movies list.
     * @param movie - The movie to toggle.
     */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie);
  }

  /**
     * Adds a movie to the user's favorite movies list.
     * @param movie - The movie to add.
     */
  addFavMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.fetchApiData.addFavouriteMovies(user.userName, movie._id).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.getFavMovies(); // Refresh favorite movies after adding a new one
        this.snackBar.open(`${movie.movieName} has been added to your favorites`, 'OK', {
          duration: 1000,
        });
      });
    }
  }

  /**
     * Deletes a movie from the user's favorite movies list.
     * @param movie - The movie to remove from favorites.
     */

  deleteFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.userData.UserId = parsedUser._id;
      this.fetchApiData.deleteFavoriteMovie(parsedUser.userName, movie._id).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        // Remove the movie ID from the favoritemovie array
        this.favoriteMoviesIDs = this.favoriteMoviesIDs.filter((id) => id !== movie._id);
        // Fetch the user's favorite movies again to update the movie list
        this.getFavMovies();
        // Show a snack bar message
        this.snackBar.open(`${movie.movieName} has been removed from your favorites`, 'OK', {
          duration: 1000,
        });
      });
    }
  }

  /**
     * Updates user data.
     */
  updateUser(): void {
    this.fetchApiData.updateUser(this.formUserData).subscribe((result) => {
      console.log('User update success:', result);
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('User updated successfully!', 'OK', {
        duration: 2000,
      });
      this.getProfile();
    }, (error) => {
      console.log('Error updating user:', error);
      this.snackBar.open('Failed to update user', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
     * Deletes the user's account.
     */
  async deleteUser(): Promise<void> {
    console.log('deleteUser function called:', this.userData.email)
    if (confirm('Do you want to delete your account permanently?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        this.snackBar.open('Account deleted successfully!', 'OK', {
          duration: 3000,
        });
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }
  }
  /**
     * Opens a dialog to view genre information.
     * @param genre - The genre.
     * @param description - The description of the genre.
     */
  openGenreDialog(genre: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        genre: genre,
        description: description
      },
      width: '500px',
    });
  }

  /**
    * Opens a dialog to view director information.
    * @param director - The director's name.
    * @param bio - The director's biography.
    * @param birthdate - The director's birthdate.
    */
  openDirectorDialog(director: string, bio: string, birthdate: string): void {
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
   * Opens a dialog to view movie synopsis information.
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

}