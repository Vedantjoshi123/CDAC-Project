package com.learnnow.dto;

import java.time.LocalDate;

import com.learnnow.pojo.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherResponseDTO extends BaseDTO {

    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dob;
    private String image;
    private UserRole userRole;   // needed or not? 
    private String qualification;
    private String specialization;
    private String experience;
    private String about;


    private AddressResponseDTO address;


}
