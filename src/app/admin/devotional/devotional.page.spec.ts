import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevotionalPage } from './devotional.page';

describe('DevotionalPage', () => {
  let component: DevotionalPage;
  let fixture: ComponentFixture<DevotionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevotionalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevotionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
