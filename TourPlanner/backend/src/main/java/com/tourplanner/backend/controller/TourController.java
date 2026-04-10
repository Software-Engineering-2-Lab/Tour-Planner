package com.tourplanner.backend.controller;


import com.tourplanner.backend.dto.SearchResultDTO;
import com.tourplanner.backend.dto.TourDTO;
import com.tourplanner.backend.service.ITourService;
import com.tourplanner.backend.service.impl.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // This tells Spring that AuthController transforms all returned objs in JSON text.
@RequestMapping("/api/tours") // All routes will start with /api/tours (indicates the path).
@RequiredArgsConstructor
public class TourController {

    private final ITourService tourService;

    @GetMapping
    public ResponseEntity<List<TourDTO>> getAllTours() {
        return ResponseEntity.ok(tourService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourDTO> getTourById(@PathVariable Long id) {
        return ResponseEntity.ok(tourService.findById(id));
    }

    @PostMapping
    public ResponseEntity<TourDTO> createTour(@RequestBody TourDTO tourDTO) {
        TourDTO created = tourService.create(tourDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<TourDTO> updateTour(@PathVariable Long id ,@RequestBody TourDTO tourDTO){
        return ResponseEntity.ok(tourService.update(id, tourDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        tourService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<SearchResultDTO> searchTours(@RequestParam String query) {
        return ResponseEntity.ok(tourService.search(query));
    }

}
