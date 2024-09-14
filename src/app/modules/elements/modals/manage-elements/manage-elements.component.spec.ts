import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageElementsComponent } from './manage-elements.component';

describe('ManageElementsComponent', () => {
  let component: ManageElementsComponent;
  let fixture: ComponentFixture<ManageElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
