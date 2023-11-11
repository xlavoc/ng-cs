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
  activeSlide = 1;

  ngOnInit(): void {}

  onClose() {
    this.closeDetailPanel.emit(false);
  }

  onSlide(event) {
    this.activeSlide = event.to + 1;
  }

  getAllImages(): string[] {
    const mainImgs = this.flightData.links.flickr.original;
    const rocketImgs = this.flightData.rocket.flickr_images;

    return [...mainImgs, ...rocketImgs];
  }
}
