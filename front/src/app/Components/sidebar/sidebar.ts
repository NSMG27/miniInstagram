import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { UserSessionService } from '../../Core/Services/UserSession/user-session.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  tittle: string = "Mini Instagram"

  constructor(private sanitizer: DomSanitizer) {}

  private session = inject(UserSessionService);

    menu = [
    {
      label: 'Inicio',
      route: './',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 72 72">
      <path d="M 36 10 C 34.861 10 33.722922 10.386609 32.794922 11.162109 L ..."></path>
      </svg>`
    },
    {
      label: 'Búsqueda',
      route: './busqueda',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
             </svg>`
    },
    {
      label: 'Explorar',
      route: './explorar',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16" />
             </svg>`
    },
    {
      label: 'Reels',
      route: './reels',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 24 24" class="w-6 h-6">
                <path d="M4 3h16v18H4z" />
             </svg>`
    },
    {
      label: 'Mensajes',
      route: './mensajes',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12.79V6a2 2 0 00-2-2H5a2 
                         2 0 00-2 2v12l4-4h12a2 2 0 002-2z"/>
             </svg>`
    },
    {
      label: 'Notificaciones',
      route: './notificaciones',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405C18.21 14.79 
                         18 14.41 18 14V11a6.002 6.002 0 
                         00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 
                         6.165 6 8.388 6 11v3c0 .41-.21.79-.595 
                         1.405L4 17h5m6 0v1a3 3 0 
                         11-6 0v-1h6z"/>
             </svg>`
    },
    {
      label: 'Crear',
      route: './crear',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"/>
             </svg>`
    },
    {
      label: 'Perfil',
      route: './',
      getRoute: () => `${this.session.username}`,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M5.121 17.804A9 9 0 1118.88 17.804M15 
                         11a3 3 0 11-6 0 3 3 0 016 0z"/>
             </svg>`
    }
  ];

   safe(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
