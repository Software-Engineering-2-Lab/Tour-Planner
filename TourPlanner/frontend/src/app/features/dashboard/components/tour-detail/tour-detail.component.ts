import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService } from '../../../../core/services/tour.service';
import { Tour } from '../../../../core/models/tour.model';
import { TourLog } from '../../../../core/models/tour-log.model';
import { MapComponent } from '../map/map.component';

@Component({
    selector: 'app-tour-detail',
    standalone: true,
    imports: [CommonModule, MapComponent],
    templateUrl: './tour-detail.component.html',
    styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent implements OnInit {
    selectedTour: Tour | null = null;
    tourLogs: TourLog[] = [];

    constructor(private tourService: TourService) {}

    ngOnInit(): void {
        this.tourService.selectedTour$.subscribe(tour => {
            this.selectedTour = tour;
            if (tour) {
                this.tourLogs = this.tourService.getLogsForTour(tour.id);
            }
        });
    }
}