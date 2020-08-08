import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AudioplayerPage } from './audioplayer.page';

describe('AudioplayerPage', () => {
  let component: AudioplayerPage;
  let fixture: ComponentFixture<AudioplayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioplayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AudioplayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
