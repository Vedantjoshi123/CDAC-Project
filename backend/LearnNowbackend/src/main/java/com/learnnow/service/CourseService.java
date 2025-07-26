package com.learnnow.service;

import java.util.List;
import com.learnnow.dto.CourseRequestDTO;
import com.learnnow.dto.CourseResponseDTO;

public interface CourseService {
    CourseResponseDTO createCourse(CourseRequestDTO dto);
    CourseResponseDTO updateCourse(Long courseId, CourseRequestDTO dto);
    List<CourseResponseDTO> getAllCourses();
    CourseResponseDTO getCourseById(Long id);
    void deleteCourse(Long id);
}
