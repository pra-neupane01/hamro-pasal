package com.praladneupane.hamropasal.auth.controller;

import com.praladneupane.hamropasal.auth.dto.request.UserLoginRequest;
import com.praladneupane.hamropasal.auth.dto.response.UserLoginResponse;
import com.praladneupane.hamropasal.auth.service.AuthService;
import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<APIResponse<UserLoginResponse>> loginUser(@RequestBody @Valid  UserLoginRequest request){
        UserLoginResponse loginResponse = authService.login(request);
        APIResponse<UserLoginResponse> apiResponse = APIResponse.<UserLoginResponse>builder()
                .data(loginResponse)
                .message("User logged in successfully")
                .success(true)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
