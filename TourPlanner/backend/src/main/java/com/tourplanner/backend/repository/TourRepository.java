package com.tourplanner.backend.repository;

import com.tourplanner.backend.entity.Tour;
import com.tourplanner.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour,Long> {

    List<Tour> findByNameContainingIgnoreCase(String name);

    List<Tour> findByUser(User user);

    @Query("SELECT DISTINCT t FROM Tour t LEFT JOIN t.logs l WHERE " +
            "LOWER(t.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(l.comment) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Tour> fullTextSearch(@Param("q") String text);

    List<Tour> findByUserId(Long userId);
}
