import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { UserSessionService } from '../UserSession/user-session.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutManagerService {
  private auth = inject(AuthService);
  private session = inject(UserSessionService);
  private router = inject(Router);

  logout() {
    // 1. Kill auth token
    this.auth.logout();

    // 2. Kill cached username
    this.session.clearSession();

    // 3. Redirect to login
    this.router.navigate(['/login']);
  }
}
