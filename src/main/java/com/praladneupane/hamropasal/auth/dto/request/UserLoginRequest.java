package com.praladneupane.hamropasal.auth.dto.request;


import jakarta.validation.constraints.NotBlank;

public record UserLoginRequest(
        @NotBlank(message = "email is required")
        String email,

        @NotBlank(message = "password is required")
        String password
) {
}
