package com.example.ServerApi.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private long jwtExpirationMs;

    // Key for signing and verifying JWT
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Generate JWT token
    public String generateJwtToken(Authentication authentication, String password) {
        String username = authentication.getName();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encryptedPassword = encoder.encode(password);

        return Jwts.builder().setSubject(username).claim("password", encryptedPassword).setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    // Extract username from the token
    public String getUsernameFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract specific claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Parse the token to extract claims
    private Claims extractAllClaims(String token) {
        Claims body = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
        System.out.println("body : " + body);
        return body;
    }

    // Validate the token and verify user details
    public boolean validateJwtToken(String token, UserDetails userDetails) {
        try {
            Claims claims = extractAllClaims(token); // Extract claims, will throw exception if invalid

            // Optional: You can add custom validation logic here
            String usernameFromToken = claims.getSubject();
//            return (usernameFromToken.equals(userDetails.getUsername()) && !isTokenExpired(token));

            return !isTokenExpired(token);
//            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
        }
        return false;
    }

    // Check if the token has expired
    public boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        System.out.println("Current time: " + new Date());
        System.out.println("expiration time: " + expiration);
        System.out.println("expiration before: " + expiration.before(new Date()));
        return expiration.before(new Date());
    }

    // Extract expiration date from token
    public Date extractExpiration(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        System.out.println("expiration is : " + expiration);
        System.out.println("expiration from the method is : " + extractAllClaims(token).getExpiration());
        return expiration;
    }

}
