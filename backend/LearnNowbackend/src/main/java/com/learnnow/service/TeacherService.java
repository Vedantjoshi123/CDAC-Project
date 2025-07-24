package com.learnnow.service;

import java.util.List;
import com.learnnow.dto.TeacherRequestDTO;
import com.learnnow.dto.TeacherResponseDTO;

public interface TeacherService {
    TeacherResponseDTO createTeacher(TeacherRequestDTO teacherRequestDTO);
    TeacherResponseDTO getTeacherById(Long id);
    List<TeacherResponseDTO> getAllTeachers();
    TeacherResponseDTO updateTeacher(Long id, TeacherRequestDTO teacherRequestDTO); // ✅ Add this
    String deleteTeacher(Long id);
}
