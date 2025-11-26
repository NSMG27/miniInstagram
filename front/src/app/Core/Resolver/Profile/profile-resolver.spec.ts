import { TestBed } from '@angular/core/testing';
import { ResolveFn, UrlTree } from '@angular/router';

import { profileResolver } from './profile-resolver';
import { ProfileData } from '../../../interfaces/profile.interface';

describe('profileResolver', () => {

  const executeResolver: ResolveFn<ProfileData | null | UrlTree> =
    (...resolverParameters) =>
      TestBed.runInInjectionContext(() => profileResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

});
