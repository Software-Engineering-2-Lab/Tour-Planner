package com.tourplanner.backend.repository;

import com.tourplanner.backend.entity.Tour;
import com.tourplanner.backend.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {

    List<Log> findByTourId(Long tourId);

    List<Log> findByTour(Tour tour);

}
