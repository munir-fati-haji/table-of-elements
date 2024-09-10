import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

interface Test {
  id: 10
}

describe('TableComponent', () => {
  let component: TableComponent<Test>;
  let fixture: ComponentFixture<TableComponent<Test>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent<Test>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
