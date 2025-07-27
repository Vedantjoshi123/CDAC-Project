package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.learnnow.dao.UserEntityDao;
import com.learnnow.dto.UserEntityResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.UserEntity;
import com.learnnow.pojo.UserRole;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserEntityService {

	 private final UserEntityDao userEntityDao;
	 private final ModelMapper mapper;

	    public UserEntityResponseDTO getUserById(Long id) {
	        UserEntity user = userEntityDao.findByIdAndIsActiveTrue(id)
	                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + id + " not found"));
	        return mapper.map(user, UserEntityResponseDTO.class);
	    }

	    public List<UserEntityResponseDTO> getAllActiveUsers() {
	        List<UserEntity> users = userEntityDao.findByIsActiveTrue();
	        if (users.isEmpty()) {
	            throw new ResourceNotFoundException("No active users found");
	        }

	        return users.stream()
	                .map(user -> mapper.map(user, UserEntityResponseDTO.class))
	                .collect(Collectors.toList());
	    }

	    public void softDeleteUser(Long id) {
	        UserEntity user = userEntityDao.findByIdAndIsActiveTrue(id)
	                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + id + " not found"));
	        user.setActive(false);
	        userEntityDao.save(user);
	    }
	    
	    public UserRole getUserRoleById(Long id) {
	    	return userEntityDao.getUserRoleById(id);
	    }
}
