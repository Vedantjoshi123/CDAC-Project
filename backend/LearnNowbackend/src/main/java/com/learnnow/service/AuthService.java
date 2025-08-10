package com.learnnow.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learnnow.dao.UserEntityDao;
import com.learnnow.dto.LoginRequestDTO;
import com.learnnow.dto.LoginResponseDTO;
import com.learnnow.dto.RegisterRequestDTO;
import com.learnnow.dto.UserEntityResponseDTO;
import com.learnnow.exception.ApiException;
import com.learnnow.pojo.Admin;
import com.learnnow.pojo.Student;
import com.learnnow.pojo.Teacher;
import com.learnnow.pojo.UserEntity;
import com.learnnow.pojo.UserRole;
import com.learnnow.security.JwtUtils;

@Service
public class AuthService {

    private final UserEntityDao userEntityDao;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final ModelMapper mapper;
    
    @Autowired
    public AuthService(UserEntityDao userEntityDao, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, ModelMapper mapper) {
        this.userEntityDao = userEntityDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.mapper = mapper;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {
        UserEntity user = userEntityDao.findByEmail(request.getEmail()).orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = jwtUtils.generateToken(user);
        UserEntityResponseDTO userDto = mapper.map(user, UserEntityResponseDTO.class);
        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setUser(userDto);
        response.setMessage("Login successful");

        return response;
    }
    
    
    public ResponseEntity<?> register(RegisterRequestDTO dto) {
        if (userEntityDao.findByEmail(dto.getEmail()).isPresent()) {
            throw new ApiException("Email is already registered");
        }

        UserEntity user;
        UserRole role = UserRole.valueOf(dto.getUserRole().toUpperCase());

        switch (role) {
        case STUDENT:
            user = new Student();
            break;
        case TEACHER:
            user = new Teacher();
            break;
        case ADMIN:
            user = new Admin();
            break;
        default:
            throw new ApiException("Invalid role: " + dto.getUserRole());
    }

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setDob(dto.getDob());
        user.setUserRole(role);
        user.setActive(true);

        userEntityDao.save(user);

        String token = jwtUtils.generateToken(user);

        UserEntityResponseDTO userDto = mapper.map(user, UserEntityResponseDTO.class);

        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setUser(userDto);
        response.setMessage("success");

        return ResponseEntity.ok(response);
    }

    
}


