package com.praladneupane.hamropasal.user.repository;

import com.praladneupane.hamropasal.user.model.User;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}