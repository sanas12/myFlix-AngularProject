import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Root component for the myFlix Angular client.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule], // Import RouterModule here
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}
