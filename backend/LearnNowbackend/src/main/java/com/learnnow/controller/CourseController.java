package com.learnnow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learnnow.dto.CourseRequestDTO;
import com.learnnow.dto.CourseResponseDTO;
import com.learnnow.service.CourseService;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping(consumes = {"multipart/form-data"})
    public CourseResponseDTO createCourse(@ModelAttribute CourseRequestDTO dto) {
        return courseService.createCourse(dto);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public CourseResponseDTO updateCourse(@PathVariable Long id, @ModelAttribute CourseRequestDTO dto) {
        return courseService.updateCourse(id, dto);
    }

    @GetMapping
    public List<CourseResponseDTO> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public CourseResponseDTO getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }
//
//    @DeleteMapping("/{id}")
//    public void deleteCourse(@PathVariable Long id) {
//        courseService.deleteCourse(id);
//    }
}
