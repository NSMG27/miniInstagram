import { Component, Input, OnInit, signal } from '@angular/core';
import { PostService } from '../../Core/Services/Post/post.service';
import { Suggestions } from '../suggestions/suggestions';
import { Post } from '../post/post';

@Component({
  selector: 'app-feed',
  imports: [Suggestions, Post],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
  posts = signal<any[]>([]);
  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  constructor(private postService: PostService) {}

  ngOnInit() {

    this.loading.set(true);
    this.error.set(false);

    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando posts:', err);
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
