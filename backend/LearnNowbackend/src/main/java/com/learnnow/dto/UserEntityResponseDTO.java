package com.learnnow.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.learnnow.pojo.UserRole;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserEntityResponseDTO extends BaseDTO {
	    private String firstName;
	    private String lastName;
	    private String email;
	    private LocalDate dob;
	    private UserRole userRole;

	    
	    
		public UserEntityResponseDTO(Long id, LocalDateTime createdOn, LocalDateTime updatedOn, String firstName, String lastName, String email, LocalDate dob, UserRole userRole) {
			super(id, createdOn, updatedOn);
			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
			this.dob = dob;
			this.userRole = userRole;
		}
	    
	  
}
