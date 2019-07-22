import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatAutocompleteModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  const correctText = 'test query';
  const correctSuggestions = ['test suggestion', 'test suggestion 2'];
  const searchQuery = { type: 'search', text: correctText };
  const suggestQuery = { type: 'suggest', text: correctText };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        FormsModule, ReactiveFormsModule,
        MatAutocompleteModule, MatButtonModule, MatIconModule, MatInputModule,
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

    it('should emit \'search\' query on button click', () => {
      spyOn(component.query, 'emit');
      component.emitQuery(correctText);
      expect(component.query.emit).toHaveBeenCalledWith(searchQuery);
    });

    it('should emit \'suggest\' query while typing', fakeAsync(() => {
      spyOn(component.query, 'emit');
      component.searchFormGroup.get('query').setValue(correctText);
      tick(200);
      expect(component.query.emit).toHaveBeenCalledWith(suggestQuery);
    }));

    it('should show autocomplete when suggestions are available', async(() => {
      component.suggestions$.subscribe(suggestions => expect(suggestions).toEqual(correctSuggestions));
      component.suggestions = correctSuggestions;
    }));
  });

  describe('Query form control', () => {

    it('should create', () => {
      expect(component.searchFormGroup.controls.query).toBeTruthy();
    });
  });
});
