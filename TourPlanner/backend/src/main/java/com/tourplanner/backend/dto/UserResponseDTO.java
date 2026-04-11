package com.tourplanner.backend.dto;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class UserResponseDTO {
    private String username;
    private String email;
    private String password;
}
