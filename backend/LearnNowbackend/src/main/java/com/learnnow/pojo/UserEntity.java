package com.learnnow.pojo;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_role", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
public abstract class UserEntity extends BaseEntity {

    @Column(length = 20, name = "first_name", nullable=true) 
    private String firstName;

    @Column(length = 30, name = "last_name", nullable=true)
    private String lastName;

    @Column(length = 30, unique = true) 
    private String email;

    @Column(length = 300, nullable = false) 
    private String password;

    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(length = 30, name = "user_role", nullable = false, insertable = false, updatable = false)
    private UserRole userRole;

    @Column(name = "image", length = 255)
    private String image;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address myAddress;
}