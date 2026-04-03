import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService } from '../../../../core/services/tour.service';
import { Tour } from '../../../../core/models/tour.model';
import { TourLog } from '../../../../core/models/tour-log.model';
import { MapComponent } from '../map/map.component';
import { LogModalComponent } from '../modals/log-modal/log-modal.component';
import { TourModalComponent } from '../modals/tour-modal/tour-modal.component';
import { TourPhotosComponent } from '../tour-photos/tour-photos.component';

type TourTab = 'details' | 'photos';

@Component({
    selector: 'app-tour-detail',
    standalone: true,
    imports: [CommonModule, MapComponent, LogModalComponent, TourModalComponent, TourPhotosComponent],
    templateUrl: './tour-detail.component.html',
    styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent implements OnInit {
    selectedTour: Tour | null = null;
    tourLogs: TourLog[] = [];
    isLogModalOpen = false;
    selectedLogForEdit?: TourLog;
    isTourModalOpen = false;
    activeTab: TourTab = 'details';

    setActiveTab(tab: TourTab): void {
        this.activeTab = tab;
    }
    

    constructor(private tourService: TourService) {}

    ngOnInit(): void {
        this.tourService.selectedTour$.subscribe(tour => {
            this.selectedTour = tour;
            this.activeTab = 'details';
            if (tour) {
                this.tourLogs = this.tourService.getLogsForTour(tour.id);
            }
        });
    }


    openEditLog(log: TourLog): void {
        this.selectedLogForEdit = log;
        this.isLogModalOpen = true;
    }

    openLogModal(): void {
        this.isLogModalOpen = true;
    }

    closeLogModal(): void {
        this.isLogModalOpen = false;
        this.selectedLogForEdit = undefined;
    }

    onDeleteLog(logId: number): void {
        if (confirm('Are you sure you want to delete this log?')) {
            this.tourService.deleteLog(logId, this.selectedTour!.id);
        }
    }

    getFriendlyLabel(value: number | undefined): string {
        if (!value) return '?';
    
        switch(value) {
            case 1: return 'EASY';
            case 2: return 'MEDIUM';
            case 3: return 'HARD';
            default: return 'MEDIUM';
        }
    }

    openEditTour(): void {
        this.isTourModalOpen = true;
    }

    onDeleteTour(): void {
        if (this.selectedTour && confirm('Stergi definitiv acest tur si toate log-urile sale?')) {
            this.tourService.deleteTour(this.selectedTour.id);
        }
    }
}