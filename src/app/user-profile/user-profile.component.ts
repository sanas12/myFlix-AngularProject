import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatCardActions,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatSnackBarModule,
    MatCardContent,
    NgFor,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    public router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }

  ngOnInit(): void {
    this.getUser();
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.user).subscribe(
      (res: any) => {
        this.user = {
          ...res,
          id: res._id,
          password: this.user.password,
          token: this.user.token,
        };
        localStorage.setItem('users', JSON.stringify(this.user));
        this.getFavoriteMovies();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  resetUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }

  backToMovie(): void {
    this.router.navigate(['movies']);
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res: any) => {
        this.FavoriteMovies = res.filter((movie: any) => {
          return this.user.FavoriteMovies.includes(movie._id);
        });
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!this.user || !this.user.Username) {
      console.error('Username is undefined or invalid');
      return;
    }

    console.log(`Fetching user profile for: ${this.user.Username}`);
    this.fetchApiData.getUser(this.user.Username).subscribe(
      (res: any) => {
        this.user = {
          ...res,
          id: res._id,
          password: this.user.password,
          token: this.user.token,
        };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.getFavoriteMovies();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
  removeFromFavorite(movie: any): void {
    const username = this.user.Username; // Ensure you're using the correct username property
    this.fetchApiData.deleteFavoriteMovie(username, movie._id).subscribe(
      (res: any) => {
        console.log(`${movie.Title} removed from favorites`);
        this.user.FavoriteMovies = this.user.FavoriteMovies.filter(
          (id: string) => id !== movie._id
        );
        localStorage.setItem('user', JSON.stringify(this.user));
        this.getFavoriteMovies(); // Refresh the list of favorite movies
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }
}
