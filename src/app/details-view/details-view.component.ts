import { NgFor, NgIf } from '@angular/common';
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
  movies: any;
  fetchDirector: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<DetailsViewComponent>
  ) {}

  ngOnInit(): void {
    // Depending on the data structure passed, you might need to handle genres, directors, or movie details.
    this.genres = this.data.genres || [];
    console.log('this.data');
    this.directors = this.data.directors || [];
    this.movies = this.data.movies;
  }
  getDirector(name: string): void {
    this.fetchDirector.getDirector(name).subscribe((resp: any) => {
      this.directors = resp;
      console.log('Director Details:', this.directors);
      return this.directors;
    });
  }
  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
