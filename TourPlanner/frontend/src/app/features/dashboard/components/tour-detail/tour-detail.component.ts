import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService } from '../../../../core/services/tour.service';
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
export class TourDetailComponent {
    private tourService = inject(TourService);

    activeTab = signal<TourTab>('details');
    isLogModalOpen = signal(false);
    isTourModalOpen = signal(false);
    selectedLogForEdit = signal<TourLog | undefined>(undefined);
    searchTerm = signal('');

    selectedTour = this.tourService.selectedTour;
    
    filteredLogs = computed(() => {
        const term = this.searchTerm().toLowerCase();
        const logs = this.tourService.selectedTourLogs();

        if (!term) return logs;

        return logs.filter(log => {
            const commentMatch = log.comment.toLowerCase().includes(term);
            const diffMatch = log.difficulty.toLowerCase().includes(term);

            // Convert log date to visual format dd.mm.yyyy
            const dateObj = new Date(log.dateTime);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = String(dateObj.getFullYear()).slice(-2);
            const visualDate = `${day}.${month}.${year}`;

            const dateMatch = visualDate.includes(term) || log.dateTime.includes(term);

            return commentMatch || diffMatch || dateMatch;
        });
    });

    constructor() {
        effect(() => {
            this.selectedTour();
            this.activeTab.set('details');
        }, { allowSignalWrites: true });
    }

    setActiveTab(tab: TourTab): void {
        this.activeTab.set(tab);
    }

    onSearchChange(event: Event): void {
        this.searchTerm.set((event.target as HTMLInputElement).value);
    }

    openLogModal(): void {
        this.isLogModalOpen.set(true);
    }

    openEditLog(log: TourLog): void {
        this.selectedLogForEdit.set(log);
        this.isLogModalOpen.set(true);
    }

    closeLogModal(): void {
        this.isLogModalOpen.set(false);
        this.selectedLogForEdit.set(undefined);
    }

    onDeleteLog(logId: number): void {
        const tour = this.selectedTour();
        if (tour && confirm('Are you sure you want to delete this log?')) {
            this.tourService.deleteLog(logId, tour.id);
        }
    }

    openEditTour(): void {
        this.isTourModalOpen.set(true);
    }

    onDeleteTour(): void {
        const tour = this.selectedTour();
        if (tour && confirm('Permanently delete this tour and all its logs?')) {
            this.tourService.deleteTour(tour.id);
        }
    }

    getFriendlyLabel(value: number | undefined): string {
        if (value === undefined) return '?';
        const labels: Record<number, string> = { 1: 'EASY', 2: 'MEDIUM', 3: 'HARD' };
        return labels[value] || 'MEDIUM';
    }
}