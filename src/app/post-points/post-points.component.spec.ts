import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPointsComponent } from './post-points.component';

describe('PostPointsComponent', () => {
  let component: PostPointsComponent;
  let fixture: ComponentFixture<PostPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
