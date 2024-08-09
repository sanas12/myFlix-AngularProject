import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
} from '@angular/material/card';
import { NgClass, NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DetailsViewComponent } from '../details-view/details-view.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [
    MatCardModule,
    MatDialogModule,
    MatIcon,
    NgFor,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    NgClass,
  ],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res) => {
        this.movies = res;

        let user = JSON.parse(localStorage.getItem('user') || '');
        this.movies.forEach((movie: any) => {
          movie.isFavorite = user.FavoriteMovies.includes(movie._id);
        });
        return this.movies;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // Navigate to user profile page
  redirectProfile(): void {
    this.router.navigate(['/profile']);
  }

  // Logout user
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  // Show genre details in a dialog
  showGenre(movie: any): void {
    this.dialog.open(DetailsViewComponent, {
      data: { genres: movie.Genre },
      width: '500px',
    });
  }

  // Show director details in a dialog
  showDirector(movie: any): void {
    this.dialog.open(DetailsViewComponent, {
      data: { directors: movie.Director },
      width: '500px',
    });
  }

  // Show movie details in a dialog
  showDetail(movie: any): void {
    this.dialog.open(DetailsViewComponent, {
      data: { movie: movie },
      width: '500px',
    });
  }

  // Modify (add/remove) favorite movies
  modifyFavoriteMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.Username; // Ensure correct username retrieval
    if (!user.FavoriteMovies) {
      user.FavoriteMovies = [];
    }

    if (this.isFavorite(movie)) {
      this.fetchApiData
        .deleteFavoriteMovie(username, movie._id)
        .subscribe(() => {
          console.log(`${movie.Title} removed from favorites`);
          // Update local storage after removing from favorites
          user.FavoriteMovies = user.FavoriteMovies.filter(
            (id: string) => id !== movie._id
          );
          localStorage.setItem('user', JSON.stringify(user));
          this.getMovies(); // Refresh movies
        });
    } else {
      this.fetchApiData.addFavoriteMovie(username, movie._id).subscribe(() => {
        console.log(`${movie.Title} added to favorites`);
        // Update local storage after adding to favorites
        user.FavoriteMovies.push(movie._id);
        localStorage.setItem('user', JSON.stringify(user));
        this.getMovies(); // Refresh movies
      });
    }
  }

  // Check if a movie is a favorite
  isFavorite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      Array.isArray(user.FavoriteMovies) &&
      user.FavoriteMovies.includes(movie._id)
    );
  }
}
