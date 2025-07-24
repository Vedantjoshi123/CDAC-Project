package com.learnnow.dto;

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
public class ContactUsResponseDTO extends BaseDTO {
	private String name;
	private String email;
	private String subject;
	private String message;
}
