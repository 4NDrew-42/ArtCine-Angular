import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 *  displaying director information in a dialog.
 */
@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss'
})
export class DirectorInfoComponent implements OnInit {

  /**
     * Constructor for DirectorInfoComponent.
     * @param data - Data injected into the component containing director information.
     */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      director: string;
      bio: string;
      birthdate: string;
    }
  ) { }

  /**
    * Angular lifecycle hook called after component initialization.
    */
  ngOnInit(): void {

  }

}
