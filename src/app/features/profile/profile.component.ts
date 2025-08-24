import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../core/services/github/github.service';
import { MatCardModule } from '@angular/material/card';
import { GithubUserDetail } from '../../core/models/github.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: GithubUserDetail | null = null;
  errorMessage:string = '';


    private _route = inject(ActivatedRoute);
    private _githubService = inject(GithubService);

  ngOnInit() {
    const login = this._route.snapshot.paramMap.get('login');
    if (login) {
      this._githubService.getUser(login).subscribe({
        next: (user: GithubUserDetail) => this.user = user,
      });
    }
  }

}
