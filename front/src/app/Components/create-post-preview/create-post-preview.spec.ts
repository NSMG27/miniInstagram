import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostPreview } from './create-post-preview';

describe('CreatePostPreview', () => {
  let component: CreatePostPreview;
  let fixture: ComponentFixture<CreatePostPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
