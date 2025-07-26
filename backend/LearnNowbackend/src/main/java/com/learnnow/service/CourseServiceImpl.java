package com.learnnow.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnnow.dao.CourseDao;
import com.learnnow.dao.TeacherDao;
import com.learnnow.dao.CategoryDao;
import com.learnnow.dto.CourseRequestDTO;
import com.learnnow.dto.CourseResponseDTO;
import com.learnnow.pojo.Course;
import com.learnnow.pojo.Teacher;
import com.learnnow.pojo.Category;
import com.learnnow.service.CourseService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseDao courseDao;

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private CategoryDao categoryDao;

    @Override
    public CourseResponseDTO createCourse(CourseRequestDTO dto) {
        Course course = new Course();
        mapDTOToEntity(dto, course);
        return mapEntityToDTO(courseDao.save(course));
    }

    @Override
    public CourseResponseDTO updateCourse(Long id, CourseRequestDTO dto) {
        Course course = courseDao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
        mapDTOToEntity(dto, course);
        return mapEntityToDTO(courseDao.save(course));
    }

    @Override
    public List<CourseResponseDTO> getAllCourses() {
        return courseDao.findAll().stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CourseResponseDTO getCourseById(Long id) {
        Course course = courseDao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
        return mapEntityToDTO(course);
    }

    @Override
    public void deleteCourse(Long id) {
        courseDao.deleteById(id);
    }

    private void mapDTOToEntity(CourseRequestDTO dto, Course course) {
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setPrice(dto.getPrice());
        course.setDiscount(dto.getDiscount());
        course.setThumbnail(dto.getThumbnail());
        course.setResource(dto.getResource());
        course.setOverview(dto.getOverview());

        Teacher teacher = teacherDao.findById(dto.getTeacherId())
                .orElseThrow(() -> new EntityNotFoundException("Teacher not found"));
        course.setTeacher(teacher);

        Category category = categoryDao.findById(dto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        course.setCategory(category);
    }

    private CourseResponseDTO mapEntityToDTO(Course course) {
        CourseResponseDTO dto = new CourseResponseDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setPrice(course.getPrice());
        dto.setDiscount(course.getDiscount());
        dto.setThumbnail(course.getThumbnail());
        dto.setResource(course.getResource());
        dto.setOverview(course.getOverview());
        dto.setActive(course.isActive());
        dto.setTeacherId(course.getTeacher().getId());
        dto.setCategoryId(course.getCategory().getId());
        return dto;
    }
}
