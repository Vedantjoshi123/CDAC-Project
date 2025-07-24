package com.learnnow.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="contact_us")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ContactUs extends BaseEntity{
	@Column(name="name")
	private String name;
	@Column(name="email",nullable=false)
	private String email;
	@Column(name="subject")
	private String subject;
	@Column(name="message")
	private String message;
	

}
