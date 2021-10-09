import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesInfoAllComponent } from './packages-info-all.component';

describe('PackagesInfoAllComponent', () => {
  let component: PackagesInfoAllComponent;
  let fixture: ComponentFixture<PackagesInfoAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesInfoAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesInfoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
