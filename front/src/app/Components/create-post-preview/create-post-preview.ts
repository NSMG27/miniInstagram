import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { PostService } from '../../Core/Services/Post/post.service';
import { UserSessionService } from '../../Core/Services/UserSession/user-session.service';
@Component({
  selector: 'app-create-post-preview',
  imports: [],
  templateUrl: './create-post-preview.html',
  styleUrl: './create-post-preview.css',
})
export class CreatePostPreview {
  // ---- Inputs y Outputs ----
  @Input() file!: File;
  @Output() close = new EventEmitter<void>();

  // ---- Signals ----
  previewUrl = signal<string | null>(null);
  description = signal('');
  loading = signal(false);
  error = signal(false);

  // ---- Inyecciones ----
  private postService = inject(PostService);
  private session = inject(UserSessionService);

  // ---- Datos del usuario ----
  username = this.session.username ?? '';

  // -----------------------------------
  // Cargar la previsualización del File
  // -----------------------------------
  ngOnInit() {

    if (!this.file) {
      this.error.set(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result as string);
    };
    reader.readAsDataURL(this.file);
  }

  // ---------------------
  // Publicar la imagen
  // ---------------------
  publish() {

    if (this.loading()) return; // evita doble click

    this.loading.set(true);
    this.error.set(false);

    const formData  = new FormData();
    formData.append('image', this.file); // nombre estándar del backend
    formData.append('caption', this.description());

    this.postService.createPost(formData).subscribe({
      next: () => {
        this.loading.set(false);
        this.close.emit(); // cierra modal
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }
}
