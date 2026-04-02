import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tour } from '../models/tour.model';
import { TourLog } from '../models/tour-log.model';

@Injectable({
    providedIn: 'root'
})
export class TourService {
    private tours: Tour[] = [
        { id: 1, name: 'Mountain Hike', description: 'Deep forest trail', fromLocation: 'Vienna', toLocation: 'Schneeberg', transportType: 'HIKE', distance: 12.5, estimatedTime: 4.5, routeImagePath: '', popularity: 5, childFriendliness: 2 },
        { id: 2, name: 'Danube Bike Route', description: 'Scenic river path', fromLocation: 'Linz', toLocation: 'Vienna', transportType: 'BIKE', distance: 180.0, estimatedTime: 12.0, routeImagePath: '', popularity: 4, childFriendliness: 5 }
    ];

    private logs: TourLog[] = [
        { id: 101, tourId: 1, dateTime: '2026-03-15 10:00', comment: 'Perfect weather, bit windy at the top.', difficulty: 'Medium', totalDistance: 13.2, totalTime: 5.0, rating: 5 },
        { id: 102, tourId: 1, dateTime: '2026-03-20 09:30', comment: 'Foggy, path was slippery.', difficulty: 'Hard', totalDistance: 12.0, totalTime: 6.2, rating: 3 }
    ];

    constructor() {
        this.tours.forEach(tour => {
            this.updateTourStats(tour.id);
        });
    }

    private toursSubject = new BehaviorSubject<Tour[]>(this.tours);
    tours$ = this.toursSubject.asObservable();
    private selectedTourSubject = new BehaviorSubject<Tour | null>(this.tours[0]);
    selectedTour$ = this.selectedTourSubject.asObservable();
    



    getTours(): Tour[] {
        return this.tours;
    }

    getLogsForTour(tourId: number): TourLog[] {
        return this.logs.filter(log => log.tourId === tourId);
    }

    selectTour(tour: Tour): void {
        const updatedTour = this.tours.find(t => t.id === tour.id);
        if (updatedTour) {
            this.selectedTourSubject.next({ ...updatedTour });
        }
    }

    private updateTourStats(tourId: number): void {
        const tourLogs = this.logs.filter(log => log.tourId === tourId);
        const tourIndex = this.tours.findIndex(t => t.id === tourId);

        if (tourIndex === -1) return;

        if (tourLogs.length === 0) {
            this.tours[tourIndex].popularity = undefined;
            this.tours[tourIndex].childFriendliness = undefined;
        } else {
            const sumRating = tourLogs.reduce((sum, log) => sum + log.rating, 0);
            this.tours[tourIndex].popularity = Math.round((sumRating / tourLogs.length)*10) / 10;

            const diffMap: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
            const sumDiff = tourLogs.reduce((sum, log) => sum + diffMap[log.difficulty], 0);
            this.tours[tourIndex].childFriendliness = Math.round(sumDiff / tourLogs.length);
        }

        const currentTour = this.selectedTourSubject.value;
        if (currentTour && currentTour.id === tourId) {
            this.selectedTourSubject.next({ ...this.tours[tourIndex] });
        }
    }

    addLog(newLog: TourLog): void {
        const nextId = this.logs.length > 0 
            ? Math.max(...this.logs.map(l => l.id)) + 1 
            : 100;

        const logWithId = { ...newLog, id: nextId };
        this.logs.push(logWithId);
        this.updateTourStats(newLog.tourId);
    }

    deleteLog(logId: number, tourId: number): void {
        this.logs = this.logs.filter(l => l.id !== logId);
        this.updateTourStats(tourId);
    }

    updateLog(updatedLog: TourLog): void {
        const index = this.logs.findIndex(l => l.id === updatedLog.id);
        if (index !== -1) {
            this.logs[index] = { ...updatedLog };
            this.updateTourStats(updatedLog.tourId);
        }
    }

    deleteTour(tourId: number): void {
        this.tours = this.tours.filter(t => t.id !== tourId);
        this.logs = this.logs.filter(l => l.tourId !== tourId);

        this.toursSubject.next([...this.tours]);

        const current = this.selectedTourSubject.value;
        if (current && current.id === tourId) {
            this.selectedTourSubject.next(null);
        }
    }

    addTour(newTour: Tour): void {
        const nextId = this.tours.length > 0 ? Math.max(...this.tours.map(t => t.id)) + 1 : 1;
        const tourWithId = { ...newTour, id: nextId };
        this.tours.push(tourWithId);
    
        this.toursSubject.next([...this.tours]); 
        this.selectTour(tourWithId);
    }

    updateTour(updatedTour: Tour): void {
        const index = this.tours.findIndex(t => t.id === updatedTour.id);
        if (index !== -1) {
            this.tours[index] = { ...updatedTour };
            this.toursSubject.next([...this.tours]); 
            this.selectedTourSubject.next({ ...this.tours[index] });
        }
    }
}