package com.tourplanner.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogDTO {

    private long id;
    private LocalDateTime dateTime;
    private String comment;
    private int difficulty;
    private int totalDistance;
    private int totalTime;
    private int rating;
    private long tourId;


}
