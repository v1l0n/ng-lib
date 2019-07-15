import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  const correctQuery = 'test query';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        FormsModule, ReactiveFormsModule,
        MatButtonModule, MatInputModule,
        FlexLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Search form', () => {

    it('should create', () => {
      expect(component.searchFormGroup).toBeTruthy();
    });

    it('should emit query on enter key', () => {
      spyOn(component.query, 'emit');
      component.onEnter(correctQuery);
      expect(component.query.emit).toHaveBeenCalledWith(correctQuery);
    });
  });

  describe('Query form control', () => {

    it('should create', () => {
      expect(component.searchFormGroup.controls.query).toBeTruthy();
    });
  });
});
