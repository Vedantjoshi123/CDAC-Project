package com.learnnow.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnnow.pojo.Course;
import com.learnnow.pojo.Student;
import com.learnnow.pojo.Teacher;

public interface CourseDao extends JpaRepository<Course, Long> {

	Optional<Student> findByIdAndIsActiveTrue(Long courseId);

	Optional<Course> findByIsActiveTrue();
	
}
