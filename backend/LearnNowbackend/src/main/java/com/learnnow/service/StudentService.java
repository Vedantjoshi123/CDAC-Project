package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.StudentResponseDTO;
import com.learnnow.dto.StudentUpdateDTO;

public interface StudentService {
//    StudentResponseDTO createStudent(StudentRequestDTO studentDto);
    StudentResponseDTO updateStudent(Long id, StudentUpdateDTO studentDto);
    StudentResponseDTO getStudentById(Long id);
    List<StudentResponseDTO> getAllStudents();
    void deleteStudent(Long id);
}
