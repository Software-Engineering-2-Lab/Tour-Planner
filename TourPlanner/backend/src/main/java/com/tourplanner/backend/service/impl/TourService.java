package com.tourplanner.backend.service.impl;

import com.tourplanner.backend.dto.SearchResultDTO;
import com.tourplanner.backend.dto.TourDTO;
import com.tourplanner.backend.entity.Tour;
import com.tourplanner.backend.repository.TourRepository;
import com.tourplanner.backend.service.ITourService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService implements ITourService {

    private final TourRepository tourRepository;

    @Override
    @Transactional
    public TourDTO create(TourDTO dto) {
        Tour tour = new Tour();
        tour.setName(dto.getName());
        tour.setDescription(dto.getDescription());
        tour.setFromLocation(dto.getFromLocation());
        tour.setToLocation(dto.getToLocation());
        tour.setTransportType(dto.getTransportType());
        tour.setDistance(dto.getDistance());
        tour.setEstimatedTime(dto.getEstimatedTime());
        tour.setRouteImagePath(dto.getRouteImagePath()); // Adaugat

        tour.setPopularity(0);
        tour.setChildFriendliness(0.0); 

        Tour savedTour = tourRepository.save(tour);
        return mapToDTO(savedTour);
    }

    @Override
    @Transactional
    public TourDTO update (long id ,TourDTO dto){

        Tour existingTour = tourRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Tour not found with id "+id));

        existingTour.setName(dto.getName());
        existingTour.setDescription(dto.getDescription());
        existingTour.setFromLocation(dto.getFromLocation());
        existingTour.setToLocation(dto.getToLocation());
        existingTour.setTransportType(dto.getTransportType());
        existingTour.setDistance(dto.getDistance());
        existingTour.setEstimatedTime(dto.getEstimatedTime());

        existingTour.setChildFriendliness(calculateChildFriendliness());

        Tour updatedTour = tourRepository.save(existingTour);

        return mapToDTO(updatedTour);
    }

    @Override
    @Transactional
    public void delete (long id){

        if(!tourRepository.existsById(id)){
            throw new RuntimeException("Tour not found with id "+id);
        }
        tourRepository.deleteById(id);
    }

    @Override
    public List<TourDTO> findAll(){
         List<Tour> tours = tourRepository.findAll();

         return tours.stream()
                 .map(this::mapToDTO)
                 .collect(Collectors.toList());
    }

    @Override
    public TourDTO findById(long id){
         return tourRepository.findById(id)
                 .map(this::mapToDTO)
                 .orElseThrow(()-> new RuntimeException("Tour not found with id "+id));
    }

    @Override
    public SearchResultDTO search(String query) {

         List <Tour> tours = tourRepository.fullTextSearch(query);
         List <TourDTO> dtos = tours.stream()
                 .map(this::mapToDTO)
                 .toList();

         SearchResultDTO finalResult = new SearchResultDTO();
         finalResult.setTours(dtos);
         finalResult.setTotalResults(tours.size());
         finalResult.setSearchQuery(query);

         return finalResult;
    }

    private TourDTO mapToDTO(Tour tour){

         TourDTO dto = new TourDTO();
         dto.setId(tour.getId());
         dto.setName(tour.getName());
         dto.setDescription(tour.getDescription());
         dto.setFromLocation(tour.getFromLocation());
         dto.setToLocation(tour.getToLocation());
         dto.setTransportType(tour.getTransportType());
         dto.setDistance(tour.getDistance());
         dto.setEstimatedTime(tour.getEstimatedTime());
         dto.setChildFriendliness(tour.getChildFriendliness());
         dto.setPopularity(tour.getPopularity());

         return dto;
     }

    public double calculateChildFriendliness(){
        int score=0;

        return score;

    }
}
