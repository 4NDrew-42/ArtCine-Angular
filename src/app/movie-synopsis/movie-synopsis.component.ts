import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying movie synopsis in a dialog.
 */

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss'
})
export class MovieSynopsisComponent implements OnInit {

  /**
  * Constructor for MovieSynopsisComponent.
  * @param dialogRef - Reference to the dialog opened by the component.
  * @param data - Data passed to the dialog, including movieName and description.
  */

  constructor(
    public dialogRef: MatDialogRef<MovieSynopsisComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      movieName: string;
      description: string;
    }
  ) { }

  /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
  ngOnInit(): void {
  }
}
