package com.praladneupane.hamropasal.user.mapper;

import com.praladneupane.hamropasal.auth.dto.request.UserLoginRequest;
import com.praladneupane.hamropasal.auth.dto.response.UserLoginResponse;
import com.praladneupane.hamropasal.user.dto.request.CreateUserRequest;
import com.praladneupane.hamropasal.user.dto.response.UserResponse;
import com.praladneupane.hamropasal.user.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toEntity(CreateUserRequest request){
        return User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .contactNumber(request.contactNumber())
                .build();
    }

    public UserResponse toResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .contactNumber(user.getContactNumber())
                .build();

    }

    public UserLoginResponse toLoginResponse(User user, String jwt) {

        return UserLoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .token(jwt)
                .build();
    }
}
