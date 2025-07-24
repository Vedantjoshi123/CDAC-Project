package com.learnnow.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class StudentResponseDTO extends BaseDTO{
//    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dob;
    private String gradeLevel;
    private boolean active;
}
