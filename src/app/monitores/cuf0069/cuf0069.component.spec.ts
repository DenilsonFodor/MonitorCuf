import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cuf0069Component } from './cuf0069.component';

describe('Cuf0069Component', () => {
  let component: Cuf0069Component;
  let fixture: ComponentFixture<Cuf0069Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuf0069Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cuf0069Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
