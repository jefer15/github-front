import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ErrorComponent } from './shared/components/error/error.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ErrorComponent,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'github-front';
  constructor(private _router: Router) { }

  goHome() {
    this._router.navigate(['/']);
  }
}
