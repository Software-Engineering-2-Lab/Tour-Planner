export interface TourLog {
    id: number;
    tourId: number;
    dateTime: string;
    comment: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    totalDistance: number;
    totalTime: number;
    rating: number; 
}