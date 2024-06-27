import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOlvidePasswordComponent } from './form-olvide-password.component';

describe('FormOlvidePasswordComponent', () => {
  let component: FormOlvidePasswordComponent;
  let fixture: ComponentFixture<FormOlvidePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOlvidePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOlvidePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
