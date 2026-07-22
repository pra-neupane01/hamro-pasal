package com.praladneupane.hamropasal.user.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(
        @NotBlank(message = "full name is required")
        String fullName,

        @NotBlank(message = "email is required")
        @Email
        String email,

        @NotBlank(message = "password is required")
        String password,

        @NotBlank(message = "contact number is required")
        String contactNumber
) {

}
