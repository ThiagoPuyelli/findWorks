import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendConsultComponent } from './send-consult.component';

describe('SendConsultComponent', () => {
  let component: SendConsultComponent;
  let fixture: ComponentFixture<SendConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
