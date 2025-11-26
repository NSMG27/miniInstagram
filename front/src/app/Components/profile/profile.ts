import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProfileData } from '../../interfaces/profile.interface';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

   private route = inject(ActivatedRoute);

  profileData!: ProfileData | null;

  ngOnInit() {
    this.profileData = this.route.snapshot.data['profileData'];

    console.log('Perfil cargado por resolver:', this.profileData);
  }
}
