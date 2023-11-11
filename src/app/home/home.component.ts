import { Component, OnInit } from '@angular/core';
import { SearchParams } from '../search-params.model';
import { ErrorAlert } from '../error-alert.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchParams: SearchParams = {};
  errorOccurred: ErrorAlert = null;

  ngOnInit(): void {}

  onSearchParamsAdded(searchParams: SearchParams) {
    this.searchParams = searchParams;
  }

  onErrorOccurred(errorOccurred: ErrorAlert) {
    this.errorOccurred = errorOccurred;
  }
}
