package com.learnnow.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ContactUsRequestDTO {
	@NotBlank(message="Name is required")
	 @Size(max = 100, message = "Name can be at most 100 characters")
	private String name;
	@NotBlank(message="Email is required")
	@Email(message="Invalid email format")
	private String email;
	@NotBlank(message="Subject is required")
	 @Size(max = 150, message = "Name can be at most 150 characters")
	private String subject;
	@NotBlank(message="Message is required")
	 @Size(max = 1000, message = "Name can be at most 1000 characters")
	private String message;
	

}
