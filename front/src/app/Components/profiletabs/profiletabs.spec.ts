import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profiletabs } from './profiletabs';

describe('Profiletabs', () => {
  let component: Profiletabs;
  let fixture: ComponentFixture<Profiletabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profiletabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profiletabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
