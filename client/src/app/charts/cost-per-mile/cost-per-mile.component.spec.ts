import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPerMileComponent } from './cost-per-mile.component';

describe('CostPerMileComponent', () => {
  let component: CostPerMileComponent;
  let fixture: ComponentFixture<CostPerMileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostPerMileComponent]
    });
    fixture = TestBed.createComponent(CostPerMileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
