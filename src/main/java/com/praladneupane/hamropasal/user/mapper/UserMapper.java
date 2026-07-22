package com.praladneupane.hamropasal.user.mapper;

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

}
