import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPerComponent } from './dashboard-per.component';

describe('DashboardPerComponent', () => {
  let component: DashboardPerComponent;
  let fixture: ComponentFixture<DashboardPerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
