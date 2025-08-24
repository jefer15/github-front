import { Component, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GithubService } from '../../core/services/github/github.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { ErrorService } from '../../core/services/error/error.service';
import { GithubUser, GithubUserDetail, GithubUserSearch, GithubUserWithFollowers } from '../../core/models/github.model';
import { firstValueFrom } from 'rxjs';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: GithubUserWithFollowers[] = [];
  errorMessage = '';
  private chart?: Chart;
  username = new FormControl('', [Validators.required, Validators.minLength(4)]);

  @ViewChild('followersChart', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private _githubService = inject(GithubService);
  private _errorService = inject(ErrorService);

  search() {
    const username = this.username.value?.trim();
    if (!username) return;

    if (username.length < 4 && username.toLowerCase() !== 'doublevpartners') {
      this._errorService.setError('Debe tener mínimo 4 caracteres o ser "doublevpartners".');
      return;
    }

    this._githubService.searchUsers(username).subscribe({
      next: (res: GithubUserSearch) => {
        const top = (res?.items ?? []).slice(0, 10);
        this.users = [];

        Promise.all(
          top.map(async (u: GithubUser) => {
            const detail: GithubUserDetail = await firstValueFrom(this._githubService.getUser(u.login));
            return {
              ...u,
              followers: detail.followers
            };
          })
        ).then((withFollowers: GithubUserWithFollowers[]) => {
          this.users = withFollowers;
          setTimeout(() => this.renderChart(), 0);
        });
      },
    });
  }

  private renderChart() {
    if (!this.canvasRef?.nativeElement) return;
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.users.map((u) => u.login);
    const data = this.users.map((u) => u.followers ?? 0);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Seguidores',
            data,
            backgroundColor: 'rgba(37, 99, 235, 0.6)',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
