package com.praladneupane.hamropasal.auth.service;

import com.praladneupane.hamropasal.auth.config.AppConfig;
import com.praladneupane.hamropasal.auth.security.UserPrinciple;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final AppConfig appConfig;

    private SecretKey generateKey() {
        byte[] byteStreams = Decoders.BASE64.decode(appConfig.getJwt().getSecret());
        return Keys.hmacShaKeyFor(byteStreams);
    }

    public String getJwt(UserPrinciple userPrinciple) {
        return Jwts.builder()
                .signWith(generateKey())
                .subject(userPrinciple.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + appConfig.getJwt().getExpiry() * 60 * 1000L))
                .claim("name", userPrinciple.getFullName())
                .claim("id", userPrinciple.getId())
                .claim("role", userPrinciple.getRole())
                .compact();
    }

    private Claims extractClaims(String token) {
        return Jwts.parser().verifyWith(generateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

    }

    private <T> T extractSpecificClaim(String token, Function<Claims, T> claimsTFunction) {
        Claims claims = extractClaims(token);
        return claimsTFunction.apply(claims);

    }

    public String extractUsername(String token) {
        return extractSpecificClaim(token, (Claims::getSubject));
    }

    public Date extractExpiry(String token) {
        return extractSpecificClaim(token, Claims::getExpiration);
    }

    public boolean verifyToken(String token, UserPrinciple userPrinciple) {
        return extractExpiry(token).after(new Date(System.currentTimeMillis()))
                && extractUsername(token).equals(userPrinciple.getUsername());
    }



}
