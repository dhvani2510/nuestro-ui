import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteBlogComponent } from './complete-blog.component';

describe('CompleteBlogComponent', () => {
  let component: CompleteBlogComponent;
  let fixture: ComponentFixture<CompleteBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
