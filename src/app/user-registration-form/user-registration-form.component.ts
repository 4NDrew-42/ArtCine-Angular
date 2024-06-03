import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /** Input for user data. */
  @Input() userData = { userName: '', password: '', email: '', birthday: '' };

  /**
     * Constructs the UserRegistrationFormComponent.
     * @param fetchApiData - The service for fetching API data.
     * @param dialogRef - The dialog reference for the user registration form.
     * @param snackBar - The snack bar service for displaying notifications.
     */
  constructor(
    public fetchApiData: FetchApiDataService,           //The service for fetching API data.
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,       //The reference to the dialog.
    public snackBar: MatSnackBar) { }    //The service for showing snack bar notifications.

  /** Lifecycle hook called after component initialization. */
  ngOnInit(): void {
  }

  /**
     * Registers a new user.
     */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open("user registered successfully!", 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}