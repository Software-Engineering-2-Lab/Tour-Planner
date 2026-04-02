import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tour } from '../models/tour.model';

@Injectable({
    providedIn: 'root'
})
export class TourService {
    private tours: Tour[] = [
        { id: 1, name: 'Mountain Hike', description: 'Deep forest trail', fromLocation: 'Vienna', toLocation: 'Schneeberg', transportType: 'HIKE', distance: 12.5, estimatedTime: 4.5, routeImagePath: '', popularity: 5, childFriendliness: 2 },
        { id: 2, name: 'Danube Bike Route', description: 'Scenic river path', fromLocation: 'Linz', toLocation: 'Vienna', transportType: 'BIKE', distance: 180.0, estimatedTime: 12.0, routeImagePath: '', popularity: 4, childFriendliness: 5 }
    ];

    private selectedTourSubject = new BehaviorSubject<Tour | null>(this.tours[0]);
    selectedTour$ = this.selectedTourSubject.asObservable();

    getTours(): Tour[] {
        return this.tours;
    }

    selectTour(tour: Tour): void {
        this.selectedTourSubject.next(tour);
    }
}