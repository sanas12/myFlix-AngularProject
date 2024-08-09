import { NgFor, NgIf } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
} from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-details-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    MatIcon,
    NgFor,
    NgIf,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
  ],
  templateUrl: './details-view.component.html',
  styleUrl: './details-view.component.scss',
})
export class DetailsViewComponent implements OnInit {
  genres: any;
  directors: any;
  movie: any;
  fetchDirector: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public FetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<DetailsViewComponent>
  ) {
    this.directors = data.directors;
    this.genres = data.genres;
    this.movie = data.movie;
  }

  ngOnInit(): void {
    // console.log('this.movies:', this.directors);
    // this.getDirector(this.directors.Name);
    this.getGenre(this.genres.Name);
    console.log('this.genres:', this.genres);
  }
  getDirector(name: string): void {
    this.FetchApiDataService.getDirector(name).subscribe((resp: any) => {
      this.directors = resp;
      console.log('Director Details:', this.directors);
      return this.directors;
    });
  }
  getGenre(name: string): void {
    this.FetchApiDataService.getGenre(name).subscribe((resp: any) => {
      this.genres = resp;
      console.log('Genre Details:', this.genres);
      return this.genres;
    });
  }
  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
