package com.praladneupane.hamropasal.auth.dto.response;

import com.praladneupane.hamropasal.user.model.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public record UserLoginResponse(
        Long id,
        String fullName,
        String email,
        String contactNumber,
        Role role,
        String token
) {
}
