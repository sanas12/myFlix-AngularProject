import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * UserLoginFormComponent provides a user login form and handles the login process.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: true,
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
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
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param fetchApiData - The service used to communicate with the API for user login.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service to show notifications.
   * @param router - Router service to navigate between routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook that is called after the component has initialized.
   */
  ngOnInit(): void {}

  /**
   * Logs in the user using the provided credentials.
   * On successful login, stores the user data in localStorage and navigates to the 'movies' route.
   * Displays appropriate notifications based on the success or failure of the login attempt.
   */
  logInUser(): void {
    console.log('Login attempt with userData:', this.userData); // Logging the payload

    this.fetchApiData.userLogin(this.userData).subscribe(
      (res: any) => {
        console.log('Login response:', res); // Logging the response

        this.snackBar.open(
          `Login success, Welcome ${res.user.Username}`,
          'OK',
          {
            duration: 2000,
          }
        );
        let user = {
          ...res.user,
          id: res.user._id,
          Password: this.userData.Password,
          token: res.token,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['movies']);
      },
      (error) => {
        console.error('Login error: ', error);
        this.snackBar.open('Login failed: ' + error.message, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
