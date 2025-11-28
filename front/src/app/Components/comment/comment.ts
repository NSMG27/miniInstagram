import { Component, Input, inject, signal } from '@angular/core';
import { CommentService } from '../../Core/Services/Comment/comment.service';
import { UserSessionService } from '../../Core/Services/UserSession/user-session.service';
import { ErrorHandlerService } from '../../Core/Services/ErrorHandler/error-handler.service';


@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class Comment {
  private commentService = inject(CommentService);
  private userSession = inject(UserSessionService);
  private errorHandler = inject(ErrorHandlerService);

  @Input({ required: true }) postId!: string;

  comments = signal<any[]>([]);
  loading = signal(true);                // loading al traer comentarios
  posting = signal(false);               // loading al publicar comentario
  error = signal<string | null>(null);

  newComment = signal('');               // texto del input

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.loading.set(true);

    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (data) => {
        this.comments.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  publishComment() {

    if (this.posting()) return;                   // evitar doble click
    if (!this.newComment().trim()) return;        // evitar texto vacío

    this.posting.set(true);

    const payload = {
      text: this.newComment(),
      user: this.userSession.username!           // usuario autenticado
    };

    this.commentService.addComment(this.postId, payload).subscribe({
      next: () => {
        this.newComment.set('');                 // limpiar input
        this.posting.set(false);
        this.loadComments();                     // refrescar lista
      },
      error: (err) => {
        console.error("Error publicando comentario:", err.message);
        this.posting.set(false);
      }
    });
  }
}
