package com.praladneupane.hamropasal.auth.service;

import com.praladneupane.hamropasal.auth.dto.request.UserLoginRequest;
import com.praladneupane.hamropasal.auth.dto.response.UserLoginResponse;
import com.praladneupane.hamropasal.auth.security.UserPrinciple;
import com.praladneupane.hamropasal.user.mapper.UserMapper;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserMapper userMapper;

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
}
