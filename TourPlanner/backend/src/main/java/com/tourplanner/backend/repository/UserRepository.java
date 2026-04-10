package com.tourplanner.backend.repository;

import com.tourplanner.backend.entity.User;

import java.util.Optional;

public interface UserRepository {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
