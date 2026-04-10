package com.tourplanner.backend.dto;

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

    private long id;
    private String name;
    private String description;
    private String fromLocation;
    private String toLocation;
    private TransportType transportType;
    private double distance;
    private double estimatedTime;
    private String routeImagePath;
    private int popularity;
    private double childFriendliness;
    private long userId;


}
