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
        { id: 101, tourId: 1, dateTime: '2026-03-15 10:00', comment: 'Perfect weather, bit windy at the top.', difficulty: 7, totalDistance: 13.2, totalTime: 5.0, rating: 5 },
        { id: 102, tourId: 1, dateTime: '2026-03-20 09:30', comment: 'Foggy, path was slippery.', difficulty: 9, totalDistance: 12.0, totalTime: 6.2, rating: 3 }
    ];

    private selectedTourSubject = new BehaviorSubject<Tour | null>(this.tours[0]);
    selectedTour$ = this.selectedTourSubject.asObservable();

    getTours(): Tour[] {
        return this.tours;
    }

    getLogsForTour(tourId: number): TourLog[] {
        return this.logs.filter(log => log.tourId === tourId);
    }

    selectTour(tour: Tour): void {
        this.selectedTourSubject.next(tour);
    }
}