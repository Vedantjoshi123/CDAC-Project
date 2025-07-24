package com.learnnow.dto;

import com.learnnow.pojo.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherResponseDTO extends BaseDTO{
//    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String qualification;
    private String specialization;
    private String dob;
    private boolean active;
    private UserRole userRole;
}
