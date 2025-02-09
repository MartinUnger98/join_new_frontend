import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpviewComponent } from './helpview.component';

describe('HelpviewComponent', () => {
  let component: HelpviewComponent;
  let fixture: ComponentFixture<HelpviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
