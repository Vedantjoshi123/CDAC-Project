package com.learnnow.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.learnnow.pojo.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEntityRequestDTO extends BaseDTO {
    public UserEntityRequestDTO(Long id, LocalDateTime createdOn, LocalDateTime updatedOn) {
		super(id, createdOn, updatedOn);
	}
	private String firstName;
    private String lastName;
    private String email;
    private String password;
    private LocalDate dob;
    private UserRole userRole;
}
