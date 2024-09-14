import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoConfirmationModalComponent } from './yes-no-confirmation-modal.component';

describe('YesNoConfirmationModalComponent', () => {
  let component: YesNoConfirmationModalComponent;
  let fixture: ComponentFixture<YesNoConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YesNoConfirmationModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YesNoConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
