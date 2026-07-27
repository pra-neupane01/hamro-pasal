    package com.praladneupane.hamropasal.user.dto.response;

    import lombok.Builder;

    @Builder
    public record UserResponse(
            Long id,
            String fullName,
            String email,
            String contactNumber) {
    }
