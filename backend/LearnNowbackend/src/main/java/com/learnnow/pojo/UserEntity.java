package com.learnnow.pojo;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="users")
@Getter
@Setter
public class UserEntity extends BaseEntity{
	@Column(length = 20, name = "first_name") 
	private String firstName;
	@Column(length = 30, name = "last_name")
	private String lastName;
	@Column(length = 30, unique = true) 
	private String email;
	@Column(length = 300, nullable = false) 
	private String password;
	
	private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(length = 30, name = "user_role", nullable = false)
    private UserRole userRole;

    @Lob
    private byte[] image;

    @Column(name = "subscription_amount")
    private double subscriptionAmount;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address myAddress;
}
