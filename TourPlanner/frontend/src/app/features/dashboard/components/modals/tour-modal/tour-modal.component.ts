import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../../../../core/services/tour.service';
import { Tour } from '../../../../../core/models/tour.model';

@Component({
    selector: 'app-tour-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './tour-modal.component.html',
    styleUrl: './tour-modal.component.scss'
})
export class TourModalComponent implements OnInit {
    @Input() editTour?: Tour;
    @Output() close = new EventEmitter<void>();

    name: string = '';
    description: string = '';
    fromLocation: string = '';
    toLocation: string = '';
    transportType: 'BIKE' | 'HIKE' | 'RUNNING' | 'VACATION' = 'BIKE';

    distance: number = 0;
    estimatedTime: number = 0;

    setTransport(type: 'BIKE' | 'HIKE' | 'RUNNING' | 'VACATION'): void {
        this.transportType = type;
    }

    onSave(): void {
        const tourData: Tour = {
            id: this.editTour ? this.editTour.id : 0,
            name: this.name,
            description: this.description,
            fromLocation: this.fromLocation,
            toLocation: this.toLocation,
            transportType: this.transportType,
            distance: this.distance,
            estimatedTime: this.estimatedTime,
            routeImagePath: this.editTour?.routeImagePath || '',
            popularity: this.editTour?.popularity,
            childFriendliness: this.editTour?.childFriendliness
        };

    if (this.editTour) {
        this.tourService.updateTour(tourData);
    } else {
        this.tourService.addTour(tourData);
    }
    this.close.emit();
};

    constructor(private tourService: TourService) {}

    ngOnInit(): void {
        if (this.editTour) {
            this.name = this.editTour.name;
            this.description = this.editTour.description;
            this.distance = this.editTour.distance;
            this.estimatedTime = this.editTour.estimatedTime;
        }
    }

    onCancel(): void {
        this.close.emit();
    }
}