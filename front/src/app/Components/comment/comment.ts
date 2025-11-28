import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class Comment {
  @Input() user!: string;
  @Input() description!: string;
}
