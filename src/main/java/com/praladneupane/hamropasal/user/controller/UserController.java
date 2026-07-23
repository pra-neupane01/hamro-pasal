package com.praladneupane.hamropasal.user.controller;

import com.praladneupane.hamropasal.common.dto.request.PaginationRequest;
import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.user.dto.request.CreateUserRequest;
import com.praladneupane.hamropasal.user.dto.response.UserResponse;
import com.praladneupane.hamropasal.user.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.converters.models.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userService;

    @PostMapping("/register")
    public ResponseEntity<APIResponse<UserResponse>> registerUser(@RequestBody @Valid CreateUserRequest request){
        UserResponse userResponse = userService.create(request);
        APIResponse<UserResponse> apiResponse = APIResponse.<UserResponse>builder()
                .data(userResponse)
                .message("User registered successfully")
                .success(true)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<APIResponse<UserResponse>> updateUser(@PathVariable Long id, @RequestBody CreateUserRequest request){
        UserResponse userResponse = userService.update(id, request);
        APIResponse<UserResponse> apiResponse = APIResponse.<UserResponse>builder()
                .success(true)
                .message("User updated successfully")
                .data(userResponse)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<UserResponse>> getUser(@PathVariable Long id){
        UserResponse userResponse = userService.getUserById(id);
        APIResponse<UserResponse> apiResponse = APIResponse.<UserResponse>builder()
                .success(true)
                .message("User fetched successfully")
                .data(userResponse)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping
    public ResponseEntity<APIResponse<PagedResponse<UserResponse>>> getUsers(PaginationRequest paginationRequest){
        PagedResponse<UserResponse> usersPage = userService.getAllUsers(paginationRequest.toPageable());
        APIResponse<PagedResponse<UserResponse>> apiResponse = APIResponse.<PagedResponse<UserResponse>>builder()
                .success(true)
                .message("Users fetched successfully")
                .data(usersPage)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }




}
