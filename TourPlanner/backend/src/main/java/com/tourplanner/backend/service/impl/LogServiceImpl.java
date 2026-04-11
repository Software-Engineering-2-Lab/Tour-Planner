package com.tourplanner.backend.service.impl;

import com.tourplanner.backend.dto.LogDTO;
import com.tourplanner.backend.entity.Log;
import com.tourplanner.backend.entity.Tour;
import com.tourplanner.backend.repository.LogRepository;
import com.tourplanner.backend.repository.TourRepository;
import com.tourplanner.backend.service.ILogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LogServiceImpl implements ILogService {

    private final LogRepository logRepository;
    private final TourRepository tourRepository;

    @Override
    public List<LogDTO> findByTourId(Long tourId) {
        return logRepository.findByTourId(tourId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LogDTO create(Long tourId, LogDTO dto) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        Log log = new Log();
        log.setDateTime(dto.getDateTime());
        log.setComment(dto.getComment());
        log.setDifficulty(dto.getDifficulty());
        log.setTotalDistance(dto.getTotalDistance());
        log.setTotalTime(dto.getTotalTime());
        log.setRating(dto.getRating());
        log.setTour(tour);

        return mapToDTO(logRepository.save(log));
    }

    @Override
    public void delete(Long id) {
        logRepository.deleteById(id);
    }

    private LogDTO mapToDTO(Log log) {
        return LogDTO.builder()
                .id(log.getId())
                .dateTime(log.getDateTime())
                .comment(log.getComment())
                .difficulty(log.getDifficulty())
                .totalDistance(log.getTotalDistance())
                .totalTime(log.getTotalTime())
                .rating(log.getRating())
                .tourId(log.getTour().getId())
                .build();
    }

    @Override
    @Transactional
    public LogDTO update(Long tourId, Long logId, LogDTO dto) {
        Log existingLog = logRepository.findById(logId)
            .orElseThrow(() -> new RuntimeException("Log not found"));

        existingLog.setDateTime(dto.getDateTime());
        existingLog.setComment(dto.getComment());
        existingLog.setDifficulty(dto.getDifficulty());
        existingLog.setTotalDistance(dto.getTotalDistance());
        existingLog.setTotalTime(dto.getTotalTime());
        existingLog.setRating(dto.getRating());

        return mapToDTO(logRepository.save(existingLog));
    }
}