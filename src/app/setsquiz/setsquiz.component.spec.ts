import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsquizComponent } from './setsquiz.component';

describe('SetsquizComponent', () => {
  let component: SetsquizComponent;
  let fixture: ComponentFixture<SetsquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetsquizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
