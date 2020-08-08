import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevotionreaderPage } from './devotionreader.page';

describe('DevotionreaderPage', () => {
  let component: DevotionreaderPage;
  let fixture: ComponentFixture<DevotionreaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevotionreaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevotionreaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
