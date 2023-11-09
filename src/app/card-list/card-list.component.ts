import { Component, OnInit } from '@angular/core';
import { FetchSpacexApiDataService } from '../fetch-spacex-api-data.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  loadedData: Flight[] = [];
  isFetching = false;
  hasNextPage = false;
  page = 1;

  constructor(private fetchDataService: FetchSpacexApiDataService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.fetchDataService.fetchData().subscribe((res) => {
      this.isFetching = false;
      this.hasNextPage = res.hasNextPage;
      this.loadedData = res.docs;
    });
  }

  onLoadMore() {
    this.isFetching = true;
    this.page += 1;
    this.fetchDataService.fetchData(this.page).subscribe((res) => {
      this.isFetching = false;
      this.hasNextPage = res.hasNextPage;
      this.loadedData.push(...res.docs);
    });
  }
}
