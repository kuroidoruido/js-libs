import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOutsideClickComponent } from './ngx-outside-click.component';

describe('NgxOutsideClickComponent', () => {
  let component: NgxOutsideClickComponent;
  let fixture: ComponentFixture<NgxOutsideClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxOutsideClickComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxOutsideClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
