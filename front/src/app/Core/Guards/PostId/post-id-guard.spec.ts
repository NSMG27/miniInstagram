import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { postIdGuard } from './post-id-guard';

describe('postIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => postIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
