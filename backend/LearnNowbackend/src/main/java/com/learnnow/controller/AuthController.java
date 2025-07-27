package com.learnnow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learnnow.dto.LoginRequestDTO;
import com.learnnow.dto.LoginResponseDTO;
import com.learnnow.dto.RegisterRequestDTO;
import com.learnnow.dto.UserEntityResponseDTO;
import com.learnnow.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

	
	    @PostMapping("/login")
	    public LoginResponseDTO login(@RequestBody @Valid LoginRequestDTO request) {
	        return authService.login(request);
	    }
	    
	    @PostMapping("/register")
	    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO requestDto) {
	        return authService.register(requestDto);
	    }

}
