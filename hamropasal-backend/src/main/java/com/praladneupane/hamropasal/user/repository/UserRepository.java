package com.praladneupane.hamropasal.user.repository;

import com.praladneupane.hamropasal.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    boolean existsByContactNumber(String contactNumber);

    Optional<User> findByEmail(String email);

    Optional<User> findByContactNumber(String contactNumber);
}