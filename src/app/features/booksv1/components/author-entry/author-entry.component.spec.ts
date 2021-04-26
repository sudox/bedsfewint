import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorEntryComponent } from './author-entry.component';

describe('AuthorEntryComponent', () => {
  let component: AuthorEntryComponent;
  let fixture: ComponentFixture<AuthorEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
