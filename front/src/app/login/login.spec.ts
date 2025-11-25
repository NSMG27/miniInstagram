import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Login } from './login';
import { AuthService } from '../Core/Services/Auth/auth.service';
import { of } from 'rxjs';

describe('Login (standalone)', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Login,               // componente standalone
        RouterTestingModule  // provee Router y ActivatedRoute
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: () => of({ data: { token: 'test' }, message: 'OK' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
