/**
 * @fileoverview This file contains the main module for the application.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

import { AppRoutingModule } from './app-routing.module';

/**
 * The main application module.
 * @module AppModule
 */
@NgModule({
  declarations: [
    /**
     * The main app component.
     */
    AppComponent,
    /**
     * The welcome page component.
     */
    WelcomePageComponent,
    /**
     * The user registration form component.
     */
    UserRegistrationFormComponent,
    /**
     * The user login form component.
     */
    UserLoginFormComponent,
    /**
     * The movie card component.
     */
    MovieCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    AppRoutingModule, // Make sure AppRoutingModule is imported last
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
