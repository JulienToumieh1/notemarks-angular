import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotemarksComponent } from './notemarks.component';

describe('NotemarksComponent', () => {
  let component: NotemarksComponent;
  let fixture: ComponentFixture<NotemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotemarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
