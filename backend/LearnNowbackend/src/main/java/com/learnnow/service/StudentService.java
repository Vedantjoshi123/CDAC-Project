package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.StudentRequestDTO;
import com.learnnow.dto.StudentResponseDTO;

public interface StudentService {
    StudentResponseDTO createStudent(StudentRequestDTO studentDto);
    StudentResponseDTO updateStudent(Long id, StudentRequestDTO studentDto);
    StudentResponseDTO getStudentById(Long id);
    List<StudentResponseDTO> getAllStudents();
    void deleteStudent(Long id);
}
