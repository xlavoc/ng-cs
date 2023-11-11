import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() flightData?: Flight;

  ngOnInit(): void {}

  getPhoto(): string | boolean {
    const mainThumb = this.flightData.links.flickr.small[0];
    const mainBig = this.flightData.links.flickr.original[0];
    const rocket = this.flightData.rocket.flickr_images[0];

    return mainThumb || mainBig || rocket || false;
  }
}
