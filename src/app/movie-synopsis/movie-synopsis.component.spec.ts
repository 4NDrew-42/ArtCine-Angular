import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSynopsisComponent } from './movie-synopsis.component';

describe('MovieSynopsisComponent', () => {
  let component: MovieSynopsisComponent;
  let fixture: ComponentFixture<MovieSynopsisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieSynopsisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
