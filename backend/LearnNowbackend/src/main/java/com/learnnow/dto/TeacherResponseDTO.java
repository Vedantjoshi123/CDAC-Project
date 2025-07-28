package com.learnnow.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherResponseDTO extends BaseDTO {

    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dob;
    
    private String imageUrl;
    
    private String qualification;
    private String specialization;
    private String experience;
    private String about;

    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;


}
