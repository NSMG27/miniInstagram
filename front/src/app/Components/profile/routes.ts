import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./profile').then((m) => m.Profile),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../profile-posts/profile-posts')
            .then(m => m.ProfilePosts)
            .catch(err => {
              console.error('Error loading Feed', err);
              return null;
            }),
      },
      {
        path: ':post',
        loadComponent: () =>
          import('../post-detail/post-detail')
            .then(m => m.PostDetail)
            .catch(err => {
              console.error('Error loading Feed', err);
              return null;
            }),
      },
      {
        path: 'saved',
        loadComponent: () =>
          import('../new-photo-section/new-photo-section')
            .then(m => m.NewPhotoSection)
            .catch(err => {
              console.error('Error loading saved section', err);
              return null;
            }),
        data: {
          title: 'No tienes publicaciones guardadas',
          description: 'Las fotos que guardes aparecerán aquí.',
          actionLabel: 'Explorar contenido'
        }
      },
      {
        path: 'tagged',
        loadComponent: () =>
          import('../new-photo-section/new-photo-section')
            .then(m => m.NewPhotoSection)
            .catch(err => {
              console.error('Error loading tagged section', err);
              return null;
            }),
        data: {
          title: 'No estás etiquetado en ninguna publicación',
          description: 'Cuando alguien te etiquete, aparecerán aquí.',
          actionLabel: 'Volver al perfil'
        }
      },
      // 404 interno del dashboard
      {
        path: './**',
        loadComponent: () =>
          import('../../page-not-found/page-not-found')
            .then(m => m.PageNotFound)
            .catch(err => {
              console.error('Error loading page-not-found', err);
              return null;
            }),
      }
    ],
  },
] as Routes;