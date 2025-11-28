import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreatePostModalService {
   isOpen = signal(false);
   selectedFile = signal<File | null>(null);

  open() { 
    this.isOpen.set(true);
    this.selectedFile.set(null); // Limpia selección previa
  }

  setFile(file: File) {
    this.selectedFile.set(file);
  }

  reset() {
    this.isOpen.set(false);
    this.selectedFile.set(null);
  }

  close() {
    this.reset();
  }
}
