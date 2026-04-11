package com.tourplanner.backend.service;

import com.tourplanner.backend.dto.LogDTO;
import java.util.List;

public interface ILogService {
    
    List<LogDTO> findByTourId(Long tourId);
    
    LogDTO create(Long tourId, LogDTO dto);

    LogDTO update(Long tourId, Long logId, LogDTO dto);
    
    void delete(Long id);
}