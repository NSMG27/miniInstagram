import { TestBed } from '@angular/core/testing';

import { LogoutManagerService } from './logout-manager.service';

describe('LogoutManagerService', () => {
  let service: LogoutManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
