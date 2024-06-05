import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the navigation bar displayed at the top of the application.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  /** The username of the logged-in user. */
  public username: string = '';

  /**
   * Constructor for NavbarComponent.
   * @param snackBar - Angular Material service for displaying snack bar messages.
   * @param router - Angular service for navigating between routes.
   */

  constructor(public snackBar: MatSnackBar, public router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user')!).username;
  }

  /**
   * Function to navigate to the movies page.
   */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Function to navigate to the profile page.
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Function to log out the user.
   */
  public logoutUser(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.snackBar.open('You have been logged out', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
