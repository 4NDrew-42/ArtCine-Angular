import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorInfoComponent } from './director-info.component';

describe('DirectorInfoComponent', () => {
  let component: DirectorInfoComponent;
  let fixture: ComponentFixture<DirectorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
