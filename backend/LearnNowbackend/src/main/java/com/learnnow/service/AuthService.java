package com.learnnow.service;

import java.time.LocalDate;

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
    
    public UserEntityResponseDTO register(RegisterRequestDTO requestDto) {
        UserEntity entity;

        switch (requestDto.getUserRole()) {
            case "TEACHER":
                Teacher teacher = new Teacher();
                teacher.setFirstName(requestDto.getFirstName());
                teacher.setLastName(requestDto.getLastName());
                teacher.setEmail(requestDto.getEmail());
                teacher.setPassword(passwordEncoder.encode(requestDto.getPassword()));
                teacher.setDob(requestDto.getDob()); // ✅ no need to parse
                teacher.setUserRole(UserRole.TEACHER);
                teacher.setActive(true);
                teacher.setQualification("Not Provided");
                teacher.setSpecialization("Not Provided");
                entity = teacher;
                break;

            case "STUDENT":
                Student student = new Student();
                student.setFirstName(requestDto.getFirstName());
                student.setLastName(requestDto.getLastName());
                student.setEmail(requestDto.getEmail());
                student.setPassword(passwordEncoder.encode(requestDto.getPassword()));
                student.setDob(requestDto.getDob()); // ✅ no need to parse
                student.setUserRole(UserRole.STUDENT);
                student.setActive(true);
                student.setGradeLevel("Not Provided");
                entity = student;
                break;

            default:
                throw new IllegalArgumentException("Invalid user role: " + requestDto.getUserRole());
        }

        entity = userEntityDao.save(entity);

        return mapper.map(entity, UserEntityResponseDTO.class);
    }



}


