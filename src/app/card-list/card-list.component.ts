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
import { ErrorAlert } from '../error-alert.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnChanges {
  @Input() searchParams: SearchParams = null;
  @Input() error: ErrorAlert = null;
  loadedData: Flight[] = [];
  isFetching = false;
  hasNextPage = false;
  page = 1;

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
    if (this.error) return;

    this.isFetching = true;
    this.fetchDataService
      .fetchData(
        this.page,
        this.searchParams.name,
        this.searchParams.dateFrom,
        this.searchParams.dateTo,
        this.searchParams.isSuccess,
      )
      .subscribe({
        next: (res) => {
          this.isFetching = false;
          this.hasNextPage = res.hasNextPage;
          if (keepPreviousData) {
            this.loadedData.push(...res.docs);
            return;
          }
          this.loadedData = res.docs;
        },
        error: (error) => {
          this.error = error;
          this.isFetching = false;
        },
      });
  }
}
