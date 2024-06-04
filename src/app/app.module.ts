// Import necessary modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import Angular Material modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogModule } from '@angular/cdk/dialog';
import { MatMenuModule } from '@angular/material/menu';

// Import application specific modules^
//import { UserProfileComponent } from './user-profile/user-profile.component';
//import { DirectorInfoComponent } from './director-info/director-info.component';
//import { GenreInfoComponent } from './genre-info/genre-info.component';
//import { MovieSynopsisComponent } from './movie-synopsis/movie-synopsis.component';
//import { NavbarComponent } from './navbar/navbar.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
//import { MovieCardComponent } from './movie-card/movie-card.component';
//import { WelcomePageComponent } from './welcome-page/welcome-page.component';

// Define the routes for the application
const appRoutes: Routes = [
  //{ path: 'welcome', component: WelcomePageComponent },
  //{ path: 'movies', component: MovieCardComponent },
  //{ path: 'profile', component: UserProfileComponent },
  //{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    //MovieCardComponent,
    //WelcomePageComponent,
    //UserProfileComponent,
    //DirectorInfoComponent,
    //GenreInfoComponent,
    //MovieSynopsisComponent,
    //NavbarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatToolbarModule,
    DialogModule,
    MatMenuModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
