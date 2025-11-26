import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileData } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-edit-profile',
  imports: [],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  profile!: ProfileData | null;
  form!: FormGroup;

  ngOnInit() {
    this.profile = this.route.snapshot.data['profileData'];
    this.form = this.fb.group({
      website: [this.profile?.user?.webSite ?? ''],
      bio: [this.profile?.user?.presentation ?? ''],
      gender: [this.profile?.user?.genero ?? 'none'],     // 👈 aquí usamos value real
      suggestAccounts: [this.profile?.user?.suggestAccounts ?? false]
    });
  }

    submit() {
    console.log('FORM DATA =>', this.form.value);
  }
}
