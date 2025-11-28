import { TestBed } from '@angular/core/testing';

import { CreatePostModalService } from './create-post-modal.service';

describe('CreatePostModalService', () => {
  let service: CreatePostModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePostModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
