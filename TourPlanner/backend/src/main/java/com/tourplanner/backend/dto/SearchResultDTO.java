package com.tourplanner.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResultDTO {

    private List<TourDTO> tours;
    private Integer totalResults;
    private String SearchQuery;
}
