import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordUserComponent } from './update-password-user.component';

describe('UpdatePasswordUserComponent', () => {
  let component: UpdatePasswordUserComponent;
  let fixture: ComponentFixture<UpdatePasswordUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
