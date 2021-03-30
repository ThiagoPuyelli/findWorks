import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordAdminComponent } from './update-password-admin.component';

describe('UpdatePasswordAdminComponent', () => {
  let component: UpdatePasswordAdminComponent;
  let fixture: ComponentFixture<UpdatePasswordAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
