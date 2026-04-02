import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tour } from '../../../../core/models/tour.model';
import { TourService } from '../../../../core/services/tour.service';

@Component({
    selector: 'app-tour-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tour-list.component.html',
    styleUrl: './tour-list.component.scss'
})
export class TourListComponent implements OnInit {
    tours: Tour[] = [];
    selectedTourId: number | null = null;

    constructor(private tourService: TourService) {}

    ngOnInit(): void {
        this.tours = this.tourService.getTours();
        this.tourService.selectedTour$.subscribe(tour => {
            this.selectedTourId = tour ? tour.id : null;
        });
    }

    selectTour(tour: Tour): void {
        this.selectedTourId = tour.id;
        this.tourService.selectTour(tour);
    }
}