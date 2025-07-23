package com.learnnow.security;

import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.learnnow.pojo.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtils {
	    @Value("${jwt.secret}")
	    private String jwtSecret;

	    @Value("${jwt.expirationMs}")
	    private int jwtExpirationMs;

	    private SecretKey key;

	    @PostConstruct
	    public void init() {
	        // Decode the Base64-encoded secret key
	        byte[] decodedKey = Base64.getDecoder().decode(jwtSecret);
	        this.key = Keys.hmacShaKeyFor(decodedKey);
	    }

	    public String generateToken(UserEntity user) {
	        return Jwts.builder()
	                .setSubject(user.getEmail())
	                .claim("role", user.getUserRole().name())  // Optional claim
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
	                .signWith(key, SignatureAlgorithm.HS512)
	                .compact();
	    }

	    public String extractUsername(String token) {
	        return extractClaim(token, Claims::getSubject);
	    }

	    public Date extractExpiration(String token) {
	        return extractClaim(token, Claims::getExpiration);
	    }

	    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	        final Claims claims = Jwts.parserBuilder()
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	        return claimsResolver.apply(claims);
	    }

	    public boolean validateToken(String token, String userEmail) {
	        final String username = extractUsername(token);
	        return (username.equals(userEmail) && !isTokenExpired(token));
	    }

	    private boolean isTokenExpired(String token) {
	        return extractExpiration(token).before(new Date());
	    }
}
