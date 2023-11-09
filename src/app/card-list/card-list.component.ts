import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FetchSpacexApiDataService } from '../fetch-spacex-api-data.service';
import { Flight } from '../flight.model';
import { SearchParams } from '../search-params.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnChanges {
  loadedData: Flight[] = [];
  isFetching = false;
  hasNextPage = false;
  page = 1;
  @Input() searchParams: SearchParams = null;

  constructor(private fetchDataService: FetchSpacexApiDataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.searchParams.firstChange) {
      this.fetchData();
    }
  }

  onLoadMore() {
    this.page += 1;
    this.fetchData(true);
  }

  fetchData(keepPreviousData?: boolean) {
    this.isFetching = true;
    this.fetchDataService
      .fetchData(this.page, this.searchParams.name, this.searchParams.isSuccess)
      .subscribe((res) => {
        console.log(res);
        this.isFetching = false;
        this.hasNextPage = res.hasNextPage;
        if (keepPreviousData) {
          this.loadedData.push(...res.docs);
          return;
        }
        this.loadedData = res.docs;
      });
  }
}
