import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsAgGridComponent } from './elements-ag-grid.component';

describe('ElementsAgGridComponent', () => {
  let component: ElementsAgGridComponent;
  let fixture: ComponentFixture<ElementsAgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsAgGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ElementsAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
