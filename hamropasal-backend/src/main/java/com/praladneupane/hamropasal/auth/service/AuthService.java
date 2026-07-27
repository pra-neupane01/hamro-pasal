package com.praladneupane.hamropasal.auth.service;

import com.praladneupane.hamropasal.auth.dto.request.UserLoginRequest;
import com.praladneupane.hamropasal.auth.dto.request.UserRegisterRequest;
import com.praladneupane.hamropasal.auth.dto.response.UserLoginResponse;
import com.praladneupane.hamropasal.auth.security.UserPrinciple;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.user.mapper.UserMapper;
import com.praladneupane.hamropasal.user.model.Role;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserLoginResponse login(UserLoginRequest request){

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.email(),
                                request.password()
                        )
                );

        UserPrinciple principal =
                (UserPrinciple) authentication.getPrincipal();

        User user = userRepository.findById(principal.getId())
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        String jwt = jwtService.generateToken(principal);

        return userMapper.toLoginResponse(user, jwt);
    }

    public UserLoginResponse register(UserRegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException("Email already in use");
        }

        if (userRepository.existsByContactNumber(request.contactNumber())) {
            throw new BusinessException("Contact number already in use");
        }

        // Create new user
        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .contactNumber(request.contactNumber())
                .role(request.role() != null ? request.role() : Role.CASHIER)
                .build();

        user = userRepository.save(user);

        // Generate JWT token
        UserPrinciple principal = UserPrinciple.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .build();
        String jwt = jwtService.generateToken(principal);

        return userMapper.toLoginResponse(user, jwt);
    }
}

