import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateButtonsAdminComponent } from './update-buttons-admin.component';

describe('UpdateButtonsAdminComponent', () => {
  let component: UpdateButtonsAdminComponent;
  let fixture: ComponentFixture<UpdateButtonsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateButtonsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateButtonsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
