import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../models/tour.model';
import { TourLog } from '../models/tour-log.model';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TourService {
    private http = inject(HttpClient);
    private readonly API_URL = environment.apiUrl; 

    // Mock data
    private initialTours: Tour[] = [
        { id: 1, name: 'Mountain Hike', description: 'Deep forest trail', fromLocation: 'Vienna', toLocation: 'Schneeberg', transportType: 'HIKE', distance: 12.5, estimatedTime: 4.5, routeImagePath: '', popularity: 5, childFriendliness: 2 },
        { id: 2, name: 'Danube Bike Route', description: 'Scenic river path', fromLocation: 'Linz', toLocation: 'Vienna', transportType: 'BIKE', distance: 180.0, estimatedTime: 12.0, routeImagePath: '', popularity: 4, childFriendliness: 5 }
    ];

    private initialLogs: TourLog[] = [
        { id: 101, tourId: 1, dateTime: '2026-03-15 10:00', comment: 'Perfect weather, bit windy at the top.', difficulty: 'Medium', totalDistance: 13.2, totalTime: 5.0, rating: 5 },
        { id: 102, tourId: 1, dateTime: '2026-03-20 09:30', comment: 'Foggy, path was slippery.', difficulty: 'Hard', totalDistance: 12.0, totalTime: 6.2, rating: 3 }
    ];

    tours = signal<Tour[]>(this.initialTours);
    logs = signal<TourLog[]>(this.initialLogs);
    selectedTour = signal<Tour | null>(this.initialTours[0]);

    selectedTourLogs = computed(() => {
        const tour = this.selectedTour();
        return tour ? this.logs().filter(log => log.tourId === tour.id) : [];
    });

    constructor() {
        this.tours().forEach(tour => this.updateTourStats(tour.id));
    }

    // --- API Methods  ---

    loadTours(): void {
        this.http.get<Tour[]>(`${this.API_URL}/tours`).subscribe(data => {
            this.tours.set(data);
        });
    }

    // --- Logic Methods ---

    selectTour(tour: Tour | null): void {
        this.selectedTour.set(tour);
    }

    addTour(newTour: Tour): void {
        const nextId = this.tours().length > 0 ? Math.max(...this.tours().map(t => t.id)) + 1 : 1;
        const tourWithId = { ...newTour, id: nextId };
        
        this.tours.update(current => [...current, tourWithId]);
        this.selectTour(tourWithId);
    }

    deleteTour(tourId: number): void {
        this.tours.update(current => current.filter(t => t.id !== tourId));
        this.logs.update(current => current.filter(l => l.tourId !== tourId));

        if (this.selectedTour()?.id === tourId) {
            this.selectedTour.set(null);
        }
    }

    addLog(newLog: TourLog): void {
        const nextId = this.logs().length > 0 ? Math.max(...this.logs().map(l => l.id)) + 1 : 100;
        const logWithId = { ...newLog, id: nextId };

        this.logs.update(current => [...current, logWithId]);
        this.updateTourStats(newLog.tourId);
    }

    deleteLog(logId: number, tourId: number): void {
        this.logs.update(current => current.filter(l => l.id !== logId));
        this.updateTourStats(tourId);
    }

    // to be replaced by backend logic.
    private updateTourStats(tourId: number): void {
        const tourLogs = this.logs().filter(log => log.tourId === tourId);
        
        this.tours.update(allTours => {
            return allTours.map(t => {
                if (t.id !== tourId) return t;

                if (tourLogs.length === 0) {
                    return { ...t, popularity: undefined, childFriendliness: undefined };
                }

                const sumRating = tourLogs.reduce((sum, log) => sum + log.rating, 0);
                const avgRating = Math.round((sumRating / tourLogs.length) * 10) / 10;

                const diffMap: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
                const sumDiff = tourLogs.reduce((sum, log) => sum + diffMap[log.difficulty], 0);
                const avgChild = Math.round(sumDiff / tourLogs.length);

                return { ...t, popularity: avgRating, childFriendliness: avgChild };
            });
        });

        const current = this.selectedTour();
        if (current?.id === tourId) {
            const updated = this.tours().find(t => t.id === tourId);
            if (updated) this.selectedTour.set({ ...updated });
        }
    }

    updateLog(updatedLog: TourLog): void {
        this.logs.update(current => {
            const index = current.findIndex(l => l.id === updatedLog.id);
            if (index !== -1) {
                const newLogs = [...current];
                newLogs[index] = { ...updatedLog };
                return newLogs;
            }
            return current;
        });
        this.updateTourStats(updatedLog.tourId);
    }

    updateTour(updatedTour: Tour): void {
        this.tours.update(current => {
            const index = current.findIndex(t => t.id === updatedTour.id);
            if (index !== -1) {
                const newTours = [...current];
                newTours[index] = { ...updatedTour };
                return newTours;
            }
            return current;
        });
    
        if (this.selectedTour()?.id === updatedTour.id) {
            this.selectedTour.set({ ...updatedTour });
        }
    }
}