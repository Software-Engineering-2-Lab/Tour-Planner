package com.tourplanner.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteResponseDTO {

    private Double distance;
    private Double estimatedTime;
    private String mapImageUrl;
    private String geometryJson;
    //o sa fie mai multe campuri


}
