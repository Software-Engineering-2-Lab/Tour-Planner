package com.tourplanner.backend.controller;

import com.tourplanner.backend.dto.LogDTO;
import com.tourplanner.backend.service.ILogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class LogController {

    private final ILogService logService;

    @GetMapping("/{tourId}/logs")
    public ResponseEntity<List<LogDTO>> getLogsByTour(@PathVariable Long tourId) {
        return ResponseEntity.ok(logService.findByTourId(tourId));
    }

    @PostMapping("/{tourId}/logs")
    public ResponseEntity<LogDTO> createLog(@PathVariable Long tourId, @RequestBody LogDTO dto) {
        return ResponseEntity.ok(logService.create(tourId, dto));
    }

    // Label: Endpoint for updating a specific log
    @PutMapping("/{tourId}/logs/{logId}")
    public ResponseEntity<LogDTO> updateLog(
        @PathVariable Long tourId, 
        @PathVariable Long logId, 
        @RequestBody LogDTO dto) {
            return ResponseEntity.ok(logService.update(tourId, logId, dto));
        }
        
    // Label: Hierarchical delete endpoint for a specific log
    @DeleteMapping("/{tourId}/logs/{logId}")
    public ResponseEntity<Void> deleteLog(
        @PathVariable Long tourId, 
        @PathVariable Long logId) {
            logService.delete(logId);
            return ResponseEntity.noContent().build();
        }
}