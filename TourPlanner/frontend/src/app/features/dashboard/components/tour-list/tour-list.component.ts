import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tour } from '../../../../core/models/tour.model';
import { TourService } from '../../../../core/services/tour.service';
import { TourModalComponent } from '../modals/tour-modal/tour-modal.component';

@Component({
    selector: 'app-tour-list',
    standalone: true,
    imports: [CommonModule, TourModalComponent],
    templateUrl: './tour-list.component.html',
    styleUrl: './tour-list.component.scss'
})
export class TourListComponent implements OnInit {
    tours: Tour[] = [];
    selectedTourId: number | null = null;
    isTourModalOpen = false;
    
    constructor(private tourService: TourService) {}
    
    ngOnInit(): void {
        this.tourService.tours$.subscribe(updatedList => {
            this.tours = updatedList;
        });
    }
    
    selectTour(tour: Tour): void {
        this.selectedTourId = tour.id;
        this.tourService.selectTour(tour);
    }

    openAddTour(): void {
        this.isTourModalOpen = true;
    }

    closeTourModal(): void {
        this.isTourModalOpen = false;
    }
}