import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SearchParams } from '../search-params.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('flightName') flightNameInputRef: ElementRef;
  @ViewChild('flightDateRange') flightDateRangeInputRef: ElementRef;
  @ViewChild('showSuccessFlights') showSuccessFlightsCheckboxRef: ElementRef;
  @Output() searchParamsAdded = new EventEmitter<SearchParams>();
  isButtonDisabled = true;

  ngOnInit(): void {}

  // ngAfterViewInit() {
  //   const flightName = this.flightNameInputRef.nativeElement.value;
  //   const flightDateRange = this.flightDateRangeInputRef.nativeElement.value;
  //   const flightShowSuccess = this.showSuccessFlightsCheckboxRef.nativeElement.checked;

  //   if (flightName || flightDateRange || flightShowSuccess) {
  //     this.isButtonDisabled = false;
  //   }
  // }

  onSearchFlights() {
    const flightName = this.flightNameInputRef.nativeElement.value;
    const flightDateRange = this.flightDateRangeInputRef.nativeElement.value;
    const flightShowSuccess =
      this.showSuccessFlightsCheckboxRef.nativeElement.checked;
    const newSearch = new SearchParams(
      flightName,
      flightDateRange,
      !flightShowSuccess ? undefined : true,
    );
    this.searchParamsAdded.emit(newSearch);
  }
}
