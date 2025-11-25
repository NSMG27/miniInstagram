import { Component } from '@angular/core';
import { Footer } from '../Components/footer/footer';
import { Header } from '../Components/header/header';

@Component({
  selector: 'app-login',
  imports: [
    Header, 
    Footer
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
