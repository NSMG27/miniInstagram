import { Component } from '@angular/core';
import { Suggestions } from '../suggestions/suggestions';

@Component({
  selector: 'app-feed',
  imports: [Suggestions],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
    posts = [
    {
      user: 'reelshortapp',
      avatar: 'https://i.pravatar.cc/50',
      image: 'https://picsum.photos/600/900',
      likes: 732,
      description: 'Some truths are too painful to believe...',
      time: '13 h'
    }
  ];
}
