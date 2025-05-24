import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotemarkItemComponent } from './notemark-item.component';

describe('NotemarkItemComponent', () => {
  let component: NotemarkItemComponent;
  let fixture: ComponentFixture<NotemarkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotemarkItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotemarkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
