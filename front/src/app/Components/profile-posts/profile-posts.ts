import { Component, Input, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../Core/Services/Profile/profile.service';
//import { PostService } from '../../Core/Services/Post/post.service';

@Component({
  selector: 'app-profile-posts',
  imports: [RouterLink],
  templateUrl: './profile-posts.html',
  styleUrl: './profile-posts.css',
})
export class ProfilePosts {
   @Input() userId!: string;

  posts = signal<any[]>([]);
  loading = signal(true);
  error = signal(false);

  //private postService = inject(PostService);
  private profileService = inject(ProfileService);

  ngOnInit() {
    this.loadPosts();
  }

  // ==============================
  // 🔥 Cargar publicaciones
  // ==============================
  private loadPosts() {

    this.loading.set(true);
    this.error.set(false);

    // ==============================
    // 🔥 SIMULACIÓN TEMPORAL (MOCK)
    // ==============================
    setTimeout(() => {

      const mockPosts = [
        { id: 1, image: 'https://picsum.photos/600/600?random=1', likes: 120 },
        { id: 2, image: 'https://picsum.photos/600/600?random=2', likes: 95 },
        { id: 3, image: 'https://picsum.photos/600/600?random=3', likes: 301 },
        { id: 4, image: 'https://picsum.photos/600/600?random=4', likes: 45 },
        { id: 5, image: 'https://picsum.photos/600/600?random=5', likes: 62 },
        { id: 6, image: 'https://picsum.photos/600/600?random=6', likes: 178 },
        { id: 7, image: 'https://picsum.photos/600/600?random=7', likes: 210 },
        { id: 8, image: 'https://picsum.photos/600/600?random=8', likes: 142 },
        { id: 9, image: 'https://picsum.photos/600/600?random=9', likes: 310 },
        { id: 10, image: 'https://picsum.photos/600/600?random=10', likes: 51 },
      ];

      this.posts.set(mockPosts);
      this.loading.set(false);

    }, 900);
  }
}
