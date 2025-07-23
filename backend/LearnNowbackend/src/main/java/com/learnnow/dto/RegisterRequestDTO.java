package com.learnnow.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    private String email;

    @NotBlank
    private String password;

    @NotNull
    private LocalDate dob;

    @NotBlank
    private String userRole; // Will be parsed to enum

    // Address fields can be nested in AddressDto if needed
}
