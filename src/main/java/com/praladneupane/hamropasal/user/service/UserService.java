package com.praladneupane.hamropasal.user.service;

import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.user.dto.request.CreateUserRequest;
import com.praladneupane.hamropasal.user.dto.response.UserResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

public interface UserService {
    UserResponse create(CreateUserRequest request);

    UserResponse update(Long id, CreateUserRequest request);

    UserResponse getUserById(Long id);

    PagedResponse<UserResponse> getAllUsers(Pageable pageable);
}
