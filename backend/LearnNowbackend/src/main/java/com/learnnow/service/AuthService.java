package com.learnnow.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learnnow.dao.UserEntityDao;
import com.learnnow.dto.LoginRequestDTO;
import com.learnnow.dto.LoginResponseDTO;
import com.learnnow.dto.RegisterRequestDTO;
import com.learnnow.dto.UserEntityResponseDTO;
import com.learnnow.exception.ApiException;
import com.learnnow.pojo.UserEntity;
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
        UserEntity user = userEntityDao.findByEmailAndIsActiveTrue(request.getEmail()).orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

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
    
    public LoginResponseDTO register(RegisterRequestDTO requestDto) {
      if (userEntityDao.findByEmailAndIsActiveTrue(requestDto.getEmail()).isPresent()) {
          throw new ApiException("User already exists");
      }

      UserEntity entity = mapper.map(requestDto, UserEntity.class);
      entity.setPassword(passwordEncoder.encode(entity.getPassword()));
      UserEntity savedUser = userEntityDao.save(entity);
      String token = jwtUtils.generateToken(savedUser);

      UserEntityResponseDTO userDto = mapper.map(savedUser, UserEntityResponseDTO.class);

      LoginResponseDTO response = new LoginResponseDTO();
      response.setToken(token);
      response.setUser(userDto);
      response.setMessage("Registration successful");
      return response;
    }


}


