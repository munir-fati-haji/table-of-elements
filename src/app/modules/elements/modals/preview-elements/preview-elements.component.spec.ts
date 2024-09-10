import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewElementsComponent } from './preview-elements.component';

describe('PreviewElementsComponent', () => {
  let component: PreviewElementsComponent;
  let fixture: ComponentFixture<PreviewElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewElementsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
