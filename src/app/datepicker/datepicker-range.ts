import { Component, EventEmitter, Injectable, Output, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';


/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				year: parseInt(date[2], 10),
				month: parseInt(date[1], 10),
				day: parseInt(date[0], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}

@Component({
	selector: 'ngbd-datepicker-range',
	standalone: true,
	imports: [NgbDatepickerModule, FormsModule, JsonPipe],
	templateUrl: './datepicker-range.html',
  providers: [
		// { provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
	styles: [
		`
			.custom-day {
				text-align: center;
				padding: 0.185rem 0.25rem;
				display: inline-block;
				height: 2rem;
				width: 2rem;
			}
			.custom-day.focused {
				background-color: #e6e6e6;
			}
			.custom-day.range,
			.custom-day:hover {
				background-color: rgb(2, 117, 216);
				color: white;
			}
			.custom-day.faded {
				background-color: rgba(2, 117, 216, 0.5);
			}
		`,
	],
})
export class NgbdDatepickerRange {
	calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);

  today = this.calendar.getToday();
	hoveredDate: NgbDate | null = null;
	toDate: NgbDate | null = null; // this.today;
	fromDate: NgbDate = null; // this.calendar.getPrev(this.toDate, 'y', 1);
  @Output() dateRangeInput = new EventEmitter<string>();

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  isDisabled(date: NgbDate) {
    return date.after(this.today);
  }

  onDateRangeInput() {
    this.dateRangeInput.emit(`${this.formatter.format(this.fromDate)} - ${this.formatter.format(this.toDate)}`);
  }

  // validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
	// 	const parsed = this.formatter.parse(input);
	// 	return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	// }
}
