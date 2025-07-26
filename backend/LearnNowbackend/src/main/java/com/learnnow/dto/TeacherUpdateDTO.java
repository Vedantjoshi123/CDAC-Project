package com.learnnow.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherUpdateDTO {

    @Size(max = 20)
    private String firstName;

    @Size(max = 30)
    private String lastName;

    private LocalDate dob;

    private double subscriptionAmount;

    private byte[] image;

    @NotBlank(message = "Qualification is required")
    @Size(max = 100)
    private String qualification;

    @NotBlank(message = "Specialization is required")
    @Size(max = 100)
    private String specialization;
}
