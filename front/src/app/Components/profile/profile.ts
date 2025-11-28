import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ProfileData } from '../../interfaces/profile.interface';
import { Footer } from '../footer/footer';
import { Profiletabs } from '../profiletabs/profiletabs';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, RouterOutlet, Profiletabs, Footer],
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
