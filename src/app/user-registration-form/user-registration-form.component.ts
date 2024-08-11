import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * UserRegistrationFormComponent provides a form for users to register an account.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class UserRegistrationFormComponent {
  userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @param fetchApiData Service to handle API requests.
   * @param dialogRef Reference to the currently opened dialog.
   * @param snackBar Snackbar service for displaying messages.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Called after the component's view has been initialized.
   */
  ngOnInit(): void {}

  /**
   * Registers the user by sending their data to the backend.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        const message = result.message || 'Registration successful!';
        this.dialogRef.close(); // Close the modal on success!
        this.snackBar.open(message, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['login']);
      },
      (error: any) => {
        const errorMessage =
          (error && error.error && error.error.message) ||
          'Registration failed!';
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
