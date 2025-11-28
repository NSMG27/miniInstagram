import { Component, Input, OnInit, signal } from '@angular/core';
import { PostService } from '../../Core/Services/Post/post.service';
import { Comment } from '../comment/comment';

@Component({
  selector: 'app-post',
  imports: [Comment],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {

  @Input() postId!: string;

  post = signal<any>(null);
  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  constructor(private postService: PostService) {}

  ngOnInit() {

    this.loading.set(true);
    this.error.set(false);

    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.post.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando post:', err);
        this.error.set(true);
        this.loading.set(false);
      },
    });

    /*this.postService.getPostById(this.postId).subscribe({
      next: (data) => {
        this.post.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando post:', err);
        this.error.set(true);
        this.loading.set(false);
      },
    });*/
  }
}
