package com.tourplanner.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tourplanner.backend.type.TransportType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TourDTO {
    private Long id;
    private String name;
    private String description;
    private String fromLocation;
    private String toLocation;
    private TransportType transportType;
    private Double distance;
    private Double estimatedTime;
    private String routeImagePath;
    private Integer popularity;
    private Double childFriendliness;
    private Long userId;
}
