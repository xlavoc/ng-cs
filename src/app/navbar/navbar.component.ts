import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SearchParams } from '../search-params.model';
import { ErrorAlert } from '../error-alert.model';

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
  @Output() errorOccurred = new EventEmitter<ErrorAlert>();
  datesError: ErrorAlert = null;

  ngOnInit(): void {}

  onSearchFlights() {
    const flightName = this.flightNameInputRef.nativeElement.value;
    const flightDateRange = this.flightDateRangeInputRef.nativeElement.value;
    const flightShowSuccess =
      this.showSuccessFlightsCheckboxRef.nativeElement.checked;
    this.datesError = null;

    const extractDates = (str: string) => {
      const noDates = ['', ''];
      const s = str.trim();
      if (s) {
        if (s.length < 10) {
          this.datesError = new ErrorAlert(
            'Nieprawidłowy format daty',
            'Za mało znaków',
          );
          return noDates;
        }

        if (s.length > 10 && s.search(' - ') === -1) {
          this.datesError = new ErrorAlert(
            'Nieprawidłowy format separatora dat',
            'Separator musi posiadać format " - " (spacja myślnik spacja)',
          );
          return noDates;
        }

        const cleanString = s.replace(' - ', ' ');
        const arr = cleanString.split(' ');

        for (const [i, date] of arr.entries()) {
          const format = /^\d{4}[/]\d{2}[/]\d{2}$/.test(date);

          if (!format) {
            this.datesError = new ErrorAlert(
              'Nieprawidłowy format daty',
              'Data musi posiadać format: RRRR/MM/DD',
            );
            return noDates;
          }
          const finalDate = date.replaceAll('/', '-');
          arr[i] = finalDate + 'T00:00:00.000Z';
        }

        if (arr.length === 1) return [...arr, ''];
        return arr.slice(0, 2);
      }

      return noDates;
    };

    const newSearch = new SearchParams(
      flightName,
      extractDates(flightDateRange)[0],
      extractDates(flightDateRange)[1],
      !flightShowSuccess ? undefined : true,
    );
    this.searchParamsAdded.emit(newSearch);
  }

  onErrorOccurred() {
    this.errorOccurred.emit(this.datesError);
  }
}
