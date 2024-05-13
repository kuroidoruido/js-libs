import { TestBed } from '@angular/core/testing';

import { NgxOutsideClickService } from './ngx-outside-click.service';

describe('NgxOutsideClickService', () => {
  let service: NgxOutsideClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxOutsideClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
