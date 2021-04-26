import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Booksv1Component } from './booksv1.component';

describe('Booksv1Component', () => {
  let component: Booksv1Component;
  let fixture: ComponentFixture<Booksv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Booksv1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Booksv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
