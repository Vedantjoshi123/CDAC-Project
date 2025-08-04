package com.learnnow.service;

import java.util.List;

import com.learnnow.dto.CourseRequestDTO;
import com.learnnow.dto.CourseResponseDTO;

public interface CourseService {
	CourseResponseDTO createCourse(CourseRequestDTO dto);
    List<CourseResponseDTO> getAllCourses();
//    void deleteCourse(Long id);
	CourseResponseDTO getCourseById(Long id);
	CourseResponseDTO updateCourse(Long id, CourseRequestDTO dto);
}
