package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.TeacherResponseDTO;
import com.learnnow.dto.TeacherUpdateDTO;

public interface TeacherService {

//    TeacherResponseDTO createTeacher(TeacherRequestDTO teacherRequestDTO);

    TeacherResponseDTO getTeacherById(Long id);

    List<TeacherResponseDTO> getAllTeachers();

    TeacherResponseDTO updateTeacher(Long id, TeacherUpdateDTO teacherUpdateDTO);

    String deleteTeacher(Long id);
}
