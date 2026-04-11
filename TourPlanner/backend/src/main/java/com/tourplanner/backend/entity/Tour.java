package com.tourplanner.backend.entity;

import jakarta.persistence.*;
import com.tourplanner.backend.type.TransportType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "description", nullable = true, length = 50)
    private String description;

    @Column(name = "from_location", nullable = false, length = 50)
    private String fromLocation;

    @Column(name = "to_location", nullable = false, length = 50)
    private String toLocation;

    @Enumerated(EnumType.STRING)
    @Column(name = "transport_type", nullable = false, length = 20)
    private TransportType transportType;

    @Column(name = "distance", nullable = true)
    private Double distance;

    @Column(name = "estimated_time", nullable = true)
    private Double estimatedTime;

    @Column(name = "route_image_path", nullable = true)
    private String routeImagePath;

    @Column(name = "popularity", nullable = true)
    private Integer popularity;

    @Column(name = "child_friendliness", nullable = true)
    private Double childFriendliness;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Log> logs = new ArrayList<>();
}
