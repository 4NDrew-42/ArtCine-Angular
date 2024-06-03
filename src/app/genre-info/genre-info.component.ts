import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.scss'
})
export class GenreInfoComponent {

  /**
   * Constructor for GenreInfoComponent.
   * @param dialogRef - Reference to the dialog opened by this component.
   * @param data - Data injected into the component containing genre information.
   */

  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      genre: string;
      description: string;
    }
  ) { }
}
