package com.learnnow.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherRequestDTO {
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String qualification;
    private String specialization;
    private String experience;
    private String about;
    private AddressRequestDTO address;
}

