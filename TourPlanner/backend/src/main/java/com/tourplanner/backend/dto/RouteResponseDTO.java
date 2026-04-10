package com.tourplanner.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteResponseDTO {

    private double distance;
    private double estimatedtime;
    private String mapImageUrl;
    private String geometryJson;
    //o sa fie mai multe campuri


}
