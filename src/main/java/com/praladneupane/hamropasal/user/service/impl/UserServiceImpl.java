package com.praladneupane.hamropasal.user.service.impl;

import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.user.dto.request.CreateUserRequest;
import com.praladneupane.hamropasal.user.dto.response.UserResponse;
import com.praladneupane.hamropasal.user.mapper.UserMapper;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import com.praladneupane.hamropasal.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserResponse create(CreateUserRequest request) {
        if(userRepository.existsByEmail(request.email())){
            throw new BusinessException("User email already exists");
        }
        String encodedPassword = passwordEncoder.encode(request.password());
        var user = userMapper.toEntity(request);
        user.setPassword(encodedPassword);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public UserResponse update(Long id, CreateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User not found with the provided id"));
        if(request.fullName() != null){
            user.setFullName(request.fullName());
        }
        if(request.contactNumber() != null){
            user.setContactNumber(request.contactNumber());
        }
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with the provided id"));
        return userMapper.toResponse(user);
    }

    @Override
    public PagedResponse<UserResponse> getAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        Page<UserResponse> responsePage = userPage.map(userMapper::toResponse);
        return PagedResponse.toPagedResponse(responsePage);
    }

}
