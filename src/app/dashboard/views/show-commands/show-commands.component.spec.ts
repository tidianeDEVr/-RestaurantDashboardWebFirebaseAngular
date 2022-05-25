import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCommandsComponent } from './show-commands.component';

describe('ShowCommandsComponent', () => {
  let component: ShowCommandsComponent;
  let fixture: ComponentFixture<ShowCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCommandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
