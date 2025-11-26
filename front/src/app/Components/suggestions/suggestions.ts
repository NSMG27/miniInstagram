import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  imports: [],
  templateUrl: './suggestions.html',
  styleUrl: './suggestions.css',
})
export class Suggestions {
   users = [
    { name: 'JuanBau', avatar: 'https://i.pravatar.cc/50?img=1' },
    { name: 'breakingthehabit', avatar: 'https://i.pravatar.cc/50?img=2' },
    { name: 'Jhon Arenas', avatar: 'https://i.pravatar.cc/50?img=3' },
    { name: 'Julián Gómez', avatar: 'https://i.pravatar.cc/50?img=4' },
    { name: 'Andrés Parra', avatar: 'https://i.pravatar.cc/50?img=5' },
  ];
}
