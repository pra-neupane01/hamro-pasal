package com.praladneupane.hamropasal.auth.service;

import com.praladneupane.hamropasal.auth.dto.request.UserLoginRequest;
import com.praladneupane.hamropasal.auth.dto.response.UserLoginResponse;
import com.praladneupane.hamropasal.auth.security.UserPrinciple;
import com.praladneupane.hamropasal.user.mapper.UserMapper;
import com.praladneupane.hamropasal.user.model.Role;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private AuthService authService;

    @Test
    void login_shouldReturnLoginResponse() {
        UserLoginRequest request = new UserLoginRequest("john@gmail.com", "password123");

        UserPrinciple principal = UserPrinciple.builder()
                .id(1L)
                .fullName("John Doe")
                .email(request.email())
                .password("encodedPassword")
                .role(Role.ADMIN)
                .build();

        Authentication authentication = org.mockito.Mockito.mock(Authentication.class);
        User user = new User();
        user.setId(1L);
        user.setFullName(principal.getFullName());
        user.setEmail(principal.getUsername());
        user.setContactNumber("9800000000");
        user.setPassword("encodedPassword");
        user.setRole(Role.ADMIN);

        UserLoginResponse response = new UserLoginResponse(
                1L,
                user.getFullName(),
                user.getEmail(),
                user.getContactNumber(),
                user.getRole(),
                "jwt-token"
        );

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(principal);
        when(userRepository.findById(principal.getId())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(principal)).thenReturn("jwt-token");
        when(userMapper.toLoginResponse(user, "jwt-token")).thenReturn(response);

        UserLoginResponse result = authService.login(request);

        assertEquals(response, result);

        ArgumentCaptor<UsernamePasswordAuthenticationToken> authenticationCaptor =
                ArgumentCaptor.forClass(UsernamePasswordAuthenticationToken.class);
        verify(authenticationManager).authenticate(authenticationCaptor.capture());
        assertEquals(request.email(), authenticationCaptor.getValue().getPrincipal());
        assertEquals(request.password(), authenticationCaptor.getValue().getCredentials());
        verify(userRepository).findById(principal.getId());
        verify(jwtService).generateToken(principal);
        verify(userMapper).toLoginResponse(user, "jwt-token");
    }

    @Test
    void login_shouldThrowWhenAuthenticatedUserCannotBeLoaded() {
        UserLoginRequest request = new UserLoginRequest("john@gmail.com", "password123");
        UserPrinciple principal = UserPrinciple.builder()
                .id(1L)
                .fullName("John Doe")
                .email(request.email())
                .password("encodedPassword")
                .role(Role.ADMIN)
                .build();

        Authentication authentication = org.mockito.Mockito.mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(principal);
        when(userRepository.findById(principal.getId())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> authService.login(request));

        verify(jwtService, never()).generateToken(any());
        verify(userMapper, never()).toLoginResponse(any(), anyString());
    }
}
