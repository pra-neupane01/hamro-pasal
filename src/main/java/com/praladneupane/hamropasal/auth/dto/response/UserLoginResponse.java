package com.praladneupane.hamropasal.auth.dto.response;

import com.praladneupane.hamropasal.user.model.Role;

public record UserLoginResponse(
        Long id,
        String fullName,
        String email,
        String contactNumber,
        Role role,
        String token
) {
}
