import { Component, OnInit } from '@angular/core';
import { SearchParams } from '../search-params.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchParams: SearchParams = {};

  ngOnInit(): void {}

  onSearchParamsAdded(searchParams: SearchParams) {
    this.searchParams = searchParams;
  }
}
