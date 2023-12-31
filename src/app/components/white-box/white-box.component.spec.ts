import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteBoxComponent } from './white-box.component';

describe('WhiteBoxComponent', () => {
  let component: WhiteBoxComponent;
  let fixture: ComponentFixture<WhiteBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhiteBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
