import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateContactComponent } from './dialog-create-contact.component';

describe('DialogCreateContactComponent', () => {
  let component: DialogCreateContactComponent;
  let fixture: ComponentFixture<DialogCreateContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
