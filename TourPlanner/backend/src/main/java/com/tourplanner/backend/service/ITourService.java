package com.tourplanner.backend.service;

import com.tourplanner.backend.dto.SearchResultDTO;
import com.tourplanner.backend.dto.TourDTO;

import java.util.List;

public interface ITourService {

    TourDTO create(TourDTO tourDTO);
    TourDTO update (long id , TourDTO tourDTO);
    void delete (long id);
    TourDTO findById(long id);
    SearchResultDTO search(String query);
    List<TourDTO> findByUserId(Long userId);
}
