import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { PostService } from '../../Core/Services/Post/post.service';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private router = inject(Router);

  post = signal<any | null>(null);
  loading = signal(true);
  error = signal(false);
  deleting = signal(false);

  newComment = signal('');

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (!id) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando detalle del post:', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  addComment() {
    if (!this.newComment().trim()) return;

    // Simulación local — luego conectamos al backend
    const updated = structuredClone(this.post());
    updated.comments.push({
      user: 'Tú',
      text: this.newComment(),
      time: 'Ahora'
    });

    this.post.set(updated);
    this.newComment.set('');
  }

  deletePost() {
    const postId = this.route.snapshot.params['id'];
    
    if (!postId || this.deleting()) return;

    // Confirmación antes de eliminar
    if (!confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      return;
    }

    this.deleting.set(true);

    this.postService.deletePostById(postId).subscribe({
      next: () => {
        console.log('Post eliminado exitosamente');
        // Redirigir a la lista de posts o página principal
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        console.error('Error al eliminar el post:', err);
        alert('Ocurrió un error al eliminar la publicación. Intenta de nuevo.');
        this.deleting.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/posts']);
  }
}
