import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { Sidebar } from '../Components/sidebar/sidebar';
import { CreatePostModal } from '../Components/create-post-modal/create-post-modal';
import { CreatePostPreview } from '../Components/create-post-preview/create-post-preview';
import { ProfileData } from '../interfaces/profile.interface';
import { UserSessionService } from '../Core/Services/UserSession/user-session.service';
import { CreatePostModalService } from '../Core/Services/CreatePostModal/create-post-modal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, Sidebar, RouterLink, CreatePostModal, CreatePostPreview],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  private route = inject(ActivatedRoute);
  private session = inject(UserSessionService);
  modal = inject(CreatePostModalService);

  // DATA DEL PERFIL
  profileData!: ProfileData | null;
  routeToProfile!: string | null;

  ngOnInit() {
    this.profileData = this.route.snapshot.data['profileData'];
    this.routeToProfile = this.session.username;

    console.log('Perfil cargado por resolver:', this.profileData);
  }
}
