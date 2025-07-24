package com.learnnow.dto;

import com.learnnow.pojo.UserRole; // 👈 Import the enum

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherRequestDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Qualification is required")
    private String qualification;

    @NotBlank(message = "Specialization is required")
    private String specialization;
    @NotNull(message = "Date of birth is required")
    private String dob; // 👈 This must be here for getDob() to work

    @NotNull(message = "User role is required") // 👈 Added validation
    private UserRole userRole; // 👈 Add this for role (TEACHER, ADMIN, STUDENT)
}
