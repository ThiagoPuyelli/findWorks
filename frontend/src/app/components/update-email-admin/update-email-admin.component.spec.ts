import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmailAdminComponent } from './update-email-admin.component';

describe('UpdateEmailAdminComponent', () => {
  let component: UpdateEmailAdminComponent;
  let fixture: ComponentFixture<UpdateEmailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmailAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
