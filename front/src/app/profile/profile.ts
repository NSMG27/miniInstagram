import { Component, inject, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileService } from '../Core/Services/Profile/profile.service';
import { UserSessionService } from '../Core/Services/UserSession/user-session.service';
import { ProfileData } from '../interfaces/profile.interface';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  private profileService = inject(ProfileService);
  private userSession = inject(UserSessionService);
  private router = inject(Router);

  // Signals
  profileData = signal<ProfileData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Datos base del JWT (sin request)
  user = computed(() => this.userSession.userInfo);

  ngOnInit() {
    const username = this.userSession.username;
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profileData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}
