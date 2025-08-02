package com.learnnow.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.learnnow.dao.CategoryDao;
import com.learnnow.dao.CourseDao;
import com.learnnow.dao.TeacherDao;
import com.learnnow.dto.CourseRequestDTO;
import com.learnnow.dto.CourseResponseDTO;
import com.learnnow.exception.ResourceNotFoundException;
import com.learnnow.pojo.Category;
import com.learnnow.pojo.Course;
import com.learnnow.pojo.Teacher;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseDao courseDao;

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private CategoryDao categoryDao;

    @Value("${upload.course.thumbnail.path}")
    private String thumbnailPath;

    @Value("${upload.course.resource.path}")
    private String resourcePath;

    @Override
    public CourseResponseDTO createCourse(CourseRequestDTO dto) {
        return saveCourse(new Course(), dto);
    }

//    @Override
//    public CourseResponseDTO updateCourse(Long id, CourseRequestDTO dto) {
//        Course existingCourse = courseDao.findByIdAndIsActiveTrue(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Course Id " + id + " not found"));
//        return saveCourse(existing, dto);
//    }

    private CourseResponseDTO saveCourse(Course course, CourseRequestDTO dto) {
        try {
            // Save thumbnail
            MultipartFile thumbnail = dto.getThumbnail();
            if (thumbnail != null && !thumbnail.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + thumbnail.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
                File dest = getUploadFile(thumbnailPath, fileName);
                thumbnail.transferTo(dest);
                course.setThumbnail(thumbnailPath + "/" + fileName);
            }

            // Save resource file
            MultipartFile resource = dto.getResource();
            if (resource != null && !resource.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + resource.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
                File dest = getUploadFile(resourcePath, fileName);
                resource.transferTo(dest);
                course.setResource(resourcePath + "/" + fileName);
            }

            course.setTitle(dto.getTitle());
            course.setDescription(dto.getDescription());
            course.setPrice(dto.getPrice());
            course.setDiscount(dto.getDiscount());
            course.setOverview(dto.getOverview());
            course.setActive(true);

            // Set teacher
            Teacher teacher = teacherDao.findByIdAndIsActiveTrue(dto.getTeacherId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher Id " + dto.getTeacherId() + " not found"));
            course.setTeacher(teacher);

            // Set category
            if (dto.getCategoryId() != null) {
                Category category = categoryDao.findByIdAndIsActiveTrue(dto.getCategoryId())
                        .orElseThrow(() -> new ResourceNotFoundException("Category Id " + dto.getCategoryId() + " not found"));
                course.setCategory(category);
            } else {
                course.setCategory(null);
            }

            Course saved = courseDao.save(course);
            return convertToDTO(saved);

        } catch (IOException e) {
            throw new RuntimeException("Failed to save files: " + e.getMessage(), e);
        }
    }

    private File getUploadFile(String relativePath, String fileName) throws IOException {
        File backendDir = new File(System.getProperty("user.dir"));
        File projectRootDir = backendDir.getParentFile().getParentFile();
        File uploadDir = new File(projectRootDir, relativePath);

        if (!uploadDir.exists()) {
            Files.createDirectories(uploadDir.toPath());
        }

        return new File(uploadDir, fileName);
    }

    private CourseResponseDTO convertToDTO(Course course) {
        CourseResponseDTO dto = new CourseResponseDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setPrice(course.getPrice());
        dto.setDiscount(course.getDiscount());
        dto.setThumbnail(course.getThumbnail());
        dto.setResource(course.getResource());
        dto.setOverview(course.getOverview());
        dto.setCategoryId(course.getCategory() != null ? course.getCategory().getId() : null);
        dto.setTeacherId(course.getTeacher().getId());
        dto.setCreatedOn(course.getCreatedOn());
        dto.setUpdatedOn(course.getUpdatedOn());
        return dto;
    }

    @Override
    public List<CourseResponseDTO> getAllCourses() {
        return courseDao.findByIsActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
//
//    @Override
//    public CourseResponseDTO getActiveCourseById(Long id) {
//        Course course = courseDao.findByIdAndIsActiveTrue(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Course Id " + id + " not found"));
//        return convertToDTO(course);
//    }
//
//    @Override
//    public void softDeleteCourse(Long id) {
//        Course course = courseDao.findByIdAndIsActiveTrue(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Course Id " + id + " not found"));
//        course.setActive(false);
//        courseDao.save(course);
//    }
}
