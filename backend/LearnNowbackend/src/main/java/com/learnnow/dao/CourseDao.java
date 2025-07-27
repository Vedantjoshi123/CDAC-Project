package com.learnnow.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnnow.pojo.Course;
import com.learnnow.pojo.Student;

public interface CourseDao extends JpaRepository<Course, Long> {

	Optional<Student> findByIdAndIsActiveTrue(Long courseId);
	
}
