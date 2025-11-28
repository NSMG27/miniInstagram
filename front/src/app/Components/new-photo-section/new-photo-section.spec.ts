import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPhotoSection } from './new-photo-section';

describe('NewPhotoSection', () => {
  let component: NewPhotoSection;
  let fixture: ComponentFixture<NewPhotoSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPhotoSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPhotoSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
