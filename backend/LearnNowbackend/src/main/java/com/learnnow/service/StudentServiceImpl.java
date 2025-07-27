package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.StudentDao;
import com.learnnow.dto.StudentResponseDTO;
import com.learnnow.dto.StudentUpdateDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Student;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentRepo;

    // Converts Student entity to response DTO
    private StudentResponseDTO mapToResponseDTO(Student student) {
        StudentResponseDTO dto = new StudentResponseDTO();

        dto.setId(student.getId());
        dto.setCreatedOn(student.getCreatedOn());
        dto.setUpdatedOn(student.getUpdatedOn());

        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setDob(student.getDob());
        dto.setGradeLevel(student.getGradeLevel());
        dto.setActive(student.isActive());

        return dto;
    }

    // Update student by ID
    @Override
    public StudentResponseDTO updateStudent(Long id, StudentUpdateDTO studentDto) {
        Student existing = studentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        if (studentDto.getFirstName() != null)
            existing.setFirstName(studentDto.getFirstName());

        if (studentDto.getLastName() != null)
            existing.setLastName(studentDto.getLastName());

        if (studentDto.getDob() != null)
            existing.setDob(studentDto.getDob());

        if (studentDto.getGradeLevel() != null)
            existing.setGradeLevel(studentDto.getGradeLevel());

        // if (studentDto.getImage() != null)
        //     existing.setImage(studentDto.getImage());

        Student updated = studentRepo.save(existing);
        return mapToResponseDTO(updated);
    }

    @Override
    public StudentResponseDTO getStudentById(Long id) {
        Student student = studentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return mapToResponseDTO(student);
    }

    @Override
    public List<StudentResponseDTO> getAllStudents() {
        return studentRepo.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        studentRepo.delete(student);
    }
}
