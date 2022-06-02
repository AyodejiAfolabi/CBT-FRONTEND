import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizsignupComponent } from './quizsignup.component';

describe('QuizsignupComponent', () => {
  let component: QuizsignupComponent;
  let fixture: ComponentFixture<QuizsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizsignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
