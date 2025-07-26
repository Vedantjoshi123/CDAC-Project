package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learnnow.dto.TeacherResponseDTO;
import com.learnnow.dto.TeacherUpdateDTO; // ✅ Moved here
import com.learnnow.service.TeacherService;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    // Create a new Teacher
//    @PostMapping
//    public ResponseEntity<TeacherResponseDTO> createTeacher(@Validated @RequestBody TeacherRequestDTO teacherRequest) {
//        TeacherResponseDTO createdTeacher = teacherService.createTeacher(teacherRequest);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeacher);
//    }

    // Update Teacher by ID
    @PutMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> updateTeacher(
            @PathVariable Long id,
            @Validated @RequestBody TeacherUpdateDTO teacherUpdateDTO) {

        TeacherResponseDTO updatedTeacher = teacherService.updateTeacher(id, teacherUpdateDTO);
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

    // Delete Teacher
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTeacher(@PathVariable Long id) {
        String responseMessage = teacherService.deleteTeacher(id);
        return ResponseEntity.ok(responseMessage);
    }
}
