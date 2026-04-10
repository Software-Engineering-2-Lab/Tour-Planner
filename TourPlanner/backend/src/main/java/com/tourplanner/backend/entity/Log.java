package com.tourplanner.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="date_time",nullable = false)
    LocalDateTime dateTime = LocalDateTime.now();

    @Column(name="comment")
    private String comment;

    @Column(name = "difficulty", nullable = false)
    private int difficulty;

    @Column(name = "total_distance", nullable = false)
    private double totalDistance;

    @Column(name = "total_time", nullable = false)
    private double totalTime;

    @Column(name = "rating", nullable = false)
    private int rating;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
}


