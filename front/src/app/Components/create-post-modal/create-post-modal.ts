import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-post-modal',
  imports: [],
  templateUrl: './create-post-modal.html',
  styleUrl: './create-post-modal.css',
})
export class CreatePostModal {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() close = new EventEmitter<void>();

  triggerFile(input: HTMLInputElement) {
    input.click();
  }

  onFileChosen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
