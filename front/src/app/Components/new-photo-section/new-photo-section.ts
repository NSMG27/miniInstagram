import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-photo-section',
  imports: [],
  templateUrl: './new-photo-section.html',
  styleUrl: './new-photo-section.css',
})
export class NewPhotoSection {

  private route = inject(ActivatedRoute);

  @Input() title: string = 'Comparte fotos';
  @Input() description: string = 'Cuando compartas fotos, aparecerán en tu perfil.';
  @Input() actionLabel: string = 'Comparte tu primera foto';

  constructor() {
    const data = this.route.snapshot.data;

    if (data) {
      this.title = data['title'] ?? this.title;
      this.description = data['description'] ?? this.description;
      this.actionLabel = data['actionLabel'] ?? this.actionLabel;
    }
  }
}
