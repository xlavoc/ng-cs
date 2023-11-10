import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Output() closeDetailPanel = new EventEmitter<boolean>();
  @Input() flightData: Flight;

  ngOnInit(): void {}

  onClose() {
    this.closeDetailPanel.emit(false);
  }
}