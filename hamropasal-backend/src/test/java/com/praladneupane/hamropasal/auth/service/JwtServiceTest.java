package com.praladneupane.hamropasal.auth.service;

import com.praladneupane.hamropasal.auth.security.UserPrinciple;
import com.praladneupane.hamropasal.common.config.AppConfig;
import com.praladneupane.hamropasal.user.model.Role;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtServiceTest {

    @Test
    void generateToken_shouldEmbedClaimsAndValidateToken() {
        JwtService jwtService = new JwtService(testAppConfig());
        UserPrinciple principal = UserPrinciple.builder()
                .id(1L)
                .fullName("John Doe")
                .email("john@gmail.com")
                .password("encodedPassword")
                .role(Role.ADMIN)
                .build();

        String token = jwtService.generateToken(principal);

        assertNotNull(token);
        assertEquals(principal.getUsername(), jwtService.extractUsername(token));
        assertEquals("John Doe", jwtService.extractClaim(token, claims -> claims.get("name", String.class)));
        Number idClaim = jwtService.extractClaim(token, claims -> claims.get("id", Number.class));
        assertEquals(1L, idClaim.longValue());
        assertTrue(jwtService.extractExpiry(token).after(Date.from(Instant.now())));
        assertTrue(jwtService.validateToken(token, principal));
    }

    private AppConfig testAppConfig() {
        AppConfig appConfig = new AppConfig();
        AppConfig.Jwt jwt = new AppConfig.Jwt();
        jwt.setSecret(Base64.getEncoder().encodeToString(
                "01234567890123456789012345678901".getBytes(StandardCharsets.UTF_8)));
        jwt.setExpiry(60L);
        appConfig.setJwt(jwt);
        return appConfig;
    }
}
