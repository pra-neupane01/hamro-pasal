package com.praladneupane.hamropasal.auth.service;

import com.praladneupane.hamropasal.auth.security.UserPrinciple;
import com.praladneupane.hamropasal.user.model.Role;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void loadUserByUsername_shouldReturnUserPrinciple() {
        User user = new User();
        user.setId(1L);
        user.setFullName("John Doe");
        user.setEmail("john@gmail.com");
        user.setPassword("encodedPassword");
        user.setRole(Role.ADMIN);

        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        UserPrinciple result = assertInstanceOf(UserPrinciple.class,
                customUserDetailsService.loadUserByUsername(user.getEmail()));

        Set<String> authorities = result.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        assertEquals(user.getId(), result.getId());
        assertEquals(user.getFullName(), result.getFullName());
        assertEquals(user.getEmail(), result.getUsername());
        assertEquals(user.getPassword(), result.getPassword());
        assertTrue(authorities.contains("ROLE_ADMIN"));
        assertTrue(authorities.contains("PRODUCT_ADD"));
        verify(userRepository).findByEmail(user.getEmail());
    }

    @Test
    void loadUserByUsername_shouldThrowWhenUserMissing() {
        String email = "missing@gmail.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> customUserDetailsService.loadUserByUsername(email));

        verify(userRepository).findByEmail(email);
    }
}
