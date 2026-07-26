package com.praladneupane.hamropasal.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
        @NotBlank(message = "full name is required")
        @Size(min = 2, max = 100, message = "full name must be between 2 and 100 characters")
        String fullName,

        @NotBlank(message = "email is required")
        @Email(message = "email must be a valid email address")
        String email,

        @NotBlank(message = "password is required")
        @Size(min = 8, max = 64, message = "password must be between 8 and 64 characters")
        String password,

        @NotBlank(message = "contact number is required")
        @Pattern(regexp = "^[+]?[0-9]{7,15}$", message = "contact number must be a valid phone number (7–15 digits, optional leading +)")
        String contactNumber
) {

}
