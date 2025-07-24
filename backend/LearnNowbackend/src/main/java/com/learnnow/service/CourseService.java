package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.CourseRequestDTO;
import com.learnnow.dto.CourseResponseDTO;

public interface CourseService {
    CourseResponseDTO createCourse(CourseRequestDTO courseRequestDTO);
    CourseResponseDTO getCourseById(Long id);
    List<CourseResponseDTO> getAllCourses();
    CourseResponseDTO updateCourse(Long id, CourseRequestDTO courseRequestDTO);
    void deleteCourse(Long id);
}
