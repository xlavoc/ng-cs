import { Component, OnInit } from '@angular/core';
import { FetchSpacexApiDataService } from '../fetch-spacex-api-data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})

export class CardListComponent implements OnInit {
  loadedData = [];
  isFetching = false;

  constructor(private fetchDataService: FetchSpacexApiDataService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.fetchDataService.fetchData().subscribe(res => {
      this.isFetching = false;
      //this.loadedData = res.docs;
      console.log(res);

    });
  }
}
