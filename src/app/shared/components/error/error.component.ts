import { Component, inject, OnInit } from '@angular/core';
import { ErrorService } from '../../../core/services/error/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  message: string | null = null;
  private _errorService = inject(ErrorService);

  ngOnInit() {
    this._errorService.errorMessage$.subscribe(msg => {
      this.message = msg;
      if (msg) setTimeout(() =>
        this.close(), 10000
      );
    });
  }

  close() {
    this._errorService.clearError();
  }
}
