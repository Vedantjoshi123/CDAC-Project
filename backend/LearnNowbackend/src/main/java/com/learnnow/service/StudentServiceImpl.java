package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.StudentDao;
import com.learnnow.dto.StudentRequestDTO;
import com.learnnow.dto.StudentResponseDTO;
import com.learnnow.exception.ApiException;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Student;
import com.learnnow.pojo.UserRole;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentRepo;

    private StudentResponseDTO mapToResponseDTO(Student student) {
        StudentResponseDTO dto = new StudentResponseDTO();

        // Base fields from BaseDTO
        dto.setId(student.getId());
        dto.setCreatedOn(student.getCreatedOn());
        dto.setUpdatedOn(student.getUpdatedOn());

        // Student-specific fields
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setDob(student.getDob());
        dto.setGradeLevel(student.getGradeLevel());
        dto.setActive(student.isActive());

        return dto;
    }


    private Student mapToEntity(StudentRequestDTO dto) {
        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPassword(dto.getPassword());
        student.setDob(dto.getDob());
        student.setGradeLevel(dto.getGradeLevel());
        student.setUserRole(UserRole.STUDENT); // 👈 SET ROLE HERE
        return student;
    }

    @Override
    public StudentResponseDTO createStudent(StudentRequestDTO studentDto) {
        if (studentRepo.existsByEmail(studentDto.getEmail())) {
            throw new ApiException("Student with email already exists: " + studentDto.getEmail());
        }
        Student student = mapToEntity(studentDto);
        Student saved = studentRepo.save(student);
        return mapToResponseDTO(saved);
    }

    @Override
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO studentDto) {
        Student existing = studentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        existing.setFirstName(studentDto.getFirstName());
        existing.setLastName(studentDto.getLastName());
        existing.setDob(studentDto.getDob());
        existing.setGradeLevel(studentDto.getGradeLevel());

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
