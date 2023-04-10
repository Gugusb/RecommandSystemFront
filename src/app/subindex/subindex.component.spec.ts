import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubindexComponent } from './subindex.component';

describe('SubindexComponent', () => {
  let component: SubindexComponent;
  let fixture: ComponentFixture<SubindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
