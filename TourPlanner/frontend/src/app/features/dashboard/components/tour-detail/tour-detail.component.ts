import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-tour-detail',
  imports: [MapComponent],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss',
})
export class TourDetailComponent {}
