import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingManageComponent } from './rating-manage.component';

describe('RatingManageComponent', () => {
  let component: RatingManageComponent;
  let fixture: ComponentFixture<RatingManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
