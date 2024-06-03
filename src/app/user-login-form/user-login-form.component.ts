import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component for the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  /**
  * User data input for login.
  */
  @Input() userData = {
    userName: '',
    password: '',
  };

  /**
   * Constructs the UserLoginFormComponent.
   * @param fetchApiData - The service for fetching API data.
   * @param dialogRef - The reference to the dialog.
   * @param snackBar - The service for showing snack bar notifications.
   * @param router - The router service for navigation.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>, //The reference to the dialog.
    public snackBar: MatSnackBar,//The service for showing snack bar notifications.
    private router: Router
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void { }

  /**
   * Logs in the user.
   * If successful, saves user data and token in local storage, closes the dialog,
   * shows a success notification, and navigates to the movies page.
   * If login fails, shows a failure notification.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // Will close modal on success
      this.snackBar.open('User login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (result) => {
      this.snackBar.open('User login failed', 'OK', {
        duration: 2000
      });
    });
  }

}