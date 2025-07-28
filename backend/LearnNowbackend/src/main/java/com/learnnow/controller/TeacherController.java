
package com.learnnow.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learnnow.dto.TeacherRequestDTO;
import com.learnnow.dto.TeacherResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.service.TeacherService;

@RestController
@RequestMapping("/teachers")
@CrossOrigin
public class TeacherController {

    @Autowired
    private TeacherService teacherService;
    
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateTeacherProfile(
            @PathVariable Long id,
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String dob,
            @RequestParam String qualification,
            @RequestParam String specialization,
            @RequestParam String experience,
            @RequestParam String about,
            @RequestParam(required = false) String street,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String zipCode,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        
        try {
            TeacherRequestDTO dto = new TeacherRequestDTO();
            System.out.println("inside controller");
            dto.setFirstName(firstName);
            dto.setLastName(lastName);
            
            try {
                dto.setDob(LocalDate.parse(dob));
            } catch (DateTimeParseException e) {
                return ResponseEntity.badRequest().body("Invalid date format. Use YYYY-MM-DD");
            }
            
            dto.setQualification(qualification);
            dto.setSpecialization(specialization);
            dto.setExperience(experience);
            dto.setAbout(about);
            dto.setStreet(street);
            dto.setCity(city);
            dto.setState(state);
            dto.setCountry(country);
            dto.setZipCode(zipCode);

            TeacherResponseDTO updated = teacherService.updateTeacher(id, dto, image);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating teacher: " + ex.getMessage());
        }
    }



}

