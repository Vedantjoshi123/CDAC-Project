package com.learnnow.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentUpdateDTO {

    @Size(max = 20)
    private String firstName;

    @Size(max = 30)
    private String lastName;

    private LocalDate dob;

    private byte[] image;

    @Size(max = 50)
    private String gradeLevel;
}
