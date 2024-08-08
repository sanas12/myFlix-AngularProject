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
  favoriteMovies: any[] = [];

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
    this.fetchApiData.editUser(this.user.username, this.user).subscribe(
      (res: any) => {
        this.user = {
          ...res,
          id: res._id,
          password: this.user.password,
          token: this.user.token,
        };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.getfavoriteMovies();
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

  getfavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res: any) => {
        this.favoriteMovies = res.filter((movie: any) => {
          return this.user.favoriteMovies.includes(movie._id);
        });
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  getUser(): void {
    this.fetchApiData.getUser(this.user.id).subscribe((res: any) => {
      this.user = {
        ...res,
        id: res._id,
        password: this.user.password,
        token: this.user.token,
      };
      localStorage.setItem('user', JSON.stringify(this.user));
      this.getfavoriteMovies();
    });
  }

  removeFromFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(this.user.id, movie.title).subscribe(
      (res: any) => {
        this.user.favoriteMovies = res.favoriteMovies;
        this.getfavoriteMovies();
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
