package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.learnnow.dto.TeacherRequestDTO;
import com.learnnow.dto.TeacherResponseDTO;
import com.learnnow.service.TeacherService;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    // Create a new Teacher
    @PostMapping
    public ResponseEntity<TeacherResponseDTO> createTeacher(@Validated @RequestBody TeacherRequestDTO teacherRequest) {
        TeacherResponseDTO createdTeacher = teacherService.createTeacher(teacherRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeacher);
    }
 // Update Teacher by ID
    @PutMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> updateTeacher(
            @PathVariable Long id,
            @Validated @RequestBody TeacherRequestDTO teacherRequest) {
        
        TeacherResponseDTO updatedTeacher = teacherService.updateTeacher(id, teacherRequest);
        return ResponseEntity.ok(updatedTeacher);
    }
    // Get all Teachers
    @GetMapping
    public ResponseEntity<List<TeacherResponseDTO>> getAllTeachers() {
        List<TeacherResponseDTO> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    // Get Teacher by ID
    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> getTeacherById(@PathVariable Long id) {
        TeacherResponseDTO teacher = teacherService.getTeacherById(id);
        return ResponseEntity.ok(teacher);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTeacher(@PathVariable Long id) {
        String responseMessage = teacherService.deleteTeacher(id);
        return ResponseEntity.ok(responseMessage);
    }

}
