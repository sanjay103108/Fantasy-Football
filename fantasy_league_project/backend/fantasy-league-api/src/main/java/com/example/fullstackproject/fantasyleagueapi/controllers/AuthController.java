package com.example.fullstackproject.fantasyleagueapi.controllers;

import com.example.fullstackproject.fantasyleagueapi.models.User;
import com.example.fullstackproject.fantasyleagueapi.springSecurityJwt.AuthRequest;
import com.example.fullstackproject.fantasyleagueapi.springSecurityJwt.AuthResponse;
import com.example.fullstackproject.fantasyleagueapi.springSecurityJwt.JwtTokenUtil;
import com.example.fullstackproject.fantasyleagueapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {
    @Autowired
    AuthenticationManager authManager;
    
    @Autowired
    JwtTokenUtil jwtUtil;
    
    @Autowired
    UserService userService;

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid User user) {
        try {
            // Check if user already exists
            if (userService.getUserByEmail(user.getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists");
            }
            
            // Create new user
            User newUser = userService.addNewUser(user);
            String accessToken = jwtUtil.generateAccessToken(newUser);
            AuthResponse response = new AuthResponse(newUser.getEmail(), accessToken);
            
            return ResponseEntity.ok().body(response);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword())
            );

            User user = (User) authentication.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getEmail(), accessToken);

            return ResponseEntity.ok().body(response);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}

